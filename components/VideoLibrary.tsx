'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  Icon,
  Badge,
} from '@chakra-ui/react';

// Define proper type for ReactPlayer
type ReactPlayerProps = {
  url: string;
  width?: string | number;
  height?: string | number;
  controls?: boolean;
  playing?: boolean;
};

const ReactPlayer = dynamic(
  () => import('react-player').then(mod => mod.default),
  { ssr: false }
) as React.ComponentType<ReactPlayerProps>;

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  thumbnail: string;
  url: string;
}

export default function VideoLibrary() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const videos: Video[] = [
    {
      id: '1',
      title: 'Morning Light Exposure Protocol',
      description: 'Learn the optimal way to get morning sunlight for circadian rhythm',
      duration: '8:32',
      category: 'circadian',
      thumbnail: 'https://placehold.co/400x225/235B4E/EFC2B3?text=Morning+Light',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Replace with actual video
    },
    {
      id: '2',
      title: 'Contrast Shower Technique',
      description: 'Step-by-step guide to hot/cold therapy at home',
      duration: '12:15',
      category: 'contrast',
      thumbnail: 'https://placehold.co/400x225/235B4E/EFC2B3?text=Cold+Shower',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: '3',
      title: 'Box Breathing for Beginners',
      description: 'Master the 4-4-4-4 breathing pattern for stress reduction',
      duration: '6:45',
      category: 'breathwork',
      thumbnail: 'https://placehold.co/400x225/235B4E/EFC2B3?text=Breathwork',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: '4',
      title: 'Setting Up Your Sleep Sanctuary',
      description: 'Optimize your bedroom for deep, restorative sleep',
      duration: '15:20',
      category: 'environment',
      thumbnail: 'https://placehold.co/400x225/235B4E/EFC2B3?text=Sleep+Setup',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: '5',
      title: 'Supplement Timing & Stacking',
      description: 'When and how to take your longevity supplements',
      duration: '18:40',
      category: 'supplements',
      thumbnail: 'https://placehold.co/400x225/235B4E/EFC2B3?text=Supplements',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: '6',
      title: 'Advanced Cold Exposure',
      description: 'Ice baths and advanced techniques for experienced practitioners',
      duration: '22:10',
      category: 'advanced',
      thumbnail: 'https://placehold.co/400x225/235B4E/EFC2B3?text=Ice+Bath',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
  ];

  const categories = ['all', 'circadian', 'contrast', 'breathwork', 'environment', 'supplements', 'advanced'];

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  return (
    <>
      {/* Video Player Modal */}
      {selectedVideo && (
        <Box
          position="fixed"
          inset={0}
          zIndex={50}
          bg="primary.900"
          opacity={0.95}
          backdropFilter="blur(10px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <Box maxW="5xl" w="full">
            <Box
              bg="primary.600"
              opacity={0.5}
              borderWidth="1px"
              borderColor="primary.400"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="2xl"
            >
              {/* Close Button */}
              <Button
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video player"
                position="absolute"
                top={4}
                right={4}
                zIndex={10}
                w={{ base: 11, sm: 12 }}
                h={{ base: 11, sm: 12 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="primary.700"
                opacity={0.8}
                backdropFilter="blur(4px)"
                borderRadius="full"
                color="whiteAlpha.700"
                _hover={{ color: 'white' }}
                transition="colors 0.3s"
                _focus={{ ring: 2, ringColor: 'accent.400' }}
              >
                <Icon viewBox="0 0 24 24" w={{ base: 6, sm: 7 }} h={{ base: 6, sm: 7 }} fill="none" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </Icon>
              </Button>

              {/* Video Player */}
              <Box aspectRatio={16 / 9} bg="black">
                <ReactPlayer
                  url={selectedVideo.url}
                  width="100%"
                  height="100%"
                  controls
                  playing
                />
              </Box>

              {/* Video Info */}
              <Box p={{ base: 5, sm: 6, lg: 8 }}>
                <Heading
                  as="h3"
                  size={{ base: 'lg', sm: 'xl', lg: '2xl' }}
                  color="white"
                  mb={{ base: 2, sm: 3 }}
                >
                  {selectedVideo.title}
                </Heading>
                <Text color="whiteAlpha.700" fontSize={{ base: 'sm', sm: 'base' }} mb={4}>
                  {selectedVideo.description}
                </Text>
                <Flex
                  align="center"
                  gap={{ base: 3, sm: 4 }}
                  fontSize={{ base: 'sm', sm: 'base' }}
                  color="whiteAlpha.500"
                  flexWrap="wrap"
                >
                  <Text>Duration: {selectedVideo.duration}</Text>
                  <Text>•</Text>
                  <Text textTransform="capitalize">{selectedVideo.category}</Text>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <Flex direction="column" gap={{ base: 6, sm: 8 }}>
        {/* Category Filter */}
        <Flex
          gap={2}
          overflowX="auto"
          pb={2}
          mx={{ base: -4, sm: 0 }}
          px={{ base: 4, sm: 0 }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-label={`Filter by ${category}`}
              aria-current={activeCategory === category ? 'true' : undefined}
              px={{ base: 4, sm: 5 }}
              py={{ base: 2, sm: 2.5 }}
              borderRadius="full"
              fontSize={{ base: 'sm', sm: 'base' }}
              whiteSpace="nowrap"
              transition="all 0.3s"
              bg={activeCategory === category ? 'accent.500' : 'primary.600'}
              opacity={activeCategory === category ? 0.2 : 0.5}
              borderWidth="1px"
              borderColor={activeCategory === category ? 'accent.500' : 'primary.400'}
              color={activeCategory === category ? 'accent.300' : 'whiteAlpha.600'}
              boxShadow={activeCategory === category ? 'lg' : 'none'}
              _hover={{
                bg: activeCategory === category ? 'accent.500' : 'primary.600',
                opacity: activeCategory === category ? 0.2 : 0.7,
                color: activeCategory === category ? 'accent.300' : 'whiteAlpha.800',
              }}
              _focus={{
                ring: 2,
                ringColor: 'accent.400',
                ringOffset: 2,
                ringOffsetColor: 'primary.900',
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </Flex>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={{ base: 4, sm: 5 }}>
            {filteredVideos.map((video) => (
              <Button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                aria-label={`Play ${video.title}`}
                bg="primary.600"
                opacity={0.5}
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="xl"
                overflow="hidden"
                textAlign="left"
                h="auto"
                p={0}
                flexDir="column"
                alignItems="stretch"
                _hover={{
                  bg: 'primary.600',
                  opacity: 0.6,
                  borderColor: 'primary.400',
                  boxShadow: 'xl',
                }}
                transition="all 0.3s"
                _focus={{
                  ring: 2,
                  ringColor: 'accent.400',
                  ringOffset: 2,
                  ringOffsetColor: 'primary.900',
                }}
              >
                {/* Thumbnail */}
                <Box position="relative" aspectRatio={16 / 9} bg="primary.700">
                  <Image src={video.thumbnail} alt={`${video.title} thumbnail`} fill style={{ objectFit: 'cover' }} />
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, blackAlpha.600, transparent)"
                  />
                  <Box
                    position="absolute"
                    bottom={2}
                    right={2}
                    px={2}
                    py={1}
                    bg="blackAlpha.700"
                    backdropFilter="blur(4px)"
                    borderRadius="md"
                    fontSize={{ base: 'xs', sm: 'sm' }}
                    color="white"
                    fontWeight="medium"
                  >
                    {video.duration}
                  </Box>
                  {/* Play Icon */}
                  <Flex position="absolute" inset={0} align="center" justify="center">
                    <Flex
                      w={{ base: 14, sm: 16 }}
                      h={{ base: 14, sm: 16 }}
                      bg="accent.500"
                      opacity={0.9}
                      borderRadius="full"
                      align="center"
                      justify="center"
                      transition="all 0.3s"
                      boxShadow="lg"
                      _groupHover={{ transform: 'scale(1.1)', bg: 'accent.500' }}
                    >
                      <Icon
                        viewBox="0 0 24 24"
                        w={{ base: 7, sm: 8 }}
                        h={{ base: 7, sm: 8 }}
                        color="white"
                        fill="currentColor"
                        ml={0.5}
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </Icon>
                    </Flex>
                  </Flex>
                </Box>

                {/* Info */}
                <Box p={{ base: 4, sm: 5 }}>
                  <Heading
                    as="h3"
                    size={{ base: 'sm', sm: 'md' }}
                    color="white"
                    mb={1.5}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    display="-webkit-box"
                    css={{
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {video.title}
                  </Heading>
                  <Text
                    color="whiteAlpha.600"
                    fontSize={{ base: 'sm', sm: 'base' }}
                    mb={3}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    display="-webkit-box"
                    css={{
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {video.description}
                  </Text>
                  <Box mt={2}>
                    <Badge
                      fontSize={{ base: 'xs', sm: 'sm' }}
                      px={2.5}
                      py={1}
                      bg="accent.500"
                      opacity={0.2}
                      color="accent.300"
                      borderRadius="full"
                      textTransform="capitalize"
                      fontWeight="medium"
                    >
                      {video.category}
                    </Badge>
                  </Box>
                </Box>
              </Button>
            ))}
          </Grid>
        ) : (
          <Flex direction="column" align="center" justify="center" py={{ base: 16, sm: 20 }} px={4}>
            <Flex
              w={{ base: 20, sm: 24 }}
              h={{ base: 20, sm: 24 }}
              bg="primary.600"
              opacity={0.3}
              borderRadius="full"
              align="center"
              justify="center"
              mb={4}
            >
              <Icon
                viewBox="0 0 24 24"
                w={{ base: 10, sm: 12 }}
                h={{ base: 10, sm: 12 }}
                color="whiteAlpha.400"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </Icon>
            </Flex>
            <Text color="whiteAlpha.600" textAlign="center" mb={2} fontSize={{ base: 'base', sm: 'lg' }}>
              No videos found
            </Text>
            <Text color="whiteAlpha.400" fontSize={{ base: 'sm', sm: 'base' }} textAlign="center">
              Try selecting a different category
            </Text>
          </Flex>
        )}
      </Flex>
    </>
  );
}
