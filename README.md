# GitHub Repository Explorer (Catch Design Test)

This project is a fast, accessible, and robust web application for listing the repositories of the official **GitHub** organization using its public API.

---

## ✅ Prerequisites

- **Node.js**  `20.x` 
- **pnpm** as the package manager. If you don't have it installed:
  ```bash
  npm install -g pnpm
  ```

---

## ⚡ Installation & Run Guide

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Start the development server:
   ```bash
   pnpm dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
pnpm build   # Compile the optimized production bundle
pnpm start   # Serve the production build
```

---

## 🧹 Code Quality (Linting & Formatting)

The project ships with a preconfigured linting and formatting setup to keep the
codebase consistent:

| Command             | Description                                                        |
| ------------------- | ----------------------------------------------------------------- |
| `pnpm lint`         | Runs ESLint over the project.                                     |
| `pnpm format`       | Formats every file in place with Prettier.                        |
| `pnpm format:check` | Verifies formatting without writing changes (useful in CI).       |

- **ESLint** (`eslint.config.mjs`): flat config extending `eslint-config-next`
  (Core Web Vitals + TypeScript rules). The Prettier integration
  (`eslint-config-prettier`) is applied last to turn off any stylistic rules
  that would conflict with the formatter.
- **Prettier** (`.prettierrc.json`): enforces semicolons, double quotes, a
  `printWidth` of 80, and a `tabWidth` of 4. The `.prettierignore` file excludes
  build output, dependencies, and lockfiles.

---

## 🛠️ Tech Stack

The tech stack was selected to prioritize performance, maintainability, and
simplicity, reducing dependencies to the minimum necessary:

1. **Next.js (App Router) & React**:
   - Makes it possible to structure the main page as a **Server Component**. By
     calling the GitHub API directly on the server, we eliminate the need for
     complex client-side state logic (`useState`, `useEffect`), speed up load
     time (LCP), and guarantee immediate SEO indexing.
2. **TypeScript**:
   - Defines strict domain models and prevents development-time errors when
     mapping the dynamic GitHub API response onto our business domain.
3. **CSS Modules (Vanilla CSS)**:
   - Lets us safely encapsulate styles at the component level through the
     automatic generation of unique class names. By using native CSS, we
     guarantee a lightweight, responsive design with good performance, without
     the weight or complex configuration of external libraries.
4. **Native Fetch (no external libraries)**:
   - We leverage the native JavaScript API together with Next.js's
     revalidation/caching system, avoiding bloating the application size with
     external HTTP clients such as Axios.

---

## 📐 Clean Architecture with Pragmatism

To avoid overengineering in a project of this scale, we apply a **pragmatic,
simplified** version of Clean Architecture. The guiding principle is the
**unidirectional, inward flow of dependencies**:

```
[Presentation (UI)] ──> [Application (Use Cases)] ──> [Domain (Entities/Rules)]
                              │
                              └──> [Infrastructure (API/Mappers)]
```

- The **Domain** defines the central `Repository` entity and the business
  constants. It has no external dependencies and knows nothing about React or
  GitHub.
- The **Application** implements the app-specific use cases (`getRepositories`).
  It is the central control point.
- The **Infrastructure** contains the GitHub network client (`github-client`),
  the response mapper (`repository-mapper`), and the `Link` header parser
  (`link-header`).
- The **Presentation** manages the graphical interface through pure, "dumb"
  React components (reactive UI) that render the received domain.

---

## ⚙️ Pagination & the 60-Repository Limit

The base endpoint used is:
`https://api.github.com/orgs/github/repos?sort=full_name&per_page=10&page=N`

Rules:

- **Maximum Capacity (60 Repositories):** Strictly defined in the domain via
  `MAX_PAGES = 6` and `PER_PAGE = 10`. The user can view at most 60 repositories
  distributed across **6 pages/tabs**.
- **Input Clamping (Safety):** Validation runs inside the `getRepositories` use
  case. If a user manually types an invalid page into the URL
  (e.g. `?page=99` or `?page=-5`), the system automatically restricts the value
  to the `[1, 6]` range before hitting the network. This **saves GitHub API
  Rate Limit** quota.
- **Simple Navigation Control:** The `Pagination` component declaratively
  receives `currentPage` and the `hasNextPage` boolean computed by the use case
  (`safePage < MAX_PAGES && link.hasNext`). When page 6 is reached or the API
  reports no more data, the "Next" control is disabled both visually and
  technically through accessible attributes (`aria-disabled="true"`).

---

## 🧯 Error Handling

The application is resilient to failures (network errors or GitHub API rate
limits). The App Router error boundary (`src/app/error.tsx`) catches any error
thrown during rendering and displays the `ErrorState` component, offering the
user a retry action without a full page reload.
