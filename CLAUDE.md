# Cron Parser Project Guidelines

## Build & Test Commands
- Build: `npm run build`
- Run tests: `npm test`
- Run single test: `npm test -- -t "test name pattern"`
- Type check: `npm run typecheck`
- Lint: `npm run lint`

## Code Style
- Use TypeScript for all new code with explicit types
- Follow consistent formatting with 2 space indentation
- Export interfaces and types when they're used across files
- Use descriptive naming: functions in camelCase, interfaces with PascalCase
- Prefer array transformations (map, filter) over imperative loops
- Use explicit error handling with typed Error objects
- Include comprehensive test coverage for edge cases
- Validate inputs at function boundaries with descriptive error messages
- Keep functions short and focused on a single responsibility
- Use Jest's expect().toEqual() for testing data structures