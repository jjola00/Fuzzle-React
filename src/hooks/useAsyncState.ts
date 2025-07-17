import { useState, useCallback } from "react";

/**
 * State interface for async operations
 * Provides loading, success, and error states
 */
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Return type for the useAsyncState hook
 * Provides state and actions for async operations
 */
interface UseAsyncStateReturn<T> {
  state: AsyncState<T>;
  execute: (asyncFunction: () => Promise<T>) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for managing async operations state
 * Uses generics for type safety and reusability
 * Follows the pattern of keeping state minimal and deriving the rest
 */
export const useAsyncState = <T>(): UseAsyncStateReturn<T> => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  /**
   * Executes an async function and manages loading/error states
   * Uses useCallback to prevent unnecessary re-renders
   */
  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
    }));

    try {
      const result = await asyncFunction();
      setState({
        data: result,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  }, []);

  /**
   * Resets the async state to initial values
   * Useful for clearing previous results
   */
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    state,
    execute,
    reset,
  };
};
