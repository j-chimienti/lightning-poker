import { generateChipStack } from "./utils";

test("#generateChipStack", () => {
  expect(generateChipStack(5000)).toEqual({ 5000: 1 });
  expect(generateChipStack(5002)).toEqual({ 5000: 1, 1: 2 });
  expect(generateChipStack(5012)).toEqual({ 5000: 1, 1: 2, 10: 1 });
  expect(generateChipStack(5212)).toEqual({ 5000: 1, 100: 2, 1: 2, 10: 1 });
  expect(generateChipStack(5713)).toEqual({
    5000: 1,
    500: 1,
    100: 2,
    10: 1,
    1: 3
  });

  expect(generateChipStack(9950)).toEqual({
    5000: 1,
    2000: 2,
    500: 1,
    100: 4,
    50: 1
  });
});
