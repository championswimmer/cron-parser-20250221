import { describe, expect, test} from '@jest/globals';
import { parseTimeString } from 'time';

describe('Parsing time', () => {
  test('should parse correctly: "2025-02-21 16:55"', () => {
    // expect the parsed date to be 21 Feb 2025, 4:55PM, Friday
    const parseTime = parseTimeString('2025-02-21 16:55');
    expect(parseTime.getMonth()).toBe(1);
    expect(parseTime.getDate()).toBe(21);
    expect(parseTime.getFullYear()).toBe(2025);
    expect(parseTime.getHours()).toBe(16);
    expect(parseTime.getMinutes()).toBe(55);
    expect(parseTime.getDay()).toBe(5);

  })
})


describe("Check cron date valid for time", () => {
  
})