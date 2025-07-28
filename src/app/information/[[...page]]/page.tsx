"use client";

import { Container, Heading, SimpleGrid, Box, Image, Text, Stack, Button, Center, Spinner, Badge, HStack } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_ANIME_LIST } from "@/lib/queries";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { AnimeModal } from "@/components/anime-modal";
import { Anime } from "@/types/anime";

const ITEMS_PER_PAGE = 12;

export default function InformationPage() {
  const router = useRouter();
  const params = useParams<{ page?: string[] }>();

  const pageFromUrl = params.page && params.page[0] ? parseInt(params.page[0]) : 1;
  const [currentPage, setCurrentPage] = useState<number>(pageFromUrl);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  const { loading, error, data } = useQuery(GET_ANIME_LIST, {
    variables: { page: currentPage, perPage: ITEMS_PER_PAGE }
  });

  // Sync state with URL params on mount and when params change
  useEffect(() => {
    const newPage = params.page && params.page[0] ? parseInt(params.page[0]) : 1;
    if (!isNaN(newPage)) {
      setCurrentPage(newPage);
    }
  }, [params.page]);

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container maxW="container.lg" py={8}>
        <Text color="red.500">Error loading data: {error.message}</Text>
      </Container>
    );
  }

  const { media, pageInfo } = data.Page;

  return (
    <Container maxW="container.lg" py={8}>
      <Stack gap={6}>
        <Heading>Anime Collection</Heading>

        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={{ base: 2, md: 4, lg: 6 }}>
          {media.map((anime: Anime) => (
            <Box
              key={anime.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
              onClick={() => setSelectedAnime(anime)}
            >
              <Image src={anime.coverImage.large} alt={anime.title.romaji} h={{ base: "150px", md: "250px", lg: "300px" }} w="100%" objectFit="cover" />
              <Box p={{ base: 2, md: 3, lg: 4 }}>
                <Text fontWeight="bold" fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                  {anime.title.english || anime.title.romaji}
                </Text>
                <Text fontSize={{ base: "xs", md: "sm" }} color="fg.muted">
                  {anime.title.romaji}
                </Text>
                <Stack direction="row" mt={2} gap={1}>
                  {anime.averageScore && (
                    <Badge colorPalette="green" size={{ base: "sm", md: "md" }}>
                      Score: {anime.averageScore}%
                    </Badge>
                  )}
                  {anime.episodes && (
                    <Badge colorPalette="blue" size={{ base: "sm", md: "md" }}>
                      {anime.episodes} Eps
                    </Badge>
                  )}
                </Stack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        <Center>
          <HStack gap={4}>
            <Button
              onClick={() => {
                const prevPage = Math.max(1, currentPage - 1);
                if (prevPage === 1) {
                  router.push("/information");
                } else {
                  router.push(`/information/${prevPage}`);
                }
              }}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>

            <Text>
              Page {currentPage} of {pageInfo.lastPage}
            </Text>

            <Button
              onClick={() => {
                const nextPage = currentPage + 1;
                router.push(`/information/${nextPage}`);
              }}
              disabled={!pageInfo.hasNextPage}
              variant="outline"
            >
              Next
            </Button>
          </HStack>
        </Center>
      </Stack>

      {selectedAnime && <AnimeModal anime={selectedAnime} isOpen={!!selectedAnime} onClose={() => setSelectedAnime(null)} />}
    </Container>
  );
}
