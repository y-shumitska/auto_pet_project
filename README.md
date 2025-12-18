## Auto Pet Project – Playwright Test Suite

This repository contains an automated test suite for a test management web application, built on top of **Playwright** and **TypeScript**.  
It covers three main layers:
- **Setup tests** – log in once and persist auth state.
- **API tests** – validate backend test-case APIs and JSON schemas.
- **UI tests** – end‑to‑end flows for projects, folders, and test cases.

The Playwright configuration is set up so that, when you run the full suite, projects execute **sequentially** in this order: **setup → api → ui**.

---

### Tech Stack

- **Runtime / Language**: Node.js, TypeScript
- **Test Runner**: `@playwright/test`
- **Schema validation**: `ajv`, `ajv-formats`
- **Data generation**: `@faker-js/faker`
- **Linting / Formatting**: ESLint, Prettier

---

### Project Structure (high‑level)

- `playwright.config.ts` – Playwright setup, projects and execution order.
- `api-test.config.ts` – API base URL for backend tests.
- `imports.ts` – Central re‑exports of Playwright objects and page objects for UI tests.
- `tests/`
  - `setup/`
    - `auth.setup.spec.ts` – logs in using `LOGIN` / `PASSWORD` and saves `auth.json`.
  - `api-tests/`
    - `api-smoke.spec.ts` – API smoke tests for test case CRUD (POST / PATCH / DELETE).
  - `ui-tests/`
    - `ui-smoke.spec.ts` – UI smoke flow: create project → create folder → create test case → update → delete test case → delete project.
- `src/pages/` – Page Object Model (POM) classes for UI tests (dashboard, login, project overview, test case pages, etc.).
- `request-objects/test-cases/` – JSON request payload templates for test‑case APIs.
- `response-schemas/test-cases/` – JSON schemas for validating API responses.
- `utils/`
  - `fixtures.ts` – custom Playwright `test` with `api` helper wired to the backend URL.
  - `custom-expect.ts` – extended `expect` with matchers like `shouldMatchSchema`.
  - `schema-validator.ts` – AJV‑based JSON schema validation helper.
  - `data-generator.ts` – helper for generating randomized test‑case payloads.
  - `logger.ts`, `request-handler.ts` – API logging and HTTP wrapper used by API tests.

---

### Playwright Projects & Execution Order

Playwright is configured with three projects in **`playwright.config.ts`**:

```15:65:playwright.config.ts
    projects: [
        {
            name: 'setup-tests',
            testDir: './tests/setup'
        },
        {
            name: 'api-tests',
            testDir: './tests/api-tests',
            dependencies: ['setup-tests']
        },
        {
            name: 'ui-tests',
            testDir: './tests/ui-tests',
            use: { ...devices['Desktop Chrome'] },
            dependencies: ['api-tests']
        }
```

- **`setup-tests`** runs first and generates `auth.json`.
- **`api-tests`** runs after setup and uses the API helper and schema validation.
- **`ui-tests`** runs last with the authenticated state and page objects.

Running `npx playwright test` (or `npm test`) will execute the projects in that order.

---

### Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <your-fork-or-origin-url>
   cd auto_pet_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**
   - The project uses a `.env` file, loaded by `playwright.config.ts`.
   - An example file is provided as `.env.example` – copy it and fill in values that can be given by the project creator:
     ```bash
     cp .env.example .env
     ```
   - At minimum, you need:
     - `LOGIN` – username or email for the test account.
     - `PASSWORD` – password for the test account.
   - These are used by `tests/setup/auth.setup.spec.ts` to log in and create `auth.json`.

---

### Running Tests

#### Run full chained suite (setup → api → ui)

```bash
npx playwright test
```

Or via npm:

```bash
npm test
```

This will:
1. Run **setup-tests** (`tests/setup/`) to log in and write `auth.json`.
2. Run **api-tests** (`tests/api-tests/`) against the configured API.
3. Run **ui-tests** (`tests/ui-tests/`) using the saved auth state.

#### Run only a specific project

- **Setup only**
  ```bash
  npx playwright test --project=setup-tests
  ```

- **API tests only**
  ```bash
  npx playwright test --project=api-tests
  ```

- **UI tests only**
  ```bash
  npx playwright test --project=ui-tests
  ```

#### Run a single spec file

- API smoke:
  ```bash
  npx playwright test tests/api-tests/api-smoke.spec.ts --project=api-tests
  ```

- UI smoke:
  ```bash
  npx playwright test tests/ui-tests/ui-smoke.spec.ts --project=ui-tests
  ```

---

### How the Tests Are Structured

#### Setup tests (`tests/setup/auth.setup.spec.ts`)

- Uses the `LoginPage` POM to authenticate with `LOGIN` / `PASSWORD`.
- Stores Playwright `storageState` into `auth.json`, which is then used by:
  - API tests via `test.use({ storageState: 'auth.json' })` (where applicable).
  - UI tests via the `use.storageState` config in `playwright.config.ts`.

#### API tests (`tests/api-tests/api-smoke.spec.ts`)

- Use the custom `test` fixture from `utils/fixtures.ts`, which injects:
  - `api` – a `RequestHandler` bound to `config.apiUrl`.
  - `config` – the `api-test.config.ts` object.
- Use JSON payload templates from `request-objects/test-cases/*.json`.
- Validate responses against schemas in `response-schemas/test-cases/*.json` via:
  - `expect(response).shouldMatchSchema('test-cases', 'POST_test_case')`, etc.
- Generate randomized test case payloads with `getNewRandomTestCase()` from `utils/data-generator.ts`.

#### UI tests (`tests/ui-tests/ui-smoke.spec.ts`)

- Rely on page objects from `src/pages/` imported through `imports.ts`.
- `ui-smoke.spec.ts` is a serial scenario that covers:
  1. Project creation.
  2. Folder creation.
  3. Test case creation.
  4. Test case update.
  5. Test case deletion.
  6. Project deletion.
- Uses `test.describe.configure({ mode: 'serial' })` so these UI smoke tests run one by one.

---

### Adding New Tests

- **New API scenario**
  - Add or update request JSON under `request-objects/`.
  - Add or update response schema under `response-schemas/`.
  - Add a new test in `tests/api-tests/` using the `api` fixture and `expect(...).shouldMatchSchema(...)`.

- **New UI scenario**
  - Add or extend a page object under `src/pages/`.
  - Export it from `imports.ts` for convenient usage.
  - Create a new `.spec.ts` file under `tests/ui-tests/` (or extend `ui-smoke.spec.ts` for broader flows).

---

### Troubleshooting

- **Login/setup keeps failing**
  - Check your `.env` values for `LOGIN` and `PASSWORD`.
  - Verify the target environment is reachable and compatible with the `apiUrl` and UI URLs.

- **Schema validation failures**
  - Inspect the error message; custom matcher `shouldMatchSchema` prints recent API logs.
  - Compare the actual response body with the corresponding schema under `response-schemas/`.

---

### Summary

This project is a Playwright‑based test harness that:
- Logs in once (setup), 
- Validates backend behavior and contracts (API), and
- Exercises key user flows end‑to‑end (UI),
all wired together through Playwright projects that run in a **setup → api → ui** chain.


