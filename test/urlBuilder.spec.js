import {
  build,
  underscore,
} from "../src/core/urlBuilder";
import { expect } from "chai";

describe("urlBuilder", () => {
  it("should create filters", () => {
    const filterString = build({
      base: "http://api.lonelyplanet.com",
      resource: "places",
      filters: {
        poiType: ["eating", "sleeping"],
        location: false,
        subtypes: "museum",
      },
    });

    expect(filterString).to.equal("http://api.lonelyplanet.com/places?filter[poi_type][equals]=eating,sleeping&filter[location][notexists]&filter[subtypes][equals]=museum");
  });

  it("should build urls with filters and incldues", () => {
    const base = "http://api.lonelyplanet.com";
    const resource = "pois";

    const url = build({
      base,
      resource,
      filters: {
        poiType: ["eating"],
      },
      includes: ["containing_place"]
    });

    expect(url).to.equal(`${base}/${resource}?include=containing_place&filter[poi_type][equals]=eating`);
  });

  it("should build basic urls", () => {
    const base = "http://api.lonelyplanet.com";
    const resource = "pois";

    const url = build({
      base,
      resource,
    });

    expect(url).to.equal(`${base}/${resource}`);
  });

  it("should build urls with only filters", () => {
    const base = "http://api.lonelyplanet.com";
    const resource = "pois";

    const url = build({
      base,
      resource,
      filters: {
        poiType: ["eating"],
      },
    });

    expect(url).to.equal(`${base}/${resource}?filter[poi_type][equals]=eating`);
  });

  it("should build urls with only includes", () => {
    const base = "http://api.lonelyplanet.com";
    const resource = "pois";

    const url = build({
      base,
      resource,
      includes: ["image_associations.from"],
    });

    expect(url).to.equal(`${base}/${resource}?include=image_associations.from`);
  });

  it("should build urls from a resource", () => {
    const base = "http://api.lonelyplanet.com";
    const resource = "pois?filter[place_id][has_ancestor]=12345";

    const url = build({
      base,
      resource,
      includes: ["image_associations.from"],
    });

    expect(url).to.equal(`${base}/${resource}&include=image_associations.from`);
  });


  it("should have an underscore method", () => {
    expect(underscore("fooBarBaz")).to.equal("foo_bar_baz");
  });

  it("should support pagination", () => {
    const base = "http://api.lonelyplanet.com";
    const resource = "pois";

    expect(build({
      base,
      resource,
      page: 2,
    })).to.equal(`${base}/${resource}?page[limit]=10&page[offset]=10`);

    expect(build({
      base,
      resource,
      page: 3,
      perPage: 20,
      includes: ["image_associations.from"]
    })).to.equal(`${base}/${resource}?include=image_associations.from&page[limit]=20&page[offset]=40`);
  });
});
