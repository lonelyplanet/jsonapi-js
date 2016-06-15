"use strict";

import Resource from "../core/resource";
import { get } from "../core/request";

export default class Places extends Resource {
  name = "Places";
  /**
   * @example
   *
   * const places = new Places({ id: 1234 });
   * places.pois().then((pois) => {
   *   return pois;
   * });
   *
   */
  pois({ include, filter } = {}) {
    if (!this.attributes.id) {
      throw new Error("Either first fetch this model, or set an id in the constructor.");
    }

    return get({
      resource: `${this.path}/${this.attributes.id}/pois`,
      include,
      filter
    });
  }
}
