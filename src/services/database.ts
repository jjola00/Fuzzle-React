// Database service for handling session data
// Connected to Supabase backend

import { supabase, Session } from "./supabase";

// Re-export the Session type as SessionData for compatibility
export type SessionData = Session;

export interface DatabaseError {
  message: string;
  code?: string;
}

/**
 * Database service using Supabase
 * Handles all database operations for sessions
 */
class DatabaseService {
  /**
   * Fetch sessions with pagination support
   * @param userId - The user ID to fetch sessions for (optional)
   * @param offset - Number of records to skip (for pagination)
   * @param limit - Maximum number of records to return
   * @returns Promise<SessionData[]> - Array of session data
   */
  async getSessions(
    userId?: string,
    offset: number = 0,
    limit: number = 5,
  ): Promise<SessionData[]> {
    try {
      const query = supabase
        .from("sessions")
        .select("*")
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (userId) {
        query.eq("user_id", userId);
      }

      const { data, error } = await query;
      if (error) {
        throw new Error(`Failed to fetch sessions: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching sessions:", error);
      throw error;
    }
  }

  /**
   * Get a specific session by ID
   * @param sessionId - The session ID to fetch
   * @returns Promise<SessionData | null> - Session data or null if not found
   */
  async getSession(sessionId: string): Promise<SessionData | null> {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .eq("id", sessionId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No rows returned
          return null;
        }
        throw new Error(`Failed to fetch session: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error("Error fetching session:", error);
      throw error;
    }
  }

  /**
   * Create a new session
   * @param sessionData - Session data to create
   * @returns Promise<SessionData> - Created session data
   */
  async createSession(
    sessionData: Omit<SessionData, "id" | "created_at">,
  ): Promise<SessionData> {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .insert([sessionData])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create session: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    }
  }

  /**
   * Update an existing session
   * @param sessionId - Session ID to update
   * @param updates - Partial session data to update
   * @returns Promise<SessionData | null> - Updated session data or null if not found
   */
  async updateSession(
    sessionId: string,
    updates: Partial<SessionData>,
  ): Promise<SessionData | null> {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .update(updates)
        .eq("id", sessionId)
        .select()
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No rows returned
          return null;
        }
        throw new Error(`Failed to update session: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error("Error updating session:", error);
      throw error;
    }
  }

  /**
   * Delete a session
   * @param sessionId - Session ID to delete
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async deleteSession(sessionId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .delete()
        .eq("id", sessionId)
        .select();

      if (error) {
        throw new Error(`Failed to delete session: ${error.message}`);
      }

      // Check if any rows were deleted
      return data && data.length > 0;
    } catch (error) {
      console.error("Error deleting session:", error);
      return false;
    }
  }

  /**
   * Get sessions for a specific user
   * @param userId - The user ID to fetch sessions for
   * @returns Promise<SessionData[]> - Array of session data for the user
   */
  async getSessionsByUser(userId: string): Promise<SessionData[]> {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch user sessions: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching user sessions:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
