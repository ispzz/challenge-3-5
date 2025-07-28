"use client";

import { Anime } from "@/types/anime";
import { Image, Text, Stack, Badge, HStack, Box, Dialog, IconButton } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";

interface AnimeModalProps {
  anime: Anime
  isOpen: boolean;
  onClose: () => void;
}

export function AnimeModal({ anime, isOpen, onClose }: AnimeModalProps) {
  return (
    <Dialog.Root placement="center" open={isOpen} onOpenChange={(details) => !details.open && onClose()} size="lg">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        {/* we need specify min height here or the dialog height takes full width on larger screens when setting "base: 'full'" */}
        <Dialog.Content maxH="100vh" minH={{ base: "100vh", md: "50vh" }} overflow="auto" borderRadius={{ base: "0", md: "lg" }} p={4}>
          <Dialog.CloseTrigger asChild>
              <IconButton aria-label="Close" variant="solid" size="sm">
                <LuX />
              </IconButton>
          </Dialog.CloseTrigger>

          {anime.bannerImage && <Image src={anime.bannerImage} alt={anime.title.romaji} h="200px" w="100%" objectFit="cover" borderTopRadius={{ base: "0", md: "lg" }} />}

          <Dialog.Header>
            <Stack gap={2}>
              <Dialog.Title fontSize="2xl">{anime.title.english || anime.title.romaji}</Dialog.Title>
              <Text fontSize="md" color="fg.muted" fontWeight="normal">
                {anime.title.romaji} • {anime.title.native}
              </Text>
            </Stack>
          </Dialog.Header>

          <Dialog.Body pb={6}>
            <Stack gap={4}>
              <HStack wrap="wrap" gap={2}>
                {anime.averageScore && <Badge colorPalette="green">Score: {anime.averageScore}%</Badge>}
                {anime.episodes && <Badge colorPalette="blue">{anime.episodes} Episodes</Badge>}
                <Badge colorPalette="purple">{anime.format}</Badge>
                <Badge colorPalette="orange">{anime.status}</Badge>
                {anime.season && anime.seasonYear && (
                  <Badge>
                    {anime.season} {anime.seasonYear}
                  </Badge>
                )}
              </HStack>

              {anime.genres && anime.genres.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Genres
                  </Text>
                  <HStack wrap="wrap" gap={2}>
                    {anime.genres.map((genre) => (
                      <Badge key={genre} variant="subtle">
                        {genre}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              )}

              {anime.description && (
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Description
                  </Text>
                  <Text
                    dangerouslySetInnerHTML={{
                      __html: anime.description.replace(/<br\s*\/?>/gi, " ")
                    }}
                    color="fg.muted"
                  />
                </Box>
              )}
            </Stack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
