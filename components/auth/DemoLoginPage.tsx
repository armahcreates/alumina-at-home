'use client';

import { useState } from 'react';
import { useStoreDb } from '@/lib/store-db';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Stack,
  Grid
} from '@chakra-ui/react';

export default function DemoLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const login = useStoreDb((state) => state.login);

  const demoUsers = [
    {
      id: 'demo-user-1',
      name: 'Alex Rivera',
      email: 'demo@alumina.com',
      description: 'Active user with 12-day streak',
      level: 'Intermediate',
      streak: '12 days',
      points: '2,500 pts'
    },
    {
      id: 'demo-user-2',
      name: 'Sarah Chen',
      email: 'sarah@alumina.com',
      description: 'Beginner starting their journey',
      level: 'Beginner',
      streak: '5 days',
      points: '450 pts'
    },
    {
      id: 'demo-user-3',
      name: 'Jordan Taylor',
      email: 'jordan@alumina.com',
      description: 'Advanced practitioner',
      level: 'Advanced',
      streak: '67 days',
      points: '8,900 pts'
    }
  ];

  const handleLogin = async (userId: string) => {
    try {
      setLoading(true);
      setError('');
      await login(userId);
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-br, primary.900, primary.700, primary.900)"
      align="center"
      justify="center"
      p={{ base: 4, sm: 6 }}
    >
      <Box maxW="3xl" w="full">
        {/* Logo */}
        <Box textAlign="center" mb={{ base: 8, sm: 10 }}>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", sm: "5xl" }}
            fontWeight="bold"
            color="accent.400"
            mb={{ base: 2, sm: 3 }}
          >
            ALUMINA
          </Heading>
          <Text color="accent.200" opacity={0.6} fontSize="lg">
            At Home
          </Text>
          <Text color="whiteAlpha.600" fontSize="md" mt={{ base: 4, sm: 5 }}>
            Longevity in Your Personal Sanctuary
          </Text>
        </Box>

        {/* Demo Users Selection */}
        <Box
          bg="primary.600"
          opacity={0.5}
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="2xl"
          p={{ base: 6, sm: 8 }}
        >
          <Heading
            as="h2"
            size={{ base: "lg", sm: "xl" }}
            color="white"
            mb={{ base: 2, sm: 3 }}
            textAlign="center"
          >
            Choose Demo User
          </Heading>
          <Text color="whiteAlpha.600" textAlign="center" mb={{ base: 6, sm: 8 }} fontSize="sm">
            Select a user to explore the app with pre-loaded data
          </Text>

          {error && (
            <Box
              bg="red.500"
              opacity={0.2}
              color="white"
              p={3}
              borderRadius="lg"
              mb={4}
              textAlign="center"
            >
              {error}
            </Box>
          )}

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={{ base: 4, sm: 5 }}
          >
            {demoUsers.map((user) => (
              <Box
                key={user.id}
                bg="primary.700"
                opacity={0.5}
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="xl"
                p={{ base: 5, sm: 6 }}
                transition="all 0.2s"
                _hover={{
                  borderColor: 'accent.400',
                  opacity: 0.7,
                  transform: 'translateY(-2px)'
                }}
              >
                <Stack gap={3}>
                  <Box>
                    <Text color="accent.400" fontWeight="bold" fontSize="lg" mb={1}>
                      {user.name}
                    </Text>
                    <Text color="whiteAlpha.500" fontSize="xs" mb={2}>
                      {user.email}
                    </Text>
                  </Box>

                  <Box>
                    <Text color="whiteAlpha.700" fontSize="sm" mb={3}>
                      {user.description}
                    </Text>

                    <Stack gap={1.5}>
                      <Flex justify="space-between">
                        <Text color="whiteAlpha.500" fontSize="xs">Level:</Text>
                        <Text color="white" fontSize="xs" fontWeight="medium">{user.level}</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color="whiteAlpha.500" fontSize="xs">Streak:</Text>
                        <Text color="accent.400" fontSize="xs" fontWeight="medium">{user.streak}</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color="whiteAlpha.500" fontSize="xs">Points:</Text>
                        <Text color="accent.400" fontSize="xs" fontWeight="medium">{user.points}</Text>
                      </Flex>
                    </Stack>
                  </Box>

                  <Button
                    onClick={() => handleLogin(user.id)}
                    disabled={loading}
                    w="full"
                    bg="accent.500"
                    color="white"
                    borderRadius="xl"
                    py={3}
                    fontSize="sm"
                    fontWeight="semibold"
                    _hover={{
                      bg: 'accent.600',
                      transform: 'translateY(-1px)'
                    }}
                    _active={{
                      transform: 'translateY(0)'
                    }}
                    mt={2}
                  >
                    {loading ? 'Loading...' : 'Login as ' + user.name.split(' ')[0]}
                  </Button>
                </Stack>
              </Box>
            ))}
          </Grid>

          <Box
            mt={6}
            p={4}
            bg="primary.800"
            opacity={0.4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="primary.500"
          >
            <Text color="whiteAlpha.600" fontSize="xs" textAlign="center">
              This is a demo version using mock data from the database.
              <br />
              All data is stored in Neon PostgreSQL and loaded in real-time.
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

