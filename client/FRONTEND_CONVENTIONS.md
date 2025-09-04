# Frontend Development Rules & Guidelines

## 🏗️ Project Structure

### Directory Organization

```
client/src/
├── app/                    # Main app component & routing
├── components/            # Reusable UI components
│   ├── common/           # Generic components (Button, Input, Modal, etc.)
│   ├── layout/           # Layout components (Header, Sidebar, Footer)
│   └── ui/               # Domain-specific UI components
├── features/              # Feature-based modules
│   ├── tickets/          # Ticket-related features
│   │   ├── components/   # Ticket-specific components
│   │   ├── hooks/        # Custom hooks for tickets
│   │   ├── services/     # API calls for tickets
│   │   └── types/        # Ticket-specific types
│   └── users/            # User-related features
├── hooks/                 # Global custom hooks
├── services/              # Global API services
├── utils/                 # Utility functions
├── constants/             # App constants
├── types/                 # Global TypeScript types
└── styles/                # Global styles & theme
```

## 📝 Naming Conventions

### Files & Folders

-   **Components**: PascalCase (`TicketCard.tsx`, `UserProfile.tsx`)
-   **Hooks**: camelCase with `use` prefix (`useTickets.ts`, `useAuth.ts`)
-   **Services**: camelCase (`ticketService.ts`, `userService.ts`)
-   **Types**: PascalCase (`TicketTypes.ts`, `ApiResponse.ts`)
-   **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`, `APP_CONSTANTS.ts`)

### Components

-   **Component names**: PascalCase (`TicketList`, `UserCard`)
-   **Props interface**: Component name + Props (`TicketListProps`, `UserCardProps`)
-   **Export**: Named export for components, default export for pages

## 🧩 Component Architecture

### Component Structure Template

```typescript
// features/tickets/components/TicketCard.tsx
import React from "react";
import { Ticket } from "@acme/shared-models";

export interface TicketCardProps {
    ticket: Ticket;
    onEdit?: (ticket: Ticket) => void;
    onDelete?: (id: number) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({
    ticket,
    onEdit,
    onDelete,
}) => {
    // Component logic here

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* JSX content */}
        </div>
    );
};
```

### Component Rules

1. **Single Responsibility**: Each component should do one thing well
2. **Props Interface**: Always define props interface above component
3. **Default Props**: Use destructuring with default values
4. **Event Handlers**: Prefix with `on` (onClick, onEdit, onDelete)
5. **Children**: Use React.ReactNode for flexible content

## 🎣 Custom Hooks

### Hook Structure

```typescript
// features/tickets/hooks/useTickets.ts
import { useState, useEffect } from "react";
import { Ticket } from "@acme/shared-models";
import { ticketService } from "../services/ticketService";

export const useTickets = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const data = await ticketService.getTickets();
            setTickets(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    return { tickets, loading, error, fetchTickets };
};
```

### Hook Rules

1. **Naming**: Always start with `use`
2. **Return Object**: Return an object with state and functions
3. **Error Handling**: Always include error state
4. **Loading States**: Include loading state for async operations
5. **Cleanup**: Use cleanup functions in useEffect when needed

## 🌐 API Services

### Service Structure

```typescript
// services/api.ts
class ApiService {
    private baseUrl = "/api";

    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}

export const apiService = new ApiService();
```

### Service Rules

1. **Base URL**: Use environment variables for API endpoints
2. **Error Handling**: Always throw errors for non-2xx responses
3. **Type Safety**: Use generics for response types
4. **Headers**: Set appropriate content-type headers
5. **Interceptors**: Add request/response interceptors for auth tokens

## 🎨 Styling Guidelines

### Tailwind CSS

-   **Utility-first**: Use Tailwind utility classes for styling
-   **Component classes**: Create reusable component classes using `@apply` directive when needed
-   **Custom CSS**: Use `@layer` directive for custom styles in global CSS file
-   **Responsive variants**: Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)

### Responsive Design

-   **Mobile-first**: Start with mobile styles, then enhance for larger screens using Tailwind breakpoints
-   **Breakpoints**: Use Tailwind's consistent breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
-   **Flexbox/Grid**: Use Tailwind's flexbox and grid utilities for layouts

## 🔒 State Management

### Local State

-   **useState**: For component-specific state
-   **useReducer**: For complex state logic
-   **useContext**: For theme, auth, or global settings

## 📱 Performance Guidelines

### Code Splitting

```typescript
// app/app.tsx
import { lazy, Suspense } from "react";

const TicketDetails = lazy(
    () => import("./features/tickets/components/TicketDetails")
);

// Wrap in Suspense
<Suspense fallback={<div>Loading...</div>}>
    <TicketDetails />
</Suspense>;
```

### Optimization Rules

1. **React.memo**: For expensive components
2. **useMemo**: For expensive calculations
3. **useCallback**: For function references in dependencies
4. **Lazy Loading**: For route-based code splitting
5. **Image Optimization**: Use lazy loading and proper formats

## 🧪 Testing Standards

### Test File Structure

```
components/
├── TicketCard.tsx
└── __tests__/
    └── TicketCard.test.tsx
```

### Testing Rules

1. **Test Coverage**: Aim for 80%+ coverage
2. **Component Testing**: Test props, user interactions, and state changes
3. **Hook Testing**: Test custom hooks with `@testing-library/react-hooks`
4. **Mock Services**: Mock API calls in tests

## 📚 Best Practices

### General Rules

1. **Immutability**: Never mutate state directly
2. **Pure Functions**: Keep components and functions pure when possible
3. **Error Boundaries**: Implement error boundaries for route-level error handling
4. **Accessibility**: Use semantic HTML and ARIA labels
5. **SEO**: Implement proper meta tags and structured data

### Code Quality

1. **ESLint**: Follow project ESLint rules
2. **Prettier**: Use consistent code formatting
3. **TypeScript**: Strict mode enabled, no `any` types
4. **Comments**: Comment complex logic, not obvious code
5. **DRY**: Don't repeat yourself, extract common logic

## 🔧 Development Tools

### Required Extensions

-   ESLint
-   Prettier
-   TypeScript
-   Tailwind CSS IntelliSense
-   React Developer Tools

### Scripts

```json
{
    "scripts": {
        "dev": "nx serve client",
        "build": "nx build client",
        "test": "nx test client",
        "lint": "nx lint client",
        "type-check": "tsc --noEmit"
    }
}
```

## 📖 Documentation

### Component Documentation

-   **Purpose**: What does the component do?
-   **Props**: Document all props with types and descriptions
-   **Usage**: Provide usage examples
-   **Dependencies**: List any external dependencies

### API Documentation

-   **Endpoints**: Document all API endpoints
-   **Request/Response**: Show expected data structures
-   **Error Codes**: List possible error responses
-   **Authentication**: Document auth requirements

---

**Remember**: These rules are guidelines to maintain consistency and quality. Adapt them based on your team's preferences and project requirements.
