const underscore = (str) => {
  return str.replace(/[A-Z]/g, (n) => `_${n.toLowerCase()}`);
};

const getFilters = (filter) => {
  if (!filter) return "";

  const filters = Object.keys(filter).map(f => `${underscore(f)}[${filter[f]}]`);
  return `filter=${filters.join(",")}`;
};

// Generate the includes for the api request
// Takes in an array ["foo", "bar"], and converts it to `?includes=foo,bar`
const getIncludes = (include) => {
  if (!include) {
    return "";
  }

  const includes = include.join(",");

  return `include=${includes}`;
};

export {
  getFilters as filters,
  getIncludes as includes,
};
