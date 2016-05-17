import statsd from "../../src/open-planet/decorators/statsd";
import { expect } from "chai";
import sinon from "sinon";

describe("statsd decorator", function resource() {
  let fakeStatsdClient;

  beforeEach(() => {
    fakeStatsdClient = {
      timing: sinon.stub(),
      increment: sinon.stub(),
    };
  });

  it("should return a decorator function", () => {
    const decorator = statsd();

    expect(typeof decorator).to.equal("function");
  });

  it("should wrap a function", (done) => {
    const decorator = statsd("foo", fakeStatsdClient);

    const fakeMethod = function fakeMethod() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1);
      });
    };

    const descriptor = {
      value: fakeMethod
    };
    decorator(null, null, descriptor);

    descriptor.value("oh hai").then(() => {
      expect(fakeStatsdClient.timing.calledOnce).to.be.ok;
      expect(fakeStatsdClient.timing.getCall(0).args[0]).to.equal("open_planet.nodejs.foo.get.success.response_time");
      expect(fakeStatsdClient.increment.getCall(0).args[0]).to.equal("open_planet.nodejs.foo.get.success.count");
      done();
    });
  });

  it("should send fail counts", (done) => {
    const decorator = statsd("foo", fakeStatsdClient);

    const fakeMethod = function fakeMethod() {
      return new Promise((resolve, reject) => {
        reject();
      });
    };

    const descriptor = {
      value: fakeMethod
    };
    decorator(null, null, descriptor);

    descriptor.value("oh hai").catch(() => {
      // The setTimeout here forces this assertion to run after the catch in the decorator
      process.nextTick(() => {
        expect(fakeStatsdClient.increment.getCall(0).args[0]).to.equal("open_planet.nodejs.foo.get.fail.count");
        done();
      });
    });
  });
});
