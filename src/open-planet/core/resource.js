import { get } from "./request";

export default class Resource {
  constructor(attributes={}) {
    this.attributes = Object.assign({}, this.defaults, attributes);
    this.get = attributes.get || get;
  }
  get path() {
    return this.name.toLowerCase();
  }

  find(options = {}) {
    if (options.id) {
      return this.findById(options);
    }

    return this.get({
      resource: `${this.path}`,
      include: options.include,
    });
  }
  findById({ id, include }) {
    return this.get({
      resource: `${this.path}/${id}`,
      include,
    });
  }
}
