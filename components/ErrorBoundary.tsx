'use client';

import { Component, ReactNode } from 'react';
import { Box, Flex, Center, Heading, Text, Button, Icon } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Flex
          minH="100vh"
          bgGradient="linear(to-br, primary.900, primary.700, primary.900)"
          align="center"
          justify="center"
          p={4}
        >
          <Box
            maxW="md"
            w="full"
            bg="primary.600"
            opacity={0.5}
            borderWidth="1px"
            borderColor="primary.400"
            borderRadius="2xl"
            p={8}
            textAlign="center"
          >
            <Center
              w={16}
              h={16}
              bg="accent.500"
              opacity={0.2}
              borderRadius="full"
              mx="auto"
              mb={4}
            >
              <Icon viewBox="0 0 24 24" w={8} h={8} color="accent.400" aria-hidden="true">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </Icon>
            </Center>
            <Heading as="h2" size="xl" color="white" mb={2}>
              Something went wrong
            </Heading>
            <Text color="whiteAlpha.600" mb={6}>
              We encountered an unexpected error. Please try refreshing the page.
            </Text>
            {this.state.error && (
              <Box as="details" textAlign="left" mb={6} bg="primary.700" opacity={0.5} borderRadius="lg" p={4}>
                <Box as="summary" color="whiteAlpha.700" fontSize="sm" cursor="pointer" mb={2}>
                  Error Details
                </Box>
                <Box as="pre" fontSize="xs" color="whiteAlpha.500" overflowX="auto">
                  {this.state.error.message}
                </Box>
              </Box>
            )}
            <Button
              onClick={() => window.location.reload()}
              w="full"
              bgGradient="linear(to-r, accent.500, accent.600)"
              color="white"
              fontWeight="semibold"
              py={3}
              borderRadius="xl"
              _hover={{
                bgGradient: "linear(to-r, accent.600, accent.700)"
              }}
              _focus={{
                ring: 2,
                ringColor: "accent.400",
                ringOffset: 2,
                ringOffsetColor: "primary.900"
              }}
            >
              Refresh Page
            </Button>
          </Box>
        </Flex>
      );
    }

    return this.props.children;
  }
}