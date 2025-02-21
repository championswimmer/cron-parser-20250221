# Cron Parser CLI Tool Specification

## Overview
This command-line tool parses and evaluates cron expressions. It provides two functionalities:

1. **Next Scheduled Runs**: Given a cron expression, it outputs the next N scheduled execution times.
2. **Validation for a Specific Time**: Given a cron expression and a datetime instance, it determines whether the job should run at that time (returns true/false).

The tool supports standard cron syntax, including wildcards (`*`), step values (`/`), and ranges (`-`) across all cron fields.

---

## Features
### 1. Next Scheduled Runs
**Command:**
```sh
cron-parser next "<cron_expression>" [--count N]
```

**Description:**
- Given a cron expression, it calculates and prints the next `N` execution times (default is 5 if not specified).
- Supports all five standard cron fields:
  - Minute (0-59)
  - Hour (0-23)
  - Day of Month (1-31)
  - Month (1-12)
  - Day of Week (0-6, where 0 is Sunday)
- The execution times are printed in chronological order.
- If the cron expression is invalid, it returns an error message.

**Example:**
```sh
cron-parser next "*/15 9-17 * * 1-5" --count 3
```
**Output:**
```
2025-02-21 09:00:00
2025-02-21 09:15:00
2025-02-21 09:30:00
```

---

### 2. Validation for a Specific Time
**Command:**
```sh
cron-parser check "<cron_expression>" "YYYY-MM-DD HH:MM"
```

**Description:**
- Given a cron expression and a specific datetime, it evaluates whether the cron job should execute at that moment.
- Returns `true` if the cron job matches the datetime, otherwise `false`.
- Supports all cron field syntax variations.
- Expects the datetime in `YYYY-MM-DD HH:MM` format.
- If the cron expression is invalid, it returns an error message.

**Example:**
```sh
cron-parser check "*/30 9-17 * * 1-5" "2025-02-21 09:30"
```
**Output:**
```
true
```

---

## Supported Cron Syntax
| Symbol | Description |
|---------|-------------|
| `*` | Wildcard, matches all values for a field |
| `,` | List separator, allows specifying multiple values |
| `-` | Range, allows specifying a range of values |
| `/` | Step, allows skipping values at a defined interval |

**Examples:**
- `*/15 * * * *` → Runs every 15 minutes.
- `0 9-17 * * 1-5` → Runs at the start of every hour between 9 AM and 5 PM, Monday to Friday.
- `30 8-18/2 * * *` → Runs at 8:30, 10:30, 12:30, etc., up to 18:30 every day.

---

## Error Handling
- If the cron expression is invalid, the tool should return an appropriate error message.
- If the datetime format is incorrect, the tool should display a usage message and expected format.

---

## Implementation Considerations
- The tool should be implemented in Python, using the `datetime` module for date/time calculations.
- Consider using a library like `croniter` to handle cron parsing and evaluation.
- Ensure the tool runs efficiently, even for complex cron expressions.

---

## Future Enhancements
- Support for extended cron syntax (e.g., `@hourly`, `@daily`).
- Option to output times in different time zones.
- Ability to read cron expressions from a file.


