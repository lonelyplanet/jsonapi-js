import statsd from "../src/decorators/statsd";
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
      return {
        then(callback) {
          // Simulate response time
          setTimeout(callback, 10);
          return {
            catch() {},
          };
        },
        catch(callback) {
          return callback();
        },
      };
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
    }).catch(console.log);
  });

  it("should send fail counts", (done) => {
    const decorator = statsd("foo", fakeStatsdClient);

    // Isn't it fun to fake a promise ಠ_ಠ
    const fakeMethod = function fakeMethod() {
      return {
        then() {
          return {
            catch(callback) {
              return callback();
            },
          };
        },
        catch(callback) {
          return callback();
        },
      };
    };

    const descriptor = {
      value: fakeMethod
    };
    decorator(null, null, descriptor);

    descriptor.value("oh hai").catch(() => {
      // The setTimeout here forces this assertion to run after the catch in the decorator
      expect(fakeStatsdClient.increment.getCall(0).args[0]).to.equal("open_planet.nodejs.foo.get.fail.count");
      done();
    });
  });
});
