import isEmpty from "lodash/isEmpty";
import { build } from "./urlBuilder";
import createTraceToken from "./createTraceToken";

const isofetch = typeof window !== "undefined" ?
  require("isomorphic-fetch/fetch-npm-browserify.js") :
  require("isomorphic-fetch");

const http = typeof window === "undefined" ?
  require("http") :
  null;

const agent = http ?
  new http.Agent({
    keepAlive: true,
  }) :
  null;

const _ = {
  isEmpty,
};

export function processErrors({ url, body, callback }) {
  const errors = body.errors;

  if (errors.length === 1) {
    const error = errors[0];

    if (error.status === "404") {
      return callback(null, null);
    }

    return callback(new Error(
      `JSONAPI ${error.title}: ${error.detail} on ${url}`,
    ));
  }

  return callback(
    new Error(`JSONAPI ${errors.map(e => `${e.title} ${e.detail}`).join("\n")}`),
  );
}

// Private makeRequest method to pass to our circuitbreaker
const makeRequest = function makeRequest(url, callback) {
  const options = {
    headers: {
      "X-Trace-Token": createTraceToken(url),
    },
  };

  if (agent) {
    options.agent = agent;
  }

  return isofetch(url, options).then(response => response.json())
  .then((body) => {
    if (body.errors) {
      return processErrors({ url, body, callback });
    }

    try {
      const model = body;
      return callback(null, _.isEmpty(model) ? null : model);
    } catch (e) {
      return callback(e);
    }
  })
  .catch(e => callback(e, null));
};

/**
 * Fetches a resouce
 * @param {object} options - Options object
 * @param {string} [options.resource] - The resource to fetch
 * @param {array} [options.include] - An array of relationships to include
 * @param {object} [options.filter] - An object of filters
 * @param {number} [options.page] - Number of the page to fetch
 * @param {number} [options.perPage] - How many results per page
 * @return {promise} A promise
 */
function fetch({
  resource,
  includes,
  filters,
  page,
  perPage,
  sort,
  expanded_children,
} = {}) {
  return new Promise((resolve, reject) => {
    const base = process.env.JSONAPIJS_HOST;
    const url = build({
      base,
      resource,
      filters,
      includes,
      page,
      perPage,
      sort,
      expanded_children,
    });

    // Keeping in for now as we're working through OP issues
    process.env.NODE_ENV === "development" && console.log(url);

    return makeRequest(url, (e, response) => {
      if (e) {
        return reject(e);
      }

      return resolve(response);
    });
  });
}

export { fetch };
