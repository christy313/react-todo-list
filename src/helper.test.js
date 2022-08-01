import { getId } from "./helper";

describe("getId()", () => {
  it("should return a correct id", () => {
    const mockDate = new Date(1659195632003);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    expect(getId()).toEqual(mockDate.getTime());
  });
});
