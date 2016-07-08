import circuitbreaker from "circuitbreaker";
import { build } from "./urlBuilder";
import isEmpty from "lodash/isEmpty";

const isofetch = typeof window !== "undefined" ?
  require("isomorphic-fetch/fetch-npm-browserify.js") :
  require("isomorphic-fetch");

const _ = {
  isEmpty,
};

const responseCache = {};

// Private makeRequest method to pass to our circuitbreaker
const makeRequest = function makeRequest(url, callback) {
  return isofetch(url).then((response) => {
    if (!response.ok) {
      callback(new Error(`Open Planet Error on ${url}`), null);
    }
    return response.json();
  })
  .then((body) => {
    const errors = (body.errors) || [];

    if (errors.length) {
      if (errors.length === 1) {
        const error = errors[0];

        if (error.status === "404") {
          return callback(null, null);
        }

        return callback(new Error(
          `Open Planet ${error.title}: ${error.detail} on ${url}`
        ));
      }

      return callback(new Error(`Open Planet ${errors.map(e => e.title).join("\n")}`));
    }

    try {
      const model = body;
      responseCache[url] = body;
      return callback(null, _.isEmpty(model) ? null : model);
    } catch (e) {
      return callback(e);
    }
  });
};

/**
 * Fetches a resouce
 * @param {object} options - Options object
 * @param {string} [options.resource] - The resource to fetch
 * @param {array} [options.include] - An array of relationships to include
 * @param {object} [options.filter] - An object of filters
 * @param {number} [options.page] - Number of the page to fetch
 * @param {number} [options.perPage] - How many results per page
 * @param {boolean} [options.cache] = true - Whether to cache the response
 * @return {promise} A promise
 */
function fetch({
  resource,
  includes,
  filters,
  page,
  perPage,
  cache = false,
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
    });

    // Keeping in for now as we're working through OP issues
    process.env.NODE_ENV === "development" && console.log(url);

    if (cache && responseCache[url]) {
      return resolve(responseCache[url]);
    }

    const breaker = circuitbreaker(makeRequest, {
      timeout: 20000,
      maxFailures: 3,
      resetTimeout: 30,
    });

    return breaker(url)
      .then((model) => {
        resolve(model);
      })
      .fail((err) => {
        if (err.message.match(/CircuitBreaker timeout/)) {
          return reject(new Error("Couldn't connect to Open Planet"));
        }

        return reject(err);
      });
  });
}

export { fetch };
