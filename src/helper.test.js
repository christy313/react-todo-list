import getId from "./helper";

describe("getId", () => {
  it("should generate an id by current time", () => {
    expect(getId()).toBe(new Date().getTime());
  });
});
const fixTime = new Date().getTime();
console.log(fixTime);
