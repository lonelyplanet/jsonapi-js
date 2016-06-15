"use strict";
import Resource from "../core/resource";

class Pois extends Resource {
  name = "Pois";

  images() {
    if (!this.attributes.id) {
      throw new Error("Either first fetch this model, or set an id in the constructor.");
    }

    return this.get({
      resource: `${this.path}/${this.attributes.id}/images`,
      include: ["from"],
    });
  }
}

module.exports = Pois;
