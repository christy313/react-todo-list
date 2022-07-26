const getId = () => {
  let id = new Date().getTime();
  return id;
};

test("check id output", () => {
  expect(getId()).toBe(new Date().getTime());
});
