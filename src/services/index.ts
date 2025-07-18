// Services exports for better organization and clean imports
// Following feature-based folder structure as mentioned in requirements

export { databaseService } from "./database";
export type { SessionData, DatabaseError } from "./database";
export { supabase } from "./supabase";
export type { User, Session, Points, Reward, Settings } from "./supabase";

// TODO: Add more service exports as they are created
// Example structure:
// export { authService } from './auth';
// export { notificationService } from './notification';
// export { analyticsService } from './analytics';
