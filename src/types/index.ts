// Common types for the Fuzzle React Native app
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    error: string;
    success: string;
    warning: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}

export interface NavigationRoute {
  name: string;
  params?: Record<string, unknown>;
}

export interface AppState {
  isLoading: boolean;
  user: User | null;
  theme: Theme;
}

// Utility types using TypeScript utilities as mentioned in requirements
export type OptionalUser = Partial<User>;
export type UserKeys = keyof User;
export type RequiredUserFields = Pick<User, 'id' | 'name' | 'email'>;
export type UserWithoutId = Omit<User, 'id'>;

// Discriminated union for different app states
export type AppStatus =
  | { type: 'loading' }
  | { type: 'authenticated'; user: User }
  | { type: 'unauthenticated' }
  | { type: 'error'; message: string };
