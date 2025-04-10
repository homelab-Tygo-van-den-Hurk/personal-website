import { RedirectNodeHub, RedirectNodeLeaf } from "#source/redirectNode";
import { describe, it, expect } from "vitest";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Designing Test Input ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const endNode1 = new RedirectNodeLeaf({ name: "endNode1", hidden: false, url: new URL("http://localhost/endNode1") });
const endNode2 = new RedirectNodeLeaf({ name: "endNode2", hidden: false, url: new URL("http://localhost/endNode2") });
const endNode3 = new RedirectNodeLeaf({ name: "endNode3", hidden: false, url: new URL("http://localhost/endNode3") });
const endNode4 = new RedirectNodeLeaf({ name: "endNode4", hidden: false, url: new URL("http://localhost/endNode4") });
const endNode5 = new RedirectNodeLeaf({ name: "endNode5", hidden: false, url: new URL("http://localhost/endNode5") });
const endNode6 = new RedirectNodeLeaf({ name: "endNode6", hidden: false, url: new URL("http://localhost/endNode6") });
const endNode7 = new RedirectNodeLeaf({ name: "endNode7", hidden: false, url: new URL("http://localhost/endNode7") });

//| Hub nodes

const hubNode1 = new RedirectNodeHub({
  name: "hubNode1", hidden: false, children: {
    "endNode6": endNode6, 
    "endNode7": endNode7,
  }
});

const hubNode2 = new RedirectNodeHub({
  name: "hubNode2", hidden: false, children: {
    "endNode4": endNode4, 
    "endNode5": endNode5,
  }
});

const hubNode3 = new RedirectNodeHub({
  name: "hubNode3", hidden: false, children: {
    "endNode2": endNode2, 
    "hubNode2": hubNode2
  }
});

/**
 * Returns the following test input:
 * 
 *```yaml
 * root:
 *   hubNode3:
 *     endNode2
 *     hubNode2:
 *       endNode4
 *       endNode5
 *   hubNode1:
 *     endNode6
 *     endNode7
 *   endNode7
 *```
 */
const root = new RedirectNodeHub({
  name: "hubNode4", hidden: false, children: {
    "hubNode3": hubNode3, 
    "hubNode1": hubNode1,
    "endNode7": endNode7
  }
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Testing Recursion ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

describe("recursion-depth-1-defined-hub", () => {
  it("we test if recursion on a depth of 1 works when the path exists.", () => {
    const path = [ "hubNode3" ];
    expect(root.recurse(path)).toBe(hubNode3);
  });
});

describe("recursion-depth-1-defined-endpoint", () => {
  it("we test if recursion on a depth of 1 works when the path exists.", () => {
    const path = [ "endNode7" ];
    expect(root.recurse(path)).toBe(endNode7);
  });
});

describe("recursion-depth-1-undefined", () => {
  it("we test if recursion on a depth of 1 works when the path does not exist.", () => {
    const path = ["undefined"];
    expect(root.recurse(path)).toBe(undefined);
  });
});

describe("recursion-depth-2-defined-endpoint", () => {
  it("we test if recursion on a depth of 2 works when the path exists, and ends at a endpoint.", () => {
    const path = ["hubNode3", "endNode2"];
    expect(root.recurse(path)).toBe(endNode2);
  });
});

describe("recursion-depth-2-defined-hub", () => {
  it("we test if recursion on a depth of 2 works when the path exists, and ends at a hub.", () => {
    const path = ["hubNode3", "hubNode2"];
    expect(root.recurse(path)).toBe(hubNode2);
  });
});


describe("recursion-depth-2-undefined", () => {
  it("we test if recursion on a depth of 2 works when the path exists.", () => {
    const path = ["hubNode3", "undefined"];
    expect(root.recurse(path)).toBe(undefined);
  });
});


describe("recursion-depth-3-defined-endpoint", () => {
  it("we test if recursion on a depth of 3 works when the path exists, and ends at a endpoint.", () => {
    const path = ["hubNode3", "hubNode2", "endNode4" ];
    expect(root.recurse(path)).toBe(endNode4);
  });
});

describe("recursion-depth-4-undefined", () => {
  it("we test if recursion on a depth of 4 works when the path does not exist, because we recurse on an endpoint.",
    () => {
    const path = ["hubNode3", "hubNode2", "endNode4" ];
    expect(root.recurse(path)).toBe(endNode4);
  });
});
