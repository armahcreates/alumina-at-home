'use client';

import { motion } from 'framer-motion';
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

export default function Profile() {
  return (
    <Flex direction="column" gap={{ base: 6, sm: 8 }}>
      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Box
          bgGradient="linear(to-br, accent.500, accent.600)"
          opacity={0.1}
          borderWidth="1px"
          borderColor="accent.500"
          borderRadius="2xl"
          p={{ base: 5, sm: 6, lg: 8 }}
        >
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            align={{ base: 'center', sm: 'flex-start' }}
            gap={{ base: 4, sm: 5 }}
          >
            <Flex
              w={{ base: 20, sm: 24 }}
              h={{ base: 20, sm: 24 }}
              bgGradient="linear(to-br, accent.400, accent.600)"
              borderRadius="full"
              align="center"
              justify="center"
              fontSize={{ base: '2xl', sm: '3xl' }}
              fontWeight="bold"
              color="white"
              boxShadow="lg"
            >
              AJ
            </Flex>
            <Box flex={1} textAlign={{ base: 'center', sm: 'left' }}>
              <Heading as="h3" size={{ base: 'lg', sm: 'xl' }} color="white" mb={{ base: 1, sm: 2 }}>
                Alex Johnson
              </Heading>
              <Text color="whiteAlpha.600" fontSize={{ base: 'sm', sm: 'base' }} mb={{ base: 3, sm: 4 }}>
                alex@email.com
              </Text>
              <Flex gap={2} justify={{ base: 'center', sm: 'flex-start' }} flexWrap="wrap">
                <Badge
                  px={{ base: 3, sm: 4 }}
                  py={{ base: 1, sm: 1.5 }}
                  bg="accent.500"
                  opacity={0.2}
                  borderWidth="1px"
                  borderColor="accent.500"
                  borderRadius="full"
                  fontSize={{ base: 'xs', sm: 'sm' }}
                  color="accent.300"
                  fontWeight="medium"
                >
                  Premium Member
                </Badge>
                <Badge
                  px={{ base: 3, sm: 4 }}
                  py={{ base: 1, sm: 1.5 }}
                  bg="accent.500"
                  opacity={0.2}
                  borderWidth="1px"
                  borderColor="accent.500"
                  borderRadius="full"
                  fontSize={{ base: 'xs', sm: 'sm' }}
                  color="accent.300"
                  fontWeight="medium"
                >
                  Day 12
                </Badge>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </motion.div>

      {/* Goals */}
      <Box
        bg="primary.600"
        opacity={0.5}
        borderWidth="1px"
        borderColor="primary.400"
        borderRadius="2xl"
        p={{ base: 5, sm: 6 }}
      >
        <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white" mb={{ base: 4, sm: 5 }}>
          Your Goals
        </Heading>
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={{ base: 3, sm: 4 }}>
          <Flex align="flex-start" gap={3}>
            <Flex
              w={{ base: 9, sm: 10 }}
              h={{ base: 9, sm: 10 }}
              bg="accent.500"
              opacity={0.2}
              borderRadius="lg"
              align="center"
              justify="center"
              flexShrink={0}
            >
              <Icon
                viewBox="0 0 24 24"
                w={{ base: 5, sm: 6 }}
                h={{ base: 5, sm: 6 }}
                color="accent.400"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </Icon>
            </Flex>
            <Box>
              <Text color="white" fontWeight="medium" fontSize={{ base: 'sm', sm: 'base' }}>
                Increase Energy Levels
              </Text>
              <Text color="whiteAlpha.600" fontSize={{ base: 'xs', sm: 'sm' }}>
                Target: 8.5/10 • Current: 8.2/10
              </Text>
            </Box>
          </Flex>
          <Flex align="flex-start" gap={3}>
            <Flex
              w={{ base: 9, sm: 10 }}
              h={{ base: 9, sm: 10 }}
              bg="accent.500"
              opacity={0.2}
              borderRadius="lg"
              align="center"
              justify="center"
              flexShrink={0}
            >
              <Icon
                viewBox="0 0 24 24"
                w={{ base: 5, sm: 6 }}
                h={{ base: 5, sm: 6 }}
                color="accent.400"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </Icon>
            </Flex>
            <Box>
              <Text color="white" fontWeight="medium" fontSize={{ base: 'sm', sm: 'base' }}>
                Optimize Sleep Quality
              </Text>
              <Text color="whiteAlpha.600" fontSize={{ base: 'xs', sm: 'sm' }}>
                Target: 92% • Current: 89%
              </Text>
            </Box>
          </Flex>
          <Flex align="flex-start" gap={3}>
            <Flex
              w={{ base: 9, sm: 10 }}
              h={{ base: 9, sm: 10 }}
              bg="accent.500"
              opacity={0.2}
              borderRadius="lg"
              align="center"
              justify="center"
              flexShrink={0}
            >
              <Icon
                viewBox="0 0 24 24"
                w={{ base: 5, sm: 6 }}
                h={{ base: 5, sm: 6 }}
                color="accent.400"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </Icon>
            </Flex>
            <Box>
              <Text color="white" fontWeight="medium" fontSize={{ base: 'sm', sm: 'base' }}>
                Reduce Biological Age
              </Text>
              <Text color="whiteAlpha.600" fontSize={{ base: 'xs', sm: 'sm' }}>
                Target: 10 years • Current: 7 years
              </Text>
            </Box>
          </Flex>
        </Grid>
        <Button
          aria-label="Update your goals"
          w="full"
          mt={{ base: 4, sm: 5 }}
          bg="primary.500"
          opacity={0.5}
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          py={{ base: 3, sm: 3.5 }}
          color="whiteAlpha.700"
          fontSize={{ base: 'sm', sm: 'base' }}
          fontWeight="semibold"
          _hover={{
            color: 'white',
            borderColor: 'primary.300',
          }}
          transition="all 0.3s"
          _focus={{
            ring: 2,
            ringColor: 'accent.400',
            ringOffset: 2,
            ringOffsetColor: 'primary.900',
          }}
        >
          Update Goals
        </Button>
      </Box>

      {/* Settings */}
      <Flex direction="column" gap={{ base: 3, sm: 4 }}>
        <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white">
          Settings
        </Heading>

        <Button
          aria-label="Notification settings"
          w="full"
          bg="primary.600"
          opacity={0.5}
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          p={{ base: 4, sm: 5 }}
          h="auto"
          justifyContent="space-between"
          _hover={{ bg: 'primary.600', opacity: 0.6 }}
          transition="all 0.3s"
          _focus={{
            ring: 2,
            ringColor: 'accent.400',
            ringOffset: 2,
            ringOffsetColor: 'primary.900',
          }}
        >
          <Flex align="center" gap={3}>
            <Flex w={10} h={10} bg="whiteAlpha.50" borderRadius="lg" align="center" justify="center">
              <Icon viewBox="0 0 24 24" w={5} h={5} color="whiteAlpha.700" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </Icon>
            </Flex>
            <Box textAlign="left">
              <Text color="white" fontWeight="medium">
                Notifications
              </Text>
              <Text color="whiteAlpha.400" fontSize="xs">
                Protocol reminders & updates
              </Text>
            </Box>
          </Flex>
          <Icon viewBox="0 0 24 24" w={5} h={5} color="whiteAlpha.400" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </Icon>
        </Button>

        <Button
          w="full"
          bg="primary.600"
          opacity={0.5}
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          p={4}
          h="auto"
          justifyContent="space-between"
          _hover={{ bg: 'primary.600', opacity: 0.6 }}
          transition="all 0.3s"
        >
          <Flex align="center" gap={3}>
            <Flex w={10} h={10} bg="whiteAlpha.50" borderRadius="lg" align="center" justify="center">
              <Icon viewBox="0 0 24 24" w={5} h={5} color="whiteAlpha.700" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </Icon>
            </Flex>
            <Box textAlign="left">
              <Text color="white" fontWeight="medium">
                Personal Information
              </Text>
              <Text color="whiteAlpha.400" fontSize="xs">
                Age, weight, health data
              </Text>
            </Box>
          </Flex>
          <Icon viewBox="0 0 24 24" w={5} h={5} color="whiteAlpha.400" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </Icon>
        </Button>

        <Button
          w="full"
          bg="primary.600"
          opacity={0.5}
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          p={4}
          h="auto"
          justifyContent="space-between"
          _hover={{ bg: 'primary.600', opacity: 0.6 }}
          transition="all 0.3s"
        >
          <Flex align="center" gap={3}>
            <Flex w={10} h={10} bg="whiteAlpha.50" borderRadius="lg" align="center" justify="center">
              <Icon viewBox="0 0 24 24" w={5} h={5} color="whiteAlpha.700" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </Icon>
            </Flex>
            <Box textAlign="left">
              <Text color="white" fontWeight="medium">
                Privacy & Security
              </Text>
              <Text color="whiteAlpha.400" fontSize="xs">
                Data settings & permissions
              </Text>
            </Box>
          </Flex>
          <Icon viewBox="0 0 24 24" w={5} h={5} color="whiteAlpha.400" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </Icon>
        </Button>

        <Button
          w="full"
          bg="primary.600"
          opacity={0.5}
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          p={4}
          h="auto"
          justifyContent="space-between"
          _hover={{ bg: 'primary.600', opacity: 0.6 }}
          transition="all 0.3s"
        >
          <Flex align="center" gap={3}>
            <Flex w={10} h={10} bg="whiteAlpha.50" borderRadius="lg" align="center" justify="center">
              <Icon viewBox="0 0 24 24" w={5} h={5} color="whiteAlpha.700" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </Icon>
            </Flex>
            <Box textAlign="left">
              <Text color="white" fontWeight="medium">
                Resources & Guides
              </Text>
              <Text color="whiteAlpha.400" fontSize="xs">
                Learn about the Alumina Protocol
              </Text>
            </Box>
          </Flex>
          <Icon viewBox="0 0 24 24" w={5} h={5} color="whiteAlpha.400" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </Icon>
        </Button>

        <Button
          w="full"
          bg="primary.600"
          opacity={0.5}
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          p={4}
          h="auto"
          justifyContent="space-between"
          _hover={{ bg: 'primary.600', opacity: 0.6 }}
          transition="all 0.3s"
        >
          <Flex align="center" gap={3}>
            <Flex w={10} h={10} bg="whiteAlpha.50" borderRadius="lg" align="center" justify="center">
              <Icon viewBox="0 0 24 24" w={5} h={5} color="whiteAlpha.700" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </Icon>
            </Flex>
            <Box textAlign="left">
              <Text color="white" fontWeight="medium">
                Get Support
              </Text>
              <Text color="whiteAlpha.400" fontSize="xs">
                Contact our longevity specialists
              </Text>
            </Box>
          </Flex>
          <Icon viewBox="0 0 24 24" w={5} h={5} color="whiteAlpha.400" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </Icon>
        </Button>
      </Flex>

      {/* Account Actions */}
      <Flex direction="column" gap={3} pt={4}>
        <Button
          w="full"
          bg="primary.600"
          opacity={0.5}
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          py={3}
          color="accent.400"
          fontWeight="semibold"
          _hover={{ bg: 'primary.600', opacity: 0.6 }}
          transition="all 0.3s"
        >
          Upgrade to Lifetime Access
        </Button>
        <Button
          w="full"
          bg="primary.600"
          opacity={0.5}
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="xl"
          py={3}
          color="whiteAlpha.700"
          fontWeight="semibold"
          _hover={{ bg: 'primary.600', opacity: 0.6, color: 'white' }}
          transition="all 0.3s"
        >
          Sign Out
        </Button>
      </Flex>

      {/* App Version */}
      <Box textAlign="center" pt={4}>
        <Text color="whiteAlpha.300" fontSize="xs">
          Alumina At Home v1.0.0
        </Text>
        <Text color="whiteAlpha.300" fontSize="xs" mt={1}>
          Powered by the Alumina Protocol
        </Text>
      </Box>
    </Flex>
  );
}
