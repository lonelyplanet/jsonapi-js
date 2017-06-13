import Resource from "../src/core/resource";
import { expect } from "chai";
import sinon from "sinon";
import placeDoc from "./fixtures/place.json";
import placeWithImages from "./fixtures/placeWithImages.json"
import pois from "./fixtures/pois.json";
import poi from "./fixtures/poi.json";
// import Benchmark from "benchmark";

describe("Resource", function() {
  it("should have a find method", () => {
    class FakeResource extends Resource {
      endpoint = "fakeresource";
    }

    expect(new FakeResource().find).to.be.ok;
  });

  it("should get a resource", (done) => {
    class FakeResource extends Resource {
      endpoint = "fakeresource";
    }
    const fetch = sinon.stub().returns({
      then(callback) {
        callback(placeDoc);
        return {
          catch: sinon.stub(),
        };
      },
    });

    const instance = new FakeResource({}, fetch);

    instance.find().then((data) => {
      const place = data.model;
      const links = data.response.links;

      expect(place.name).to.equal("Nashville");
      expect(links).to.be.ok;
      expect(fetch.calledOnce).to.be.ok;
      done();
    }).catch(console.log);
  });

  it("should return empty data", () => {
    class FakeResource extends Resource {
      endpoint = "fakeresource";
    }
    const fetch = sinon.stub().returns({
      then(callback) {
        callback();
        return {
          catch(callback) {
            callback();
          },
        };
      },
    });

    const instance = new FakeResource({}, fetch);

    instance.find()
    .then(({ model }) => {
      expect(model).to.not.be.ok;
    })
    .catch((e) => {
      console.log(e);
    });
  });

  it("should add attributes and one to one relationships as instance properties", () => {
    const model = Resource.from(placeDoc);

    expect(model.name).to.equal("Nashville");
    expect(model.placeType).to.equal("city");
    expect(model.type).to.equal("place");
    expect(model.parent.name).to.equal("Tennessee");
    expect(model._links).to.not.be.ok;
    expect(model instanceof Resource).to.not.be.ok;

    expect(JSON.stringify(model)).to.be.ok;
  });

  it("should work on a single resource", () => {
    const model = Resource.from(poi);
    expect(model).to.be.ok;
    expect(model.containingPlace.ancestry.length).to.equal(6);
    expect(model.containingPlace.activities.length).to.equal(10);
    expect(model.containingPlace.activities[0].id).to.equal("g-NUFY");
  });

  it("should add one to many relationships as instance properties", () => {
    const model = Resource.from(placeDoc);

    expect(model.name).to.equal("Nashville");
    expect(model.pois.length).to.equal(10);

    expect(model.pois[0].imageAssociations.from.type)
      .to.equal("image");
    expect(model.pois[0].imageAssociations.from.attribution.name)
      .to.equal("Dove Wedding Photography");
  });

  it("should handle arrays of resources", () => {
    const models = Resource.from(pois).map(p => p);
    expect(models[0].name).to.equal("Union Station Hotel");
    expect(models[0].subtypes.length).to.be.ok;
    expect(models[0].type).to.equal("poi");
    expect(models[1].name).to.equal("Hattie B's");
    expect(models.filter((m) => m.id === "1534790")[0].imageAssociations)
      .to.be.ok;
    expect(models.filter((m) => m.id === "1534790")[0].imageAssociations.from.path)
      .to.equal("/a/g/hi/t/1a68c1375a0936c75218c6228ceae66a-bicentennial-capitol-mall.jpg");
  });

  it("should add many to many relationships as instance properties", () => {
    const model = Resource.from(placeWithImages);

    expect(model.imageAssociations.filter((a) => a.tag === "masthead")[0].from.path)
      .to.equal("/mastheads/stock-photo-casa-batllo%CC%81-1-5045639.jpg");

    expect(model.imageAssociations.filter((a) => a.tag === "hero")[0].from.path)
      .to.equal("/mastheads/stock-photo-di-barcellona-iv-67528947.jpg");

    expect(model.imageAssociations.filter((a) => a.tag === "food")[0].from.path)
      .to.equal("/a/g/hi/t/14992701ade2a32f2fff12f02a078900-western-europe.jpg");
  });

  // Uncomment for testing performance
  // it("should perform well", (done) => {
  //   const suite = new Benchmark.Suite();
  //
  //   suite.add("from place", () => {
  //     Resource.from(placeDoc);
  //   })
  //   .add("from pois", () => {
  //     Resource.from(pois);
  //   })
  //   .on("cycle", function(event) {
  //     console.log(String(event.target));
  //   })
  //   .on("complete", function() {
  //     expect(this.filter("fastest").map("hz")).to.be.greaterThan(400);
  //     done();
  //   })
  //   .run({ async: true });
  // });
});
