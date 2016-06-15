/**
 * Take a cacmelCaseString and return camel_case_string;
 * @param  {string} str A camelCaseString
 * @return {string} An underscore cased string
 */
const underscore = (str) => str.replace(/[A-Z]/g, (n) => `_${n.toLowerCase()}`);

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

  const query = Object.keys(filter)
    .map(f => {
      const value = filter[f];
      // filter[poi_type]
      let filterString = `filter[${underscore(f)}]`;

      if (typeof filter[f] === "string") {
        // [equals]=bar
        filterString += `[equals]=${value}`;
      } else if (typeof filter[f] === "boolean") {
        // [exists|notexists]
        filterString += `[${value ? "exists" : "notexists"}]`;
      } else if (Array.isArray(filter[f])) {
        // [equals]=a,b,c
        filterString += `[equals]=${value.join(",")}`;
      } else if (typeof filter[f] === "object") {
        filterString += `[${filter[f].operator}]=${filter[f].value}`;
      }

      return filterString;
    });
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

function buildQuery({ includes, page, filters, perPage }) {
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
 * import { build } form "open-planet-js/src/core/urlBuilder";
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
} = {}) {
  let url = `${base}/${resource}`;

  const query = buildQuery({
    includes, page, filters, perPage,
  });

  url += query ? `?${query}` : "";
  return url;
}

export {
  underscore,
  build,
  buildQuery,
};