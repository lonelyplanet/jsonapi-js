import clone from "lodash/clone";
import each from "lodash/each";
import find from "lodash/find";
import camelCase from "lodash/camelCase";
import memoize from "lodash/memoize";
import isEmpty from "lodash/isEmpty";
import { fetch } from "./request";

const _ = {
  clone, each, find, camelCase, memoize, isEmpty,
};

/**
 * Recursively process a document
 * @param  {object} document A JsonAPI Document
 * @return {Resource | [Resource]}  Returns a resorce or an array of resources
 */
function createResourceFromDocument(document) {
  if (Array.isArray(document.data)) {
    return document.data.map((d) => createResourceFromDocument({
      ...d,
      included: document.included,
      links: d.links,
    }));
  }

  const doc = document.data ? document.data : document;
  const links = document.links;
  const included = document.included;

  if (!doc.type || !doc.id) {
    return null;
  }

  const { id, type, attributes, relationships, meta } = doc;

  return new Resource({
    id,
    type,
    attributes,
    relationships,
    meta,
    links,
    included,
  });
}

let count = 0;

/**
 * An abstraction over JsonAPI resources
 * A Resource's attributes will be added as instance properties
 */
export default class Resource {
  static get ignoreRelationships() {
    return this._ignoreRelationships || ["to"];
  }
  static set ignoreRelationships(value) {
    this._ignoreRelationships = value;
  }
  /**
   * Creates an instance of a Resource based on a JsonAPI compliant document
   * @param  {object} document The JsonAPI compliant document
   * @return {Resource} An instance of the Resource class
   */
  static from(document) {
    const run = _.memoize(createResourceFromDocument);
    const resource = run(document);

    return Array.isArray(resource) ?
      resource.map(r => r.toJs()) :
      resource.toJs();
  }
  /**
   * Constructor for a resource
   * @param  {string} options
   * @param  {string} options.id=""
   * @param  {string} options.type=""
   * @param  {string} [options.attributes=""]
   * @param  {string} [options.relationships={}]
   * @param  {string} [options.links={}]
   * @param  {string} [options.meta={}]
   * @param  {string} [options.included=[]]
   * @return {Resource} An instance of a Resource
   */
  constructor({
    id,
    type,
    attributes = {},
    relationships = {},
    links = {},
    meta = {},
    included = [],
  } = {},
  _fetch = fetch) {
    this.id = id;
    this.type = type;
    this.relationships = relationships;
    this.links = links;
    this.meta = meta;

    this._fetch = _fetch;
    this._attributes = attributes;
    this._included = included;

    this._create();
  }
  fetch(...args) {
    return new Promise((resolve, reject) => {
      this._fetch(...args)
        .then((r) => resolve(this._resolve(r)))
        .catch(reject);
    });
  }
  _resolve(response) {
    return (response && !_.isEmpty(response)) ? {
      model: Resource.from(response),
      response,
    } : {
      model: null,
      response: null,
    };
  }
  find(options = {}) {
    return new Promise((resolve, reject) => {
      this.fetch({
        resource: `${this.endpoint}`,
        ...options,
      })
      .then(resolve)
      .catch(reject);
    });
  }
  findById(id, options) {
    return new Promise((resolve, reject) => {
      this.fetch({
        resource: `${this.endpoint}/${id}`,
        ...options,
      })
      .then(resolve)
      .catch(reject);
    });
  }
  /**
   * Recursively parses the document and adds relationships and attributes to the instance
   * @private
   */
  _create() {
    _.each(this._attributes, (attribute, key) => {
      this[_.camelCase(key)] = _.clone(attribute);
    });

    _.each(this.relationships, (rel, key) => {
      const camelKey = _.camelCase(key);

      // Admittedly don't love this, but infinite loops happen when recursing. TM
      if (!rel.data || Resource.ignoreRelationships.indexOf(key) > -1) {
        return;
      }

      if (Array.isArray(rel.data)) {
        _.each(rel.data, (relatedResource) => {
          const related = _.find(this._included, i =>
            i.type === relatedResource.type &&
            i.id === relatedResource.id);

          if (related) {
            this[camelKey] = this[camelKey] || [];

            // Exclude any relationships that reference back to original resource to
            // prevent infinite looping issues
            const modifiedRelated = {};
            _.each(related.relationships, (includedRel, includedRelKey) => {
              if (Array.isArray(includedRel.data) && includedRel.data.find(r =>
                  r.id === this.id &&
                  r.type === this.type) ||
                  (includedRel.data && includedRel.data.id === this.id
                  && includedRel.data.type === this.type)) {
                return;
              }

              modifiedRelated[includedRelKey] = includedRel;
            });

            related.relationships = modifiedRelated;
            this[camelKey].push(createResourceFromDocument({
              ...related,
              included: this._included,
            }));
          }
        });
      } else {
        const related = _.find(this._included, i =>
          i.type === rel.data.type &&
          i.id === rel.data.id);

        if (related) {
          this[camelKey] = createResourceFromDocument({
            ...related,
            included: this._included,
          });
        }
      }
    });
  }
  /**
   * Return the JavaScript object for this resource
   * @return {[type]} [description]
   */
  toJs() {
    const js = {};

    Object.keys(this).forEach((key) => {
      // Removes "private" things
      if (this.hasOwnProperty(key) && key[0] !== "_") {
        if (this[key] instanceof Resource) {
          js[key] = this[key].toJs();
        } else if (Array.isArray(this[key])) {
          js[key] = this[key].reduce((memo, i) => {
            if (i instanceof Resource) {
              memo.push(i.toJs());
            } else {
              memo.push(i);
            }

            return memo;
          }, []);
        } else {
          js[key] = this[key];
        }
      }
    });

    return js;
  }
}
