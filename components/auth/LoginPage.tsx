'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Stack,
  Grid
} from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const login = useStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-br, primary.900, primary.700, primary.900)"
      align="center"
      justify="center"
      p={{ base: 4, sm: 6 }}
    >
      <Box maxW="md" w="full">
        {/* Logo */}
        <Box textAlign="center" mb={{ base: 6, sm: 8 }}>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl" }}
            fontWeight="bold"
            color="accent.400"
            mb={{ base: 1, sm: 2 }}
          >
            ALUMINA
          </Heading>
          <Text color="accent.200" opacity={0.6} fontSize="sm">
            At Home
          </Text>
          <Text color="whiteAlpha.600" fontSize="sm" mt={{ base: 3, sm: 4 }}>
            Longevity in Your Personal Sanctuary
          </Text>
        </Box>

        {/* Form */}
        <Box
          bg="primary.600"
          opacity={0.5}
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="2xl"
          p={{ base: 5, sm: 6 }}
        >
          <Heading
            as="h2"
            size={{ base: "lg", sm: "xl" }}
            color="white"
            mb={{ base: 5, sm: 6 }}
          >
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </Heading>

          <form onSubmit={handleSubmit}>
            <Stack gap={4}>
              <Field.Root>
                <Field.Label color="whiteAlpha.700" fontSize="sm">
                  Email
                </Field.Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  px={4}
                  py={3.5}
                  bg="primary.700"
                  opacity={0.5}
                  borderWidth="1px"
                  borderColor="primary.400"
                  borderRadius="xl"
                  color="white"
                  fontSize="base"
                  placeholder="your@email.com"
                  _placeholder={{ color: "whiteAlpha.400" }}
                  _focus={{
                    borderColor: "accent.400",
                    outline: "none"
                  }}
                  required
                  autoComplete="email"
                  minH="52px"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label color="whiteAlpha.700" fontSize="sm">
                  Password
                </Field.Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  px={4}
                  py={3.5}
                  bg="primary.700"
                  opacity={0.5}
                  borderWidth="1px"
                  borderColor="primary.400"
                  borderRadius="xl"
                  color="white"
                  fontSize="base"
                  placeholder="••••••••"
                  _placeholder={{ color: "whiteAlpha.400" }}
                  _focus={{
                    borderColor: "accent.400",
                    outline: "none"
                  }}
                  required
                  autoComplete="current-password"
                  minH="52px"
                />
              </Field.Root>

              <Button
                type="submit"
                w="full"
                bgGradient="linear(to-r, accent.500, accent.600)"
                color="white"
                fontWeight="semibold"
                py={3.5}
                borderRadius="xl"
                _active={{
                  bgGradient: "linear(to-r, accent.600, accent.700)"
                }}
                minH="48px"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </Stack>
          </form>

          <Box mt={5} textAlign="center">
            <Button
              onClick={() => setIsSignUp(!isSignUp)}
              variant="ghost"
              color="accent.400"
              fontSize="sm"
              _active={{ color: "accent.300" }}
              minH="44px"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </Button>
          </Box>

          {/* Social Login */}
          <Box mt={5} pt={5} borderTopWidth="1px" borderColor="primary.400" opacity={0.3}>
            <Text color="whiteAlpha.400" fontSize="xs" textAlign="center" mb={3}>
              Or continue with
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              <Button
                px={4}
                py={3}
                bg="primary.700"
                opacity={0.5}
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="xl"
                color="whiteAlpha.700"
                fontSize="sm"
                _active={{ bg: "primary.700" }}
                minH="48px"
              >
                Google
              </Button>
              <Button
                px={4}
                py={3}
                bg="primary.700"
                opacity={0.5}
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="xl"
                color="whiteAlpha.700"
                fontSize="sm"
                _active={{ bg: "primary.700" }}
                minH="48px"
              >
                Apple
              </Button>
            </Grid>
          </Box>
        </Box>

        {/* Footer */}
        <Text
          color="whiteAlpha.400"
          fontSize="xs"
          textAlign="center"
          mt={{ base: 5, sm: 6 }}
          px={4}
        >
          By continuing, you agree to our Terms & Privacy Policy
        </Text>
      </Box>
    </Flex>
  );
}
