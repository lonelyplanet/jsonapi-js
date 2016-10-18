import { processErrors } from "../src/core/request";
import { expect } from "chai";

describe("request", function() {
  it("should process an error", () => {
    processErrors({
      url: "http://api.foo.com",
      body: {
        errors: [{ title: "Foo bar is bad", detail: "Very Bad!" }],
      },
      callback: function(err) {
        expect(err.message).to.equal(
          "JSONAPI Foo bar is bad: Very Bad! on http://api.foo.com");
      }
    });
  });
  
  it("should process multiple errors", () => {
    processErrors({
      url: "http://api.foo.com",
      body: {
        errors: [
          { title: "Foo bar is bad", detail: "Very Bad!" },
          { title: "Foo baz is bad", detail: "Very Baz!" }],
      },
      callback: function(err) {
        expect(err.message).to.equal(
          "JSONAPI Foo bar is bad Very Bad!\nFoo baz is bad Very Baz!");
      }
    });
  });
});