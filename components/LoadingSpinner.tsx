'use client';

import { Flex, Spinner, Center, Box, Text } from '@chakra-ui/react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  return (
    <Flex align="center" justify="center" role="status" aria-live="polite">
      <Spinner
        size={size}
        colorPalette="accent"
        borderWidth="2px"
        aria-label="Loading"
      />
      <Box as="span" srOnly>Loading...</Box>
    </Flex>
  );
}

export function LoadingScreen() {
  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-br, primary.900, primary.700, primary.900)"
      align="center"
      justify="center"
      p={4}
    >
      <Center flexDir="column">
        <LoadingSpinner size="lg" />
        <Text color="whiteAlpha.600" fontSize="sm" mt={4}>
          Loading...
        </Text>
      </Center>
    </Flex>
  );
}

export function LoadingSkeleton() {
  return (
    <Box
      animation="pulse"
      bg="primary.600"
      opacity={0.3}
      borderRadius="xl"
      aria-label="Loading content"
    />
  );
}