// Services exports for better organization and clean imports
// Following feature-based folder structure as mentioned in requirements

export { databaseService } from "./database";
export type { SessionData, DatabaseError } from "./database";

// TODO: Add more service exports as they are created
// Example structure:
// export { authService } from './auth';
// export { notificationService } from './notification';
// export { analyticsService } from './analytics'; 