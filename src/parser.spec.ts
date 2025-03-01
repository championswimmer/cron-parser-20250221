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
    const parsedCron = parseCronString('1-5 1 1 1 1');
    expect(parsedCron.minute).toEqual([1, 2, 3, 4, 5]);
    expect(parsedCron.hour).toEqual([1]);
    expect(parsedCron.dayOfMonth).toEqual([1]);
    expect(parsedCron.month).toEqual([1]);
    expect(parsedCron.dayOfWeek).toEqual([1]);
  });

  test('should parse correctly "*/15 9-17 * * 1-5" ', () => {
    const parsedCron = parseCronString('*/15 9-17 * * 1-5');
    expect(parsedCron.minute).toEqual([0, 15, 30, 45]);
    expect(parsedCron.hour).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
    expect(parsedCron.dayOfMonth).toEqual(Array.from({ length: 31 }, (_, i) => i + 1));
    expect(parsedCron.month).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
    expect(parsedCron.dayOfWeek).toEqual([1, 2, 3, 4, 5]);
  });

  test('should parse correctly "30 8-18/2 * * *" ', () => {
    const parsedCron = parseCronString('30 8-18/2 * * *');
    expect(parsedCron.minute).toEqual([30]);
    expect(parsedCron.hour).toEqual([8, 10, 12, 14, 16, 18]);
    expect(parsedCron.dayOfMonth).toEqual(Array.from({ length: 31 }, (_, i) => i + 1));
    expect(parsedCron.month).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
    expect(parsedCron.dayOfWeek).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  test('should parse correctly "0 9-17 * * 1-5" ', () => {
    const parsedCron = parseCronString('0 9-17 * * 1-5');
    expect(parsedCron.minute).toEqual([0]);
    expect(parsedCron.hour).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
    expect(parsedCron.dayOfMonth).toEqual(Array.from({ length: 31 }, (_, i) => i + 1));
    expect(parsedCron.month).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
    expect(parsedCron.dayOfWeek).toEqual([1, 2, 3, 4, 5]);
  });

  test('should parse correctly "5,10,15,20 * 1,15 * *" ', () => {
    const parsedCron = parseCronString('5,10,15,20 * 1,15 * *');
    expect(parsedCron.minute).toEqual([5, 10, 15, 20]);
    expect(parsedCron.hour).toEqual(Array.from({ length: 24 }, (_, i) => i));
    expect(parsedCron.dayOfMonth).toEqual([1, 15]);
    expect(parsedCron.month).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
    expect(parsedCron.dayOfWeek).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  test('should error on invalid cron string "1 1 1 1"', () => {
    expect(() => parseCronString('1 1 1 1')).toThrowError('Invalid Cron String');
  });

  test('should error on invalid cron string "1 1 1 1 1 1"', () => {
    expect(() => parseCronString('1 1 1 1 1 1')).toThrowError('Invalid Cron String');
  });

  test('should error on invalid cron string with non-numeric values', () => {
    expect(() => parseCronString('a 1 1 1 1')).toThrowError();
    expect(() => parseCronString('1 a 1 1 1')).toThrowError();
    expect(() => parseCronString('1 1 a 1 1')).toThrowError();
    expect(() => parseCronString('1 1 1 a 1')).toThrowError();
    expect(() => parseCronString('1 1 1 1 a')).toThrowError();
  });
})

describe('parseMinute', () => {
  test('should parse correctly "*" ', () => {
    const parsedMinute = parseMinute('*');
    expect(parsedMinute).toEqual(Array.from({ length: 60 }, (_, i) => i));
  });

  test('should parse correctly "1" ', () => {
    const parsedMinute = parseMinute('1');
    expect(parsedMinute).toEqual([1]);
  });

  test('should parse correctly "1-5" ', () => {
    const parsedMinute = parseMinute('1-5');
    expect(parsedMinute).toEqual([1, 2, 3, 4, 5]);
  });

  test('should parse correctly "1,3,5,7" ', () => {
    const parsedMinute = parseMinute('1,3,5,7');
    expect(parsedMinute).toEqual([1, 3, 5, 7]);
  });

  test('should parse correctly "*/5" ', () => {
    const parsedMinute = parseMinute('*/5');
    expect(parsedMinute).toEqual([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
  });

  test('should parse correctly "*/15" ', () => {
    const parsedMinute = parseMinute('*/15');
    expect(parsedMinute).toEqual([0, 15, 30, 45]);
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
    expect(() => parseMinute('-1')).toThrowError('Invalid Minute Value');
  });

  test('should handle edge cases', () => {
    // Empty string
    expect(() => parseMinute('')).toThrowError();
    
    // Invalid step value
    expect(() => parseMinute('*/0')).toThrowError();
    
    // Invalid range (start > end)
    expect(() => parseMinute('5-1')).toThrowError();
  });
});