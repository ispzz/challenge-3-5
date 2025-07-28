import { renderHook, act, waitFor } from "@testing-library/react";
import { useUser, UserProvider } from "@/contexts/user-context";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
const pushMock = jest.fn();
;(useRouter as jest.Mock).mockReturnValue({ push: pushMock });

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
  jest.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {});
});

describe("useUser", () => {
  it("loads existing user from localStorage", async () => {
    const stored = { username: "test", jobTitle: "dev" };
    ;(Storage.prototype.getItem as jest.Mock).mockReturnValue(JSON.stringify(stored));

    const { result } = renderHook(() => useUser(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.user).toEqual(stored);
    expect(localStorage.getItem).toHaveBeenCalledWith("user-info");
  });

  it("handles empty localStorage", async () => {
    ;(Storage.prototype.getItem as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useUser(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.user).toBeNull();
  });

  it("login sets user and persists", () => {
    const credentials = { username: "a", jobTitle: "b" };
    const { result } = renderHook(() => useUser(), { wrapper });

    act(() => {
      result.current.login(credentials);
    });

    expect(result.current.user).toEqual(credentials);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "user-info",
      JSON.stringify(credentials)
    );
  });

  it("updateUser updates and persists", () => {
    const initial = { username: "x", jobTitle: "y" };
    ;(Storage.prototype.getItem as jest.Mock).mockReturnValue(JSON.stringify(initial));
    const { result } = renderHook(() => useUser(), { wrapper });

    act(() => {
      result.current.updateUser({ username: "z", jobTitle: "w" });
    });

    expect(result.current.user).toEqual({ username: "z", jobTitle: "w" });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "user-info",
      JSON.stringify({ username: "z", jobTitle: "w" })
    );
  });

  it("logout clears user, storage and redirects", () => {
    const stored = { username: "u", jobTitle: "j" };
    ;(Storage.prototype.getItem as jest.Mock).mockReturnValue(JSON.stringify(stored));
    const { result } = renderHook(() => useUser(), { wrapper });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.removeItem).toHaveBeenCalledWith("user-info");
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});
