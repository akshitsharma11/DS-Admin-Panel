# DS-Admin-Panel Architecture Documentation

## 📁 Project Structure

This project follows a **feature-based + pages architecture** for scalability and maintainability.

```
src/
├── app/                    # Application core
│   ├── App.jsx            # Root component (providers + routes)
│   ├── main.jsx           # Entry point
│   ├── routes.jsx         # All application routes
│   ├── config/
│   │   └── env.js         # Environment configuration
│   └── providers/
│       └── AppProviders.jsx  # React context providers (Router, etc.)
│
├── pages/                 # Page components (thin, no heavy logic)
│   ├── EmployeeTimesheetPage.jsx
│   ├── ManageUsersPage.jsx
│   ├── ManageJobsPage.jsx
│   └── index.js           # Barrel export
│
├── features/              # Feature modules (business logic)
│   └── timesheet/
│       ├── components/    # Feature-specific components
│       │   └── TimesheetTable.jsx
│       ├── hooks/         # Feature-specific hooks
│       │   └── useTimesheet.js
│       ├── api/           # Feature API calls
│       │   └── timesheet.api.js
│       └── index.js       # Barrel export
│
├── components/            # Shared components
│   ├── ui/                # Reusable UI components
│   │   ├── Dropdown.jsx
│   │   ├── Table.jsx
│   │   └── index.js
│   ├── layout/            # Layout components
│   │   ├── Sidebar.jsx
│   │   ├── MainLayout.jsx
│   │   └── index.js
│   └── index.js           # Barrel export
│
├── services/              # Shared services
│   └── http/
│       ├── httpClient.js  # Axios instance
│       ├── interceptors.js
│       └── index.js
│
├── hooks/                 # Shared hooks (reusable across features)
│   └── index.js
│
├── utils/                 # Utility functions
│   └── index.js
│
└── styles/                # Global and page-specific styles
    ├── globals.css
    └── pages/
        └── EmployeeTimesheetPage.css
```

## 🏗️ Architecture Rules

### 1. Pages (`src/pages/`)
- **Purpose**: Thin components that compose features and layout
- **Rules**:
  - No heavy business logic
  - No direct API calls
  - Only compose features, layout, and UI components
  - Use feature hooks for data and state management

**Example:**
```jsx
// ✅ Good - Page is thin, uses feature hook
import { useTimesheet, TimesheetTable } from '../features/timesheet';

export function EmployeeTimesheetPage() {
  const { timesheetData, filters } = useTimesheet();
  return <TimesheetTable data={timesheetData} />;
}
```

### 2. Features (`src/features/<feature-name>/`)
- **Purpose**: Self-contained feature modules with all related code
- **Structure**:
  ```
  features/
    timesheet/
      components/     # Feature-specific components
      hooks/          # Feature-specific hooks
      api/            # API calls for this feature
      index.js        # Barrel export
  ```
- **Rules**:
  - All API calls go in `features/<feature>/api/*.api.js`
  - Feature-specific hooks in `features/<feature>/hooks/`
  - Feature-specific components in `features/<feature>/components/`
  - Use shared `httpClient` from `services/http/`

**Example:**
```jsx
// features/timesheet/api/timesheet.api.js
import { httpClient } from '../../../services/http';

export const timesheetApi = {
  getTimesheet: async (employeeId, month, year) => {
    const response = await httpClient.get('/timesheets', {
      params: { employeeId, month, year },
    });
    return response.data;
  },
};
```

### 3. Components
- **UI Components** (`components/ui/`): Reusable, generic UI components
  - Examples: Button, Dropdown, Table, Input, Modal
  - Should be framework-agnostic where possible
- **Layout Components** (`components/layout/`): Layout structure
  - Examples: Sidebar, Header, Footer, MainLayout

### 4. Services (`src/services/`)
- **HTTP Layer** (`services/http/`):
  - `httpClient.js`: Configured Axios instance
  - `interceptors.js`: Request/response interceptors
  - All API calls must use `httpClient`, never raw axios/fetch

### 5. Hooks
- **Shared Hooks** (`hooks/`): Reusable across multiple features
  - Examples: `useLocalStorage`, `useDebounce`, `useAuth`
- **Feature Hooks** (`features/<feature>/hooks/`): Feature-specific logic
  - Examples: `useTimesheet`, `useUserManagement`

### 6. Naming Conventions
- **Components**: `PascalCase.jsx` (e.g., `TimesheetTable.jsx`)
- **Hooks**: `useSomething.js` (e.g., `useTimesheet.js`)
- **API Files**: `something.api.js` (e.g., `timesheet.api.js`)
- **Utils**: `camelCase.js` (e.g., `formatDate.js`)

### 7. Barrel Exports
- Every folder should have an `index.js` for clean imports
- **Example:**
  ```js
  // features/timesheet/index.js
  export { TimesheetTable } from './components/TimesheetTable.jsx';
  export { useTimesheet } from './hooks/useTimesheet.js';
  export { timesheetApi } from './api/timesheet.api.js';
  ```

## 🛣️ Routing

- All routes defined in `src/app/routes.jsx`
- Uses `react-router-dom` v6
- Layout components use `<Outlet />` for nested routes
- Default route redirects to `/timesheets`

**Example:**
```jsx
<Routes>
  <Route path="/" element={<MainLayout />}>
    <Route index element={<Navigate to="/timesheets" replace />} />
    <Route path="timesheets" element={<EmployeeTimesheetPage />} />
    <Route path="users" element={<ManageUsersPage />} />
  </Route>
</Routes>
```

## 🎨 Styling

- **Global styles**: `styles/globals.css` (imported once in `main.jsx`)
- **Page styles**: `styles/pages/<PageName>.css`
- **Component styles**: Co-located with components (e.g., `Sidebar.css` next to `Sidebar.jsx`)
- **Responsive**: Mobile-first approach with media queries

## 📦 Dependencies

- **React 19.2.0**: UI library
- **React Router DOM 6.28.0**: Routing
- **Axios 1.7.9**: HTTP client
- **Vite 7.2.4**: Build tool

## 🔄 Data Flow

1. **Page** renders and uses **Feature Hook**
2. **Feature Hook** calls **Feature API**
3. **Feature API** uses **HTTP Client** (`services/http/httpClient.js`)
4. **HTTP Client** has interceptors for auth, errors, etc.
5. Data flows back: API → Hook → Page → Components

## ✅ Adding New Features

1. Create feature folder: `features/<feature-name>/`
2. Add structure:
   - `components/` - Feature components
   - `hooks/` - Feature hooks
   - `api/` - API calls
   - `index.js` - Exports
3. Create page in `pages/`
4. Add route in `app/routes.jsx`
5. Use shared components from `components/ui/` and `components/layout/`

## 🚫 Anti-Patterns (Don't Do This)

❌ **API calls in components:**
```jsx
// ❌ Bad
function MyComponent() {
  useEffect(() => {
    fetch('/api/data').then(...); // Don't do this!
  }, []);
}
```

✅ **Use feature API:**
```jsx
// ✅ Good
function MyComponent() {
  const { data } = useMyFeature();
  // Hook uses feature API internally
}
```

❌ **Heavy logic in pages:**
```jsx
// ❌ Bad
function MyPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Complex data processing...
  }, []);
}
```

✅ **Move to feature hook:**
```jsx
// ✅ Good
function MyPage() {
  const { processedData } = useMyFeature(); // Logic in hook
}
```

## 📝 Notes

- This architecture scales well as features grow
- Each feature is self-contained and testable
- Shared code is easily reusable
- Clear separation of concerns
- Easy to onboard new developers

---

**Last Updated**: 2025-01-XX
**Maintained By**: Development Team

