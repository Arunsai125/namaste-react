import Sum from "../components/Sum";

test("Calculate sum of two positive numbers", () => {
  const result = Sum(3, 4);
  expect(result).toBe(7);
});
