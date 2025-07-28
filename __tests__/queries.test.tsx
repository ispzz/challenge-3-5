import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { useQuery } from "@apollo/client";
import { GET_ANIME_LIST } from "@/lib/queries";

function TestQueryComponent() {
  const { data, loading, error } = useQuery(GET_ANIME_LIST, {
    variables: { page: 1, perPage: 10 }
  });

  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">Error: {error.message}</div>;
  if (!data || data.Page === null) return <div data-testid="no-data">No data</div>;

  return (
    <div data-testid="anime-list">
      <div data-testid="total">{data.Page.pageInfo.total}</div>
      {data.Page.media.map((a: { id: number; title: { romaji: string } }) => (
        <div key={a.id} data-testid={`anime-${a.id}`}>
          {a.title.romaji}
        </div>
      ))}
    </div>
  );
}

const makeMedia = (id: number, romaji: string) => ({
  id,
  title: { romaji, english: "", native: "" },
  description: "",
  coverImage: { large: "", medium: "" },
  bannerImage: "",
  averageScore: 0,
  episodes: 0,
  status: "FINISHED",
  format: "TV",
  genres: [] as string[],
  season: null as null,
  seasonYear: null as null
});

const successMock: MockedResponse = {
  request: {
    query: GET_ANIME_LIST,
    variables: { page: 1, perPage: 10 }
  },
  result: {
    data: {
      Page: {
        // pageInfo
        pageInfo: {
          total: 2,
          currentPage: 1,
          lastPage: 1,
          hasNextPage: false,
          perPage: 10
        },
        // media list
        media: [makeMedia(1, "Naruto"), makeMedia(2, "Bleach")]
      }
    }
  }
};

const errorMock: MockedResponse = {
  request: {
    query: GET_ANIME_LIST,
    variables: { page: 1, perPage: 10 }
  },
  error: new Error("Network error")
};

const emptyMock: MockedResponse = {
  request: {
    query: GET_ANIME_LIST,
    variables: { page: 1, perPage: 10 }
  },
  result: {
    data: { Page: null }
  }
};

describe("GET_ANIME_LIST", () => {
  it("renders list on success", async () => {
    render(
      <MockedProvider mocks={[successMock]} addTypename={true}>
        <TestQueryComponent />
      </MockedProvider>
    );

    // loading first
    expect(screen.getByTestId("loading")).toBeInTheDocument();

    // then the list
    await waitFor(() => screen.getByTestId("anime-list"));
    expect(screen.getByTestId("total")).toHaveTextContent("2");
    expect(screen.getByTestId("anime-1")).toHaveTextContent("Naruto");
    expect(screen.getByTestId("anime-2")).toHaveTextContent("Bleach");
  });

  it("shows error state", async () => {
    render(
      <MockedProvider mocks={[errorMock]} addTypename={true}>
        <TestQueryComponent />
      </MockedProvider>
    );
    await waitFor(() => screen.getByTestId("error"));
    expect(screen.getByTestId("error")).toHaveTextContent("Network error");
  });

  it("handles no-data", async () => {
    render(
      <MockedProvider mocks={[emptyMock]} addTypename={true}>
        <TestQueryComponent />
      </MockedProvider>
    );
    await waitFor(() => screen.getByTestId("no-data"));
  });
});
