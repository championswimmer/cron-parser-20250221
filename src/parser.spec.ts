import { describe, test, expect } from '@jest/globals';
import { parseCronString, parseMinute } from './parser';

describe('Parser', () => {
  test('should parse correctly "1 1 1 1 1" ', () => {
    const parsedCron = parseCronString('1 1 1 1 1');
    expect(parsedCron.minute).toEqual([1]);
    expect(parsedCron.hour).toEqual([1]);
    expect(parsedCron.dayOfMonth).toEqual([1]);
    expect(parsedCron.month).toEqual([1]);
    expect(parsedCron.dayOfWeek).toEqual([1]);
  });

  test('should parse correctly "1-5 1 1 1 1" ', () => {
    const parsedCron = parseCronString('1 1 1 1 1');
    expect(parsedCron.minute).toEqual([1, 2, 3, 4, 5]);
    expect(parsedCron.hour).toEqual([1]);
    expect(parsedCron.dayOfMonth).toEqual([1]);
    expect(parsedCron.month).toEqual([1]);
    expect(parsedCron.dayOfWeek).toEqual([1]);
  });

  test('should error on invalid cron string "1 1 1 1"', () => {
    // expect "Invalid Cron String" error

    expect(() => parseCronString('1 1 1 1')).toThrowError('Invalid Cron String');

  });
})

describe('parseMinute', () => {
  test('should parse correctly "*" ', () => {
    const parsedMinute = parseMinute('*');
    expect(parsedMinute).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]);
  });

  test('should parse correctly "1" ', () => {
    const parsedMinute = parseMinute('1');
    expect(parsedMinute).toEqual([1]);
  });

  test('should parse correctly "1-5" ', () => {
    const parsedMinute = parseMinute('1-5');
    expect(parsedMinute).toEqual([1, 2, 3, 4, 5]);
  });

  // test 2 overlapping ranges 
  test('should parse correctly "1-5,3-6" ', () => {
    const parsedMinute = parseMinute('1-5,3-6');
    expect(parsedMinute).toEqual([1, 2, 3, 4, 5, 6]);
  });

  // test with a step 
  test('should parse correctly "1-5/2" ', () => {
    const parsedMinute = parseMinute('1-5/2');
    expect(parsedMinute).toEqual([1, 3, 5]);
  });

  // test two overlapping ranges with different steps 
  test('should parse correctly "1-10/2,7-18/3" ', () => {
    const parsedMinute = parseMinute('1-10/2,7-18/3');
    expect(parsedMinute).toEqual([1, 3, 5, 7, 9, 10, 13, 16]);
  });

  // test for invalid values of minute 
  test('should error on invalid values', () => {
    // error on passing non-numeric values
    expect(() => parseMinute('a')).toThrowError('Invalid Minute Value');
    expect(() => parseMinute('1-a')).toThrowError('Invalid Minute Value');
    expect(() => parseMinute('1-5/a')).toThrowError('Invalid Minute Value');
    // error on passing values outside the range 0-59
    expect(() => parseMinute('60')).toThrowError('Invalid Minute Value');
    expect(() => parseMinute('1-60')).toThrowError('Invalid Minute Value');

  });

});