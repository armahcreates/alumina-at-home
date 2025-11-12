'use client';

import {
  Box,
  Heading,
  Text,
  Flex,
  Grid,
  Button,
} from '@chakra-ui/react';
import { Flame, TrendingUp, TrendingDown, Download } from 'lucide-react';

export default function Progress() {
  const metrics = [
    { name: 'Energy Level', current: 8.2, previous: 7.1, unit: '/10', trend: 'up', change: '+15%' },
    { name: 'Sleep Quality', current: 89, previous: 76, unit: '%', trend: 'up', change: '+17%' },
    { name: 'HRV', current: 68, previous: 54, unit: 'ms', trend: 'up', change: '+26%' },
    { name: 'Resting Heart Rate', current: 58, previous: 64, unit: 'bpm', trend: 'down', change: '-9%' },
    { name: 'Body Fat', current: 14.2, previous: 16.8, unit: '%', trend: 'down', change: '-15%' },
    { name: 'VO2 Max', current: 48, previous: 43, unit: 'ml/kg/min', trend: 'up', change: '+12%' },
  ];

  const weeklyProgress = [
    { day: 'Mon', completion: 85 },
    { day: 'Tue', completion: 92 },
    { day: 'Wed', completion: 78 },
    { day: 'Thu', completion: 95 },
    { day: 'Fri', completion: 88 },
    { day: 'Sat', completion: 90 },
    { day: 'Sun', completion: 82 },
  ];

  return (
    <Flex direction="column" gap={6}>
      <Box>
        <Heading as="h2" size="xl" color="white" mb={2}>
          Progress Tracking
        </Heading>
        <Text color="whiteAlpha.600" fontSize="sm">
          Your longevity journey in numbers
        </Text>
      </Box>

      {/* Streak Card */}
      <Box
        bg="accent.500/10"
        position="relative"
        border="1px solid"
        borderColor="accent.500/50"
        borderRadius="2xl"
        p={5}
      >
        <Flex justify="space-between" align="center">
          <Box>
            <Text color="whiteAlpha.600" fontSize="sm" mb={1}>
              Current Streak
            </Text>
            <Text fontSize="4xl" fontWeight="bold" color="accent.400">
              12
            </Text>
            <Text color="whiteAlpha.600" fontSize="sm" mt={1}>
              days in a row
            </Text>
          </Box>
          <Box>
            <Box as={Flame} w={16} h={16} color="accent.400" fill="currentColor" />
          </Box>
        </Flex>
        <Box mt={4} pt={4} borderTop="1px solid" borderColor="accent.500/20">
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <Box>
              <Text color="whiteAlpha.400" fontSize="xs">
                Longest Streak
              </Text>
              <Text color="white" fontWeight="semibold">
                18 days
              </Text>
            </Box>
            <Box>
              <Text color="whiteAlpha.400" fontSize="xs">
                Total Active Days
              </Text>
              <Text color="white" fontWeight="semibold">
                42 days
              </Text>
            </Box>
          </Grid>
        </Box>
      </Box>

      {/* Weekly Progress */}
      <Box
        bg="primary.600/50"
        border="1px solid"
        borderColor="primary.400"
        borderRadius="2xl"
        p={5}
      >
        <Heading as="h3" size="md" color="white" mb={4}>
          This Week
        </Heading>
        <Flex align="flex-end" justify="space-between" gap={2} h="32">
          {weeklyProgress.map((day) => (
            <Flex key={day.day} flex={1} flexDir="column" align="center" gap={2}>
              <Box
                w="full"
                bg="primary.500/30"
                borderTopRadius="lg"
                position="relative"
                overflow="hidden"
                h="full"
                display="flex"
                alignItems="flex-end"
              >
                <Box
                  w="full"
                  bgGradient="linear(to-t, accent.500, accent.400)"
                  borderTopRadius="lg"
                  transition="all 0.3s"
                  h={`${day.completion}%`}
                />
              </Box>
              <Text fontSize="xs" color="whiteAlpha.600">
                {day.day}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Text textAlign="center" fontSize="sm" color="whiteAlpha.600" mt={4}>
          Average completion:{' '}
          <Text as="span" color="accent.400" fontWeight="semibold">
            87%
          </Text>
        </Text>
      </Box>

      {/* Key Metrics */}
      <Box>
        <Heading as="h3" size="md" color="white" mb={4}>
          Key Health Metrics
        </Heading>
        <Flex direction="column" gap={3}>
          {metrics.map((metric) => (
            <Box
              key={metric.name}
              bg="primary.600/50"
              border="1px solid"
              borderColor="primary.400"
              borderRadius="xl"
              p={4}
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Text color="white" fontWeight="medium">
                  {metric.name}
                </Text>
                <Flex
                  align="center"
                  gap={1}
                  px={2}
                  py={1}
                  borderRadius="md"
                  bg={metric.trend === 'up' ? 'accent.500/30' : 'accent.400/30'}
                  color={metric.trend === 'up' ? 'accent.300' : 'accent.200'}
                >
                  <Box
                    as={metric.trend === 'up' ? TrendingUp : TrendingDown}
                    w={3}
                    h={3}
                  />
                  <Text fontSize="xs" fontWeight="semibold">
                    {metric.change}
                  </Text>
                </Flex>
              </Flex>
              <Flex align="baseline" gap={2}>
                <Text fontSize="3xl" fontWeight="bold" color="white">
                  {metric.current}
                  <Text as="span" fontSize="sm" color="whiteAlpha.400" fontWeight="normal" ml={1}>
                    {metric.unit}
                  </Text>
                </Text>
                <Text fontSize="sm" color="whiteAlpha.400">
                  from {metric.previous}
                  {metric.unit}
                </Text>
              </Flex>
              <Box mt={3} h="1.5" bg="whiteAlpha.100" borderRadius="full" overflow="hidden">
                <Box
                  h="full"
                  bgGradient="linear(to-r, accent.400, accent.500)"
                  w="70%"
                />
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Biological Age */}
      <Box
        bg="accent.500/10"
        position="relative"
        border="1px solid"
        borderColor="accent.500/50"
        borderRadius="2xl"
        p={5}
      >
        <Heading as="h3" size="md" color="white" mb={3}>
          Biological Age
        </Heading>
        <Flex justify="space-between" align="center" mb={4}>
          <Box>
            <Text color="whiteAlpha.600" fontSize="sm">
              Current
            </Text>
            <Text fontSize="4xl" fontWeight="bold" color="accent.400">
              35
            </Text>
          </Box>
          <Text fontSize="4xl">→</Text>
          <Box>
            <Text color="whiteAlpha.600" fontSize="sm">
              Actual Age
            </Text>
            <Text fontSize="4xl" fontWeight="bold" color="white">
              42
            </Text>
          </Box>
        </Flex>
        <Box
          bg="accent.500/20"
          border="1px solid"
          borderColor="accent.500"
          borderRadius="lg"
          p={3}
        >
          <Text color="accent.300" fontSize="sm" fontWeight="semibold">
            You&apos;ve reversed 7 years!
          </Text>
          <Text color="whiteAlpha.600" fontSize="xs" mt={1}>
            Based on biomarker analysis from last bloodwork
          </Text>
        </Box>
      </Box>

      {/* Export Data */}
      <Button
        w="full"
        bg="primary.600/50"
        border="1px solid"
        borderColor="primary.400"
        borderRadius="xl"
        p={4}
        color="whiteAlpha.700"
        _hover={{
          color: 'white',
          borderColor: 'primary.300',
        }}
        transition="all 0.3s"
      >
        <Flex align="center" gap={2}>
          <Box as={Download} w={5} h={5} />
          <Text fontWeight="semibold">Export All Data</Text>
        </Flex>
      </Button>
    </Flex>
  );
}
