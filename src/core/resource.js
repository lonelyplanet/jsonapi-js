// @flow

import clone from "lodash/clone";
import each from "lodash/each";
import find from "lodash/find";
import camelCase from "lodash/camelCase";
import isEmpty from "lodash/isEmpty";
import { fetch } from "./request";

export type IResource = {
  id: number,
  type: string,
  attributes: Object,
  relationships: Object,
  meta: Object,
  links: Object,
  included: Array<Object>,
};

const _ = {
  clone, each, find, camelCase, isEmpty,
};

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
    const resource = createResourceFromDocument(document);

    if (!resource) return null;

    return Array.isArray(resource) ?
      resource.filter(r => r).map(r => r.toJs()) :
      resource.toJs();
  }

  id: number;
  type: string;
  attributes: Object;
  relationships: Object;
  links: Object;
  meta: Object;
  included: Array<Object>;
  _fetch: () => Promise<Resource>;
  _attributes: Object;

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
  }: IResource = {},
  _fetch: Function = fetch) {
    this.id = id;
    this.type = type;
    this.relationships = relationships;
    this.links = links;
    this.meta = meta;

    this._fetch = _fetch;
    this._attributes = attributes;
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
   * Adds relationships and attributes to the instance
   * @private
   */
  _create(allResources) {
    _.each(this._attributes, (attribute, key) => {
      this[_.camelCase(key)] = _.clone(attribute);
    });

    _.each(this.relationships, (rel, key) => {
      const camelKey = _.camelCase(key);

      if (!rel.data || Resource.ignoreRelationships.indexOf(key) > -1) {
        return;
      }

      if (Array.isArray(rel.data)) {
        const linked = [];

        _.each(rel.data, (relatedResource) => {
          const related = allResources[resourceLinkageKey(relatedResource)];

          if (related) {
            linked.push(related.resource);
          }
        });

        if (!_.isEmpty(linked)) {
          this[camelKey] = linked;
        }
      } else {
        const related = allResources[resourceLinkageKey(rel.data)];

        if (related) {
          this[camelKey] = related.resource;
        }
      }
    });
  }
  /**
   * Return the JavaScript object for this resource
   * @return {[type]} [description]
   */
  toJs() {
    if (!this._js) {
      this._js = {};
      Object.keys(this).forEach((key) => {
        // Removes "private" things
        if (this.hasOwnProperty(key) && key[0] !== "_") {
          if (this[key] instanceof Resource) {
            this._js[key] = this[key].toJs();
          } else if (Array.isArray(this[key])) {
            this._js[key] = this[key].reduce((memo, i) => {
              if (i instanceof Resource) {
                memo.push(i.toJs());
              } else {
                memo.push(i);
              }

              return memo;
            }, []);
          } else {
            this._js[key] = this[key];
          }
        }
      });
    }

    return this._js;
  }
}

function resourceLinkageKey(resource: Resource): string {
  if (!resource.type || !resource.id) {
    return "";
  }

  return `${resource.type}_${resource.id}`;
}

function createSingleResource(document): Resource {
  const doc = document.data ? document.data : document;
  const links = document.links;
  const included = document.included;

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

function addResource(data): { resourceLinkage: string, resource: Resource } {
  const resource = createSingleResource(data);
  return {
    resourceLinkage: resourceLinkageKey(resource),
    resource,
  };
}

function createResourceFromCollectionDocument(document) {
  const resources = [];
  const included = [];

  _.each(document.data, (d) => {
    if (d) {
      resources.push(addResource({
        ...d,
        included: document.included,
        links: d.links,
      }));
    }
  });
  _.each(document.included, (d) => included.push(addResource(d)));

  const allDocuments = {};

  _.each(resources, (r) => {
    allDocuments[r.resourceLinkage] = r;
  });

  _.each(included, (r) => {
    if (!allDocuments[r.resourceLinkage]) {
      allDocuments[r.resourceLinkage] = r;
    }
  });

  _.each(allDocuments, (r) => r.resource._create(allDocuments));

  return resources.map((r) => r.resource);
}

/**
 * Recursively process a document
 * @param  {object} document A JsonAPI Document
 * @return {Resource | [Resource]}  Returns a resource or an array of resources
 */
function createResourceFromDocument(document): Resource | Resource[] | null {
  if (Array.isArray(document.data)) {
    return createResourceFromCollectionDocument(document);
  }

  const resources = createResourceFromCollectionDocument({
    ...document,
    data: [document.data],
  });

  if (!_.isEmpty(resources)) {
    return resources[0];
  }

  return null;
}

