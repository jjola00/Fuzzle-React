// Database service for handling session data
// This would typically connect to Supabase or similar backend

export interface SessionData {
  id: string;
  user_id: string;
  duration_minutes: number;
  breaks_taken: number;
  hints_given: number;
  distractions: number;
  points_earned: number;
  ended_early: boolean;
  created_at: string;
}

export interface DatabaseError {
  message: string;
  code?: string;
}

/**
 * Mock database service for demonstration
 * Replace with actual Supabase client in production
 */
class DatabaseService {
  private mockSessions: SessionData[] = [
    {
      id: "1",
      user_id: "user-123",
      duration_minutes: 25,
      breaks_taken: 0,
      hints_given: 2,
      distractions: 1,
      points_earned: 50,
      ended_early: false,
      created_at: "2024-01-01T10:00:00Z",
    },
    {
      id: "2", 
      user_id: "user-123",
      duration_minutes: 60,
      breaks_taken: 0,
      hints_given: 1,
      distractions: 0,
      points_earned: 120,
      ended_early: false,
      created_at: "2024-01-02T14:00:00Z",
    },
    {
      id: "3",
      user_id: "user-123",
      duration_minutes: 10,
      breaks_taken: 0,
      hints_given: 0,
      distractions: 2,
      points_earned: 20,
      ended_early: false,
      created_at: "2024-01-03T09:00:00Z",
    },
    {
      id: "4",
      user_id: "user-123",
      duration_minutes: 45,
      breaks_taken: 0,
      hints_given: 3,
      distractions: 1,
      points_earned: 0,
      ended_early: true,
      created_at: "2024-01-04T16:00:00Z",
    },
    {
      id: "5",
      user_id: "user-123",
      duration_minutes: 30,
      breaks_taken: 0,
      hints_given: 1,
      distractions: 0,
      points_earned: 0,
      ended_early: true,
      created_at: "2024-01-05T11:00:00Z",
    },
  ];

  /**
   * Fetch all sessions for a user
   * @param userId - The user ID to fetch sessions for
   * @returns Promise<SessionData[]> - Array of session data
   */
  async getSessions(userId: string = "user-123"): Promise<SessionData[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter sessions by user ID and sort by created_at desc
    return this.mockSessions
      .filter(session => session.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  /**
   * Get a specific session by ID
   * @param sessionId - The session ID to fetch
   * @returns Promise<SessionData | null> - Session data or null if not found
   */
  async getSession(sessionId: string): Promise<SessionData | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return this.mockSessions.find(session => session.id === sessionId) || null;
  }

  /**
   * Create a new session
   * @param sessionData - Session data to create
   * @returns Promise<SessionData> - Created session data
   */
  async createSession(sessionData: Omit<SessionData, 'id' | 'created_at'>): Promise<SessionData> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newSession: SessionData = {
      ...sessionData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    
    this.mockSessions.push(newSession);
    return newSession;
  }

  /**
   * Update an existing session
   * @param sessionId - Session ID to update
   * @param updates - Partial session data to update
   * @returns Promise<SessionData | null> - Updated session data or null if not found
   */
  async updateSession(sessionId: string, updates: Partial<SessionData>): Promise<SessionData | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const sessionIndex = this.mockSessions.findIndex(session => session.id === sessionId);
    if (sessionIndex === -1) return null;
    
    this.mockSessions[sessionIndex] = {
      ...this.mockSessions[sessionIndex],
      ...updates,
    };
    
    return this.mockSessions[sessionIndex];
  }

  /**
   * Delete a session
   * @param sessionId - Session ID to delete
   * @returns Promise<boolean> - True if deleted, false if not found
   */
  async deleteSession(sessionId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const sessionIndex = this.mockSessions.findIndex(session => session.id === sessionId);
    if (sessionIndex === -1) return false;
    
    this.mockSessions.splice(sessionIndex, 1);
    return true;
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();

// Example of how to integrate with Supabase:
/*
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'your-supabase-url';
const supabaseKey = 'your-supabase-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseService = {
  async getSessions(userId: string): Promise<SessionData[]> {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },
  
  async createSession(sessionData: Omit<SessionData, 'id' | 'created_at'>): Promise<SessionData> {
    const { data, error } = await supabase
      .from('sessions')
      .insert([sessionData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // ... other methods
};
*/ 