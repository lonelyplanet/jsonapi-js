import superagent from "superagent";
import superagentJsonapify from "superagent-jsonapify";
import circuitbreaker from "circuitbreaker";
import { filters, includes } from "./urlBuilder";

superagentJsonapify(superagent);

const responseCache = {};

// Private makeRequest method to pass to our circuitbreaker
const makeRequest = function makeRequest(url, callback) {
  return superagent.get(url)
  .set("content-type", "application/vnd.api+json")
  .set("accept", "*/*")
  .end((err, response) => {
    if (err && !err.response) {
      return callback(new Error(`Open Planet ${err.message}`));
    }

    if (err && err.response.status === 500) {
      return callback(new Error(`Open Planet ${err.message}: ${err.response.body.message || err.response.text}`));
    }

    if (err && err.response.status === 404) {
      return callback(null);
    }

    try {
      const model = response.body;
      responseCache[url] = response.body;
      return callback(null, model);
    } catch (e) {
      return callback(e);
    }
  });
};

// An abstraction over retrieving a resource via a url
const get = ({ resource, include, filter, cache = true } = {}) => new Promise((resolve, reject) => {
  const host = process.env.OPEN_PLANET_HOST;
  const url = `${host}/${resource}?${includes(include)}&${filters(filter)}`;

  if (cache && responseCache[url]) {
    return resolve(responseCache[url]);
  }

  const breaker = circuitbreaker(makeRequest, {
    timeout: 3000,
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

export { get };
