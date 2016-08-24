import merge from "lodash/merge";
import map from "lodash/map";

const _ = { merge, map };

/**
 * Take a cacmelCaseString and return camel_case_string;
 * @param  {string} str A camelCaseString
 * @return {string} An underscore cased string
 */
const underscore = (str) => str.replace(/[A-Z]/g, (n) => `_${n.toLowerCase()}`);

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
  switch (keys.length) {
    case 2: {
      const [key, operator] = keys;
      const operatorValue = /exists|equals|notexists/.test(operator) ?
      getOperator(operator, value) : {
        operator,
        value,
      };

      if (memo[key] && !Array.isArray(memo[key])) {
        memo[key] = [memo[key]];
        memo[key].push(operatorValue)
      } else {
        memo[key] = memo[key] || operatorValue;
      }
      break;
    }
    case 3: {
      const [relationship, ...rest] = keys;
      memo[relationship] = createOperatorObject({}, rest, value);
      break;
    }
    default:
      break;
  }
  return memo;
}

// filter[abc][def]=123
const reFilterG = /\[([^\]]*)\]/g;
const reFilter = /\[([^\]]*)\]/;

function parseFilters(filters, filter, value) {
  const keys = [];
  let matches;

  // Grab abc, and def
  while (matches = reFilterG.exec(filter)) {
    keys.push(matches[1]);
  }

  createOperatorObject(filters, keys, value);
}

function parseQueryString(url) {
  const split = url.split("?");
  if (!split[1]) return {};

  const query = split[1];
  const filters = query.split("&");

  const obj = filters.reduce((memo, filter) => {
    // 123
    const value = filter.split(/=/)[1];

    if (filter.startsWith("filter")) {
      memo.filters = memo.filters || {};
      parseFilters(memo.filters, filter, value);
    } else if (filter.startsWith("include")) {
      memo.includes = memo.includes || [];
      memo.includes = memo.includes.concat(value.split(","));
    } else if (filter.startsWith("page")) {
      const match = filter.match(reFilter);

      if (match) {
        const pageOperator = match[1];
        if (pageOperator === "limit") {
          memo.perPage = parseInt(value, 10);
        }
        if (pageOperator === "offset") {
          const offset = parseInt(value, 10);
          memo.page = (offset / memo.perPage) + 1;
        }
      }
    } else if (filter.startsWith("sort")) {
      memo.sort = value;
    }


    return memo;
  }, {});

  return obj;
}

/**
* Parse a url and returns it's filters, includes, and pagination params
*/
function unbuild(url) {
  const { base, resource } = getBaseParams(url);
  const { filters, includes, perPage, page, sort } = parseQueryString(url);

  return {
    base,
    resource,
    filters,
    includes,
    perPage,
    page,
    sort,
  };
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
    if (value.operator && value.value) {
      filterString += `${baseFilter}[${value.operator}]=${value.value}`;
    } else {
      const keys = value;
      filterString += Object.keys(keys).map(relKey =>
        `${baseFilter}[${relKey}]${createFilter(null, value[relKey])}`
      ).join("&");
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

function buildQuery({ includes = [], filters = {}, page, perPage, sort, }) {
  const urlParts = [];

  if (includes.length) {
    urlParts.push(createIncludes(includes));
  }

  if (Object.keys(filters).length) {
    urlParts.push(createFilters(filters));
  }

  if (page) {
    urlParts.push(paginate({ page, perPage }));
  }

  if (sort) {
    urlParts.push(`sort=${sort}`)
  }

  return urlParts.filter(part => part).join("&");
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
} = {}) {
  const parsed = `${resource.substr(0, 1) === "/" ? "" : "/"}${resource}`
    .replace(/\?(.*)$/, "");

  let url = `${base}${parsed}`;

  const params = unbuild(resource);
  const merged = _.merge({}, {
    includes, page, filters, perPage, sort,
  }, {
    include: params.includes,
    page: params.page,
    filters: params.filters,
    perPage: params.perPage,
    sort: params.sort,
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
