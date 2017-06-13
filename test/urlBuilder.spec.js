import {
  build,
  underscore,
  unbuild,
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

  it("should build urls with custom params like expanded_children", () => {
    const base = "http://api.lonelyplanet.com";
    const resource = "places/360761/narratives/planning/if-you-like";

    const url = build({
      base,
      resource,
      expanded_children: true
    });

    expect(url).to.equal(`${base}/${resource}?expanded_children=true`);
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
      includes: ["containing_place"],
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

  it("should build urls with only filters and a sort", () => {
    const base = "http://api.lonelyplanet.com";
    const resource = "pois";

    const url = build({
      base,
      resource,
      filters: {
        poiType: ["eating"],
      },
      sort: "top_choice",
    });

    expect(url).to.equal(`${base}/${resource}?filter[poi_type][equals]=eating&sort=top_choice`);
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

    expect(url).to.equal("http://api.lonelyplanet.com/pois?include=image_associations.from&filter[place_id][has_ancestor]=12345");
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
      includes: ["image_associations.from"],
    })).to.equal(`${base}/${resource}?include=image_associations.from&page[limit]=20&page[offset]=40`);
  });

  it("should filter by multiple operator value objects", () => {
    const filterString = build({
      base: "http://api.lonelyplanet.com",
      resource: "lodgings",
      filters: {
        available: [{
          operator: "from",
          value: "1973-1-1",
        }, {
          operator: "to",
          value: "1973-1-8",
        }],
        lodging: {
          place_id: {
            operator: "has_ancestor",
            value: 1234,
          },
          subtypes: ["resort"],
          cost: [{
            operator: "from",
            value: "0",
          }, {
            operator: "to",
            value: "100",
          }],
          review: true,
        },
      },
    });

    expect(filterString).to.equal("http://api.lonelyplanet.com/lodgings?filter[available][from]=1973-1-1&filter[available][to]=1973-1-8&filter[lodging][place_id][has_ancestor]=1234&filter[lodging][subtypes][equals]=resort&filter[lodging][cost][from]=0&filter[lodging][cost][to]=100&filter[lodging][review][exists]");
  });

  it("should reverse url building into an object", () => {
    const url = "http://api.lonelyplanet.com/lodgings/availability?" +
      "include=foo,foo.bar&" +
      "filter[available][from]=1973-1-1&" +
      "filter[available][to]=1973-1-8&" +
      "filter[lodging][place_id][has_ancestor]=1234&" +
      "filter[poi_type][equals]=eating&" +
      "filter[subtypes][equals]=foo,bar&" +
      "page[limit]=20&page[offset]=40&" +
      "sort=top_choice";
    const params = unbuild(url);

    expect(params.includes.length).to.equal(2);
    expect(params.base).to.equal("http://api.lonelyplanet.com");
    expect(params.resource).to.equal("lodgings/availability");
    expect(params.filters.available.length).to.equal(2);
    expect(params.filters.lodging.placeId.operator).to.equal("hasAncestor");
    expect(params.filters.lodging.placeId.value).to.equal("1234");
    expect(params.filters.poiType).to.equal("eating");
    expect(params.filters.subtypes.length).to.equal(2);
    expect(params.perPage).to.equal(20);
    expect(params.page).to.equal(3);
    expect(params.sort).to.equal("top_choice");

    const rebuilt = build(params);

    expect(rebuilt).to.equal(url);
  });

  it("should merge url and filter object", () => {
    const filterString = build({
      base: "http://api.lonelyplanet.com",
      resource: "/pois?sort=top_choice&filter[poi_type][equals]=eating&filter[subtypes][equals]=Italian&filter[place_id][has_ancestor]=362079&page[limit]=10&page[offset]=10&include=image-associations.from,containing-place.ancestry&subtypes=Italian&location=123",
      filters: {
        poiType: "eating",
        location: [123, 456],
        placeId: {
          operator: "hasAncestor",
          value: [362079, 362080],
        },
      },
    });

    expect(filterString).to.equal("http://api.lonelyplanet.com/pois?filter[poi_type][equals]=eating&filter[subtypes][equals]=Italian&filter[place_id][has_ancestor]=362079,362080&filter[location][equals]=123,456&page[limit]=10&page[offset]=10&sort=top_choice");
  });

  it("should merge place data for partner activities", () => {
    const url = "http://api.lonelyplanet.com/partner-activities?filter%5Bduration%5D%5Bfrom%5D=4320&filter%5Bplace%5D%5Bequals%5D=361858&page%5Blimit%5D=10&page%5Boffset%5D=10";
    const params = unbuild(url);

    expect(params.filters.place).to.equal("361858");
  });

  it("should merge url and filter object with price filter", () => {
    const filterString = build({
      base: "http://api.lonelyplanet.com",
      resource: '/partner-activities?filter[partner_activity][place][equals]=362079',
      filters: {
        partner_activity: {
        duration: { operator: 'to', value: 4320 },
        price: { operator: 'between', value: '385,1000' } },
      }
    });

    expect(filterString).to.equal("http://api.lonelyplanet.com/partner-activities?filter[partner_activity][place][equals]=362079&filter[partner_activity][duration][to]=4320&filter[partner_activity][price][between]=385,1000");
  });

  it("should merge unbuilt url and filter object without creating duplicates", () => {
    const filterString = build({
      base: "http://api.lonelyplanet.com",
      resource:'/partner-activities?filter[partner_activity][duration][to]=4320&filter[partner_activity][place][equals]=362079&filter[partner_activity][price][between]=385,1000&page[limit]=10&page[offset]=10',
      filters: {
        partner_activity: {
          duration: { operator: 'to', value: 4320 },
          price: { operator: 'between', value: '385,1000' } },
        }
    });

    expect(filterString).to.equal("http://api.lonelyplanet.com/partner-activities?filter[partner_activity][duration][to]=4320&filter[partner_activity][place][equals]=362079&filter[partner_activity][price][between]=385,1000&page[limit]=10&page[offset]=10");
  });

  it("should unbuild the query string with a nested filter object", () => {
    const filterString = {
      base: "http://api.lonelyplanet.com",
      resource:'/partner-activities?filter[partner_activity][duration][to]=4320&filter[partner_activity][place][equals]=362079&filter[partner_activity][price][between]=385,1000&page[limit]=10&page[offset]=10',
      filters: {
        partner_activity: {
          duration: { operator: 'to', value: 4320 },
          price: { operator: 'between', value: '385,1000' } },
        }
    };

    const params = unbuild(`${filterString.base}${filterString.resource}`);

    let expectedFilters = {
      "partnerActivity": {
        "duration": {
          "operator": "to",
          "value": "4320",
        },
        "place": "362079",
        "price": {
          "operator": "between",
          "value": "385,1000",
        }
      }
    };

    expect(params.filters).to.deep.equal(expectedFilters);
  });


});
