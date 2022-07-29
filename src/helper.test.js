describe("test getId function", () => {
  it("mocks a date like new Date()", () => {
    const mockDate = new Date(1659115097408);
    const globalDate = jest.fn(() => mockDate);

    expect(globalDate()).toBe(mockDate);
  });
});
