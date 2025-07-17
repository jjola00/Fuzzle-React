import { renderHook, act } from "@testing-library/react-native";
import { useAsyncState } from "../useAsyncState";

describe("useAsyncState Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useAsyncState());

    expect(result.current.state).toEqual({
      data: null,
      loading: false,
      error: null,
    });
  });

  it("should handle successful async operation", async () => {
    const { result } = renderHook(() => useAsyncState<string>());

    const mockAsyncFunction = jest.fn().mockResolvedValue("success");

    await act(async () => {
      await result.current.execute(mockAsyncFunction);
    });

    expect(result.current.state).toEqual({
      data: "success",
      loading: false,
      error: null,
    });

    expect(mockAsyncFunction).toHaveBeenCalledTimes(1);
  });

  it("should handle failed async operation", async () => {
    const { result } = renderHook(() => useAsyncState<string>());

    const mockAsyncFunction = jest
      .fn()
      .mockRejectedValue(new Error("Test error"));

    await act(async () => {
      await result.current.execute(mockAsyncFunction);
    });

    expect(result.current.state).toEqual({
      data: null,
      loading: false,
      error: "Test error",
    });

    expect(mockAsyncFunction).toHaveBeenCalledTimes(1);
  });

  it("should set loading state during async operation", async () => {
    const { result } = renderHook(() => useAsyncState<string>());

    let resolvePromise: (value: string) => void;
    const delayedPromise = new Promise<string>((resolve) => {
      resolvePromise = resolve;
    });

    const mockAsyncFunction = jest.fn().mockReturnValue(delayedPromise);

    // Start the async operation without awaiting
    act(() => {
      result.current.execute(mockAsyncFunction);
    });

    // Check loading state immediately
    expect(result.current.state.loading).toBe(true);

    // Resolve the promise
    await act(async () => {
      resolvePromise!("success");
      await delayedPromise;
    });

    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.data).toBe("success");
  });

  it("should reset state", async () => {
    const { result } = renderHook(() => useAsyncState<string>());

    const mockAsyncFunction = jest.fn().mockResolvedValue("success");

    // Execute async operation
    await act(async () => {
      await result.current.execute(mockAsyncFunction);
    });

    expect(result.current.state.data).toBe("success");

    // Reset state
    act(() => {
      result.current.reset();
    });

    expect(result.current.state).toEqual({
      data: null,
      loading: false,
      error: null,
    });
  });

  it("should handle error with string message", async () => {
    const { result } = renderHook(() => useAsyncState<string>());

    const mockAsyncFunction = jest.fn().mockRejectedValue("String error");

    await act(async () => {
      await result.current.execute(mockAsyncFunction);
    });

    expect(result.current.state.error).toBe("An error occurred");
  });

  it("should handle error with unknown type", async () => {
    const { result } = renderHook(() => useAsyncState<string>());

    const mockAsyncFunction = jest.fn().mockRejectedValue(null);

    await act(async () => {
      await result.current.execute(mockAsyncFunction);
    });

    expect(result.current.state.error).toBe("An error occurred");
  });
});
