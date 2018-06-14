import merge from "lodash/merge";
import map from "lodash/map";
import mapKeys from "lodash/mapKeys";
import camelCase from "lodash/camelCase";

const _ = { merge, map, mapKeys, camelCase };

/**
 * Take a cacmelCaseString and return camel_case_string;
 * @param  {string} str A camelCaseString
 * @return {string} An underscore cased string
 */
const underscore = str => str.replace(/[A-Z]/g, n => `_${n.toLowerCase()}`);

function getBaseParams(url) {
  const matches = url.match(/(https?:\/\/[^/]*)\/([^?]*)/);

  return matches && matches[0] ? {
    base: matches[1],
    resource: matches[2],
  } : {};
}

function getOperator(operator, value) {
  switch (operator) {
    case "equals":
      return value.indexOf(",") > -1 ? value.split(",") : value;
    default: {
      return { [operator]: value };
    }
  }
}

function createOperatorObject(memo, keys, value) {
  const filter = memo;

  // ["poi_type", "equals"]
  // ["lodgings", "poi_type", "equals"]
  switch (keys.length) {
    case 2: {
      const [key, operator] = keys;
      const operatorValue = /exists|equals|notexists/.test(operator) ?
      getOperator(operator, value) : {
        operator,
        value,
      };

      if (filter[key] && !Array.isArray(filter[key])) {
        filter[key] = [filter[key]];
        filter[key].push(operatorValue)
      } else {
        filter[key] = filter[key] || operatorValue;
      }
      break;
    }
    case 3: {
      const [relationship, ...rest] = keys;
      filter[relationship] = Object.assign({}, filter[relationship] || {},
        createOperatorObject({}, rest, value));
      break;
    }
    default:
      break;
  }
  return filter;
}

// filter[abc][def]=123
const reFilterG = /\[([^\]]*)\]/g;
const reFilter = /\[([^\]]*)\]/;

function parseFilters(filters, filter, value) {
  const keys = [];
  let matches;

  // Grab abc, and def
  while (matches = reFilterG.exec(filter)) {
    keys.push(_.camelCase(matches[1]));
  }

  return createOperatorObject(filters, keys, value);
}

function parseQueryString(url) {
  const split = url.split("?");
  if (!split[1]) return {};

  const query = split[1];
  const urlParts = query.split("&");

  return urlParts.reduce((memo, urlPart) => {
    const qs = memo;
    // 123
    const value = urlPart.split(/=/)[1];

    if (urlPart.startsWith("filter")) {
      qs.filters = Object.assign({}, parseFilters(qs.filters || {}, urlPart, value));
    } else if (urlPart.startsWith("include")) {
      qs.includes = qs.includes || [];
      qs.includes = qs.includes.concat(value.split(","));
    } else if (urlPart.startsWith("page")) {
      const match = urlPart.match(reFilter);

      if (match) {
        const pageOperator = match[1];
        if (pageOperator === "limit") {
          qs.perPage = parseInt(value, 10);
        }
        if (pageOperator === "offset") {
          const offset = parseInt(value, 10);
          qs.page = (offset / qs.perPage) + 1;
        }
      }
    } else if (urlPart.startsWith("sort")) {
      qs.sort = value;
    } else if (urlPart.startsWith("expanded_children")) {
      qs.expanded = value;
    }


    return qs;
  }, {});
}

/**
* Parse a url and returns it's filters, includes, and pagination params
* @param {string} url A url to parse
* @example
* unbuild("http://api.lonelyplanet.com/foo?bar=1"); // { base: "http://api.lonelyplanet.com", resource: "foo" ... }
*/
function unbuild(url) {
  const { base, resource } = getBaseParams(url);
  const {
    filters,
    includes,
    perPage,
    page,
    sort,
    expanded_children } = parseQueryString(decodeURIComponent(url));

  return {
    base,
    resource,
    filters,
    includes,
    perPage,
    page,
    sort,
    expanded_children,
  };
}

function isArrayOfCustomFilters(arry) {
  return Boolean(
    Array.isArray(arry) &&
    arry.map(fi => typeof fi).filter(ft => ft === "object").length,
  );
}

function createFilter(key, value) {
  // filter[poi_type]
  const baseFilter = key ? `filter[${underscore(key)}]` : "";
  let filterString = "";

  if (typeof value === "string") {
    // [equals]=bar
    filterString += `${baseFilter}[equals]=${value}`;
  } else if (typeof value === "boolean") {
    // [exists|notexists]
    filterString += `${baseFilter}[${value ? "exists" : "notexists"}]`;
  } else if (Array.isArray(value)) {
    // [equals]=a,b,c
    if (value.map(fi => typeof fi).filter(ft => ft === "object").length) {
      filterString += value.map(fi => `${createFilter(key, fi)}`).join("&");
    } else {
      filterString += createFilter(key, value.join(","));
    }
  } else if (typeof value === "object") {
    // [value.operator]=value.value
    if (value.operator && value.value) {
      filterString += `${baseFilter}[${underscore(value.operator)}]=${value.value}`;
    } else {
      // filter[resource][field][operator]=value
      const keys = value;

      filterString += Object.keys(keys).map((relKey) => {
        if (isArrayOfCustomFilters(value[relKey])) {
          return value[relKey].map(obj =>
            `${baseFilter}[${underscore(relKey)}]${createFilter(null, obj)}`).join("&");
        }
        return `${baseFilter}[${underscore(relKey)}]${createFilter(null, value[relKey])}`;
      }).join("&");
    }
  }

  return filterString;
}

/**
 * Build a query string for filters
 * @param  {string} filter An object containing filters
 * @return {string} A query string of filters
 * @private
 * @example
 *
 * filter({
 *   poiType: ["eating", "sleeping"],
 *   location: false,
 *   subtypes: "musem"
 * });
 * // Returns a string...
 * // filter[poi_type][equals]=eating,
 * // sleeping&filter[location][exists]&
 * // filter[subtypes][equals]=museum
 *
 */
const createFilters = (filter) => {
  if (!filter) return "";

  const query = _.map(filter, (value, key) => createFilter(key, value));
  return query.join("&");
};

const paginate = ({
  page = 1,
  perPage = 10,
} = {}) => `page[limit]=${perPage}&page[offset]=${perPage * (page - 1)}`;

/**
 * Generate the includes for the api request
 * Takes in an array ["foo", "bar"], and converts it to `?includes=foo,bar`
 * @param  {array} include An array of includes
 * @return {string} An include string
 */
const createIncludes = (include) => {
  if (!include) {
    return "";
  }

  return `include=${include.join(",")}`;
};

function buildQuery({ includes = [], filters = {}, page, perPage, sort, expandedChildren }) {
  const urlParts = [];

  if (includes.length) {
    urlParts.push(createIncludes(includes));
  }

  if (Object.keys(filters).length) {
    urlParts.push(createFilters(filters));
  }

  if (page || perPage) {
    urlParts.push(paginate({ page, perPage }));
  }

  if (sort) {
    urlParts.push(`sort=${sort}`)
  }

  if (expandedChildren) {
    urlParts.push(`expanded_children=${expandedChildren}`);
  }

  return urlParts.filter(part => part).join("&");
}

/**
 * Take an object and convert all of its keys to camelCase;
 * @param  {object} obj An object of filters
 * @return {object} An object with camelCased keys
 */
function formatFilterKeys(filterObject) {
  return _.mapKeys(filterObject, (value, key) => _.camelCase(key));
}

/**
 * Builds a url for fetching resources
 * @param  {object} options={} - Options for this request
 * @param  {string} options.base="" - The base url for the API
 * @param  {string} options.resource="" - The endpoint being requested
 * @param  {object} [options.filters]={} - An object containing filters
 * @param  {array} [options.include]=[] - An array of additional includes
 * @return {string} Built url for a resource
 * @example
 *
 * build({
 *   base: "https://api.lonelyplanet.com",
 *   resource: "pois",
 *   include: ["image_associations.from"],
 * });
 */
function build({
  base = "",
  resource = "",
  filters = {},
  includes = [],
  page,
  perPage,
  sort,
  expanded_children,
} = {}) {
  const parsed = `${resource.substr(0, 1) === "/" ? "" : "/"}${resource}`
    .replace(/\?(.*)$/, "");

  let url = `${base}${parsed}`;

  const params = unbuild(`${base}${resource}`);

  // incoming filters need to be formated the same way as
  // when being unbuilt from the url string
  const formattedFilters = formatFilterKeys(filters);
  const merged = _.merge({}, {
    include: params.includes,
    page: params.page,
    filters: params.filters,
    perPage: params.perPage,
    sort: params.sort,
    expandedChildren: params.expanded_children,
  }, {
    includes, page, filters: formattedFilters, perPage, sort, expandedChildren: expanded_children,
  });
  const query = buildQuery(merged);

  url += query ? `?${query}` : "";
  return url;
}

export {
  underscore,
  build,
  buildQuery,
  unbuild,
};
