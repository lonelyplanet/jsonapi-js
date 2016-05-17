import Resource from "../../src/open-planet/core/resource";
import { expect } from "chai";
import sinon from "sinon";

describe("resource", function resource() {
  it("should have a find method", () => {
    class FakeResource extends Resource {
      name = "FakeResource";
    }

    expect(new FakeResource().find).to.be.ok;
  });

  it("should get a resource", (done) => {
    class FakeResource extends Resource {
      name = "FakeResource";
    }
    const get = sinon.stub().returns({
      then(callback) {
        callback();
        return {
          catch: sinon.stub(),
        }
      },
    });

    const instance = new FakeResource({
      get,
    });

    instance.find().then(() => {
      expect(get.calledOnce).to.be.ok;
      done();
    });
  });
});
