import { render, screen, waitFor } from "@testing-library/react";
import { useRouter, usePathname } from "next/navigation";
import { AuthWrapper } from "@/components/auth-wrapper";
import { UserProvider } from "@/contexts/user-context";
import { ReactNode } from "react";

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

// Mock Chakra UI components
jest.mock("@chakra-ui/react", () => ({
  Center: ({ children }: { children: ReactNode }) => <div data-testid="center">{children}</div>,
  Spinner: () => <div data-testid="spinner">Loading...</div>
}));

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockRouter = {
  push: mockPush,
  replace: mockReplace,
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn()
};

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage
});

function TestPage() {
  return <div data-testid="protected-content">Protected Content</div>;
}

function renderWithAuthWrapper(pathname: string = "/", hasUser: boolean = false) {
  mockUseRouter.mockReturnValue(mockRouter);
  mockUsePathname.mockReturnValue(pathname);

  if (hasUser) {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ username: "testuser", jobTitle: "developer" }));
  } else {
    mockLocalStorage.getItem.mockReturnValue(null);
  }

  return render(
    <UserProvider>
      <AuthWrapper>
        <TestPage />
      </AuthWrapper>
    </UserProvider>
  );
}

describe("AuthWrapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.location.href = "";
  });

  it("should redirect unauthenticated user to login page", async () => {
    renderWithAuthWrapper("/", false);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/login");
    });
  });

  it("should redirect authenticated user from login page to home", async () => {
    renderWithAuthWrapper("/login", true);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });

  it("should render protected content for authenticated user on protected route", async () => {
    renderWithAuthWrapper("/", true);

    await waitFor(() => {
      expect(screen.getByTestId("protected-content")).toBeInTheDocument();
    });

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("should render login page for unauthenticated user on login route", async () => {
    renderWithAuthWrapper("/login", false);

    await waitFor(() => {
      expect(screen.getByTestId("protected-content")).toBeInTheDocument();
    });

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("should not render protected content for unauthenticated user", async () => {
    renderWithAuthWrapper("/profile", false);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/login");
    });

    // Should not render protected content while redirecting
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
  });

  it("should handle different protected routes correctly", async () => {
    renderWithAuthWrapper("/profile", false);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/login");
    });

    jest.clearAllMocks();

    renderWithAuthWrapper("/information", false);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/login");
    });
  });
});
