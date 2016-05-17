import { filters } from "../../src/open-planet/core/urlBuilder";
import { expect } from "chai";

describe("urlBuilder", () => {
  it("should create filters", () => {
    const filterString = filters({
      foo: "bar",
      fooBar: "baz",
    });

    expect(filterString).to.equal("filter=foo[bar],foo_bar[baz]");
  });
});
