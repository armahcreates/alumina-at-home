'use client';

import { useState } from 'react';
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

export default function Environment() {
  const [activeRoom, setActiveRoom] = useState('bedroom');

  const rooms = {
    bedroom: {
      name: 'Bedroom Optimization',
      icon: 'BED',
      score: 78,
      optimizations: [
        {
          title: 'Temperature Control',
          current: '72°F',
          optimal: '65-68°F',
          status: 'needs-improvement',
          priority: 'high',
          description: 'Lower temperature improves deep sleep and melatonin production',
          action: 'Adjust thermostat 1 hour before bedtime'
        },
        {
          title: 'Light Exposure',
          current: 'Blue light present',
          optimal: 'Amber/red only',
          status: 'needs-improvement',
          priority: 'high',
          description: 'Blue light suppresses melatonin and disrupts circadian rhythm',
          action: 'Install amber bulbs or use blue light blocking'
        },
        {
          title: 'Air Quality',
          current: 'Good',
          optimal: 'Excellent',
          status: 'good',
          priority: 'medium',
          description: 'Clean air supports respiratory health and recovery',
          action: 'Consider air purifier with HEPA filter'
        },
        {
          title: 'EMF Exposure',
          current: 'Devices nearby',
          optimal: 'Airplane mode',
          status: 'needs-improvement',
          priority: 'medium',
          description: 'Electromagnetic fields may impact sleep quality',
          action: 'Keep devices 3ft away, use airplane mode'
        },
      ]
    },
    kitchen: {
      name: 'Kitchen Optimization',
      icon: 'KIT',
      score: 65,
      optimizations: [
        {
          title: 'Water Quality',
          current: 'Tap water',
          optimal: 'Filtered + mineralized',
          status: 'needs-improvement',
          priority: 'high',
          description: 'Mineralized water supports cellular function and hydration',
          action: 'Install reverse osmosis + remineralization system'
        },
        {
          title: 'Cookware',
          current: 'Non-stick',
          optimal: 'Cast iron, stainless',
          status: 'needs-improvement',
          priority: 'high',
          description: 'Avoid PFAS and harmful chemicals in food preparation',
          action: 'Replace with cast iron or stainless steel'
        },
        {
          title: 'Food Storage',
          current: 'Plastic containers',
          optimal: 'Glass containers',
          status: 'needs-improvement',
          priority: 'medium',
          description: 'Avoid BPA and microplastics leaching into food',
          action: 'Switch to glass storage containers'
        },
      ]
    },
    bathroom: {
      name: 'Bathroom Optimization',
      icon: 'BTH',
      score: 82,
      optimizations: [
        {
          title: 'Shower Filter',
          current: 'Installed',
          optimal: 'Installed',
          status: 'optimized',
          priority: 'high',
          description: 'Removes chlorine and heavy metals from water',
          action: 'Replace filter every 6 months'
        },
        {
          title: 'Personal Care Products',
          current: 'Some toxic ingredients',
          optimal: 'All non-toxic',
          status: 'needs-improvement',
          priority: 'medium',
          description: 'Avoid parabens, sulfates, and endocrine disruptors',
          action: 'Switch to clean beauty brands'
        },
        {
          title: 'Ventilation',
          current: 'Good',
          optimal: 'Excellent',
          status: 'good',
          priority: 'low',
          description: 'Proper ventilation reduces mold and moisture',
          action: 'Run exhaust fan during and after showers'
        },
      ]
    },
    workspace: {
      name: 'Workspace Optimization',
      icon: 'WRK',
      score: 70,
      optimizations: [
        {
          title: 'Ergonomics',
          current: 'Needs adjustment',
          optimal: 'Ergonomic setup',
          status: 'needs-improvement',
          priority: 'high',
          description: 'Proper posture prevents pain and supports longevity',
          action: 'Adjust monitor height, use standing desk'
        },
        {
          title: 'Natural Light',
          current: 'Limited',
          optimal: 'Abundant',
          status: 'needs-improvement',
          priority: 'high',
          description: 'Natural light improves focus and circadian rhythm',
          action: 'Position desk near window'
        },
        {
          title: 'Blue Light',
          current: 'Unfiltered',
          optimal: 'Filtered',
          status: 'needs-improvement',
          priority: 'medium',
          description: 'Excess blue light strains eyes and disrupts sleep',
          action: 'Use blue light glasses or screen filters'
        },
      ]
    },
  };

  const currentRoom = rooms[activeRoom as keyof typeof rooms];

  return (
    <Flex direction="column" gap={{ base: 6, sm: 8 }}>
      {/* Room Selector */}
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={{ base: 3, sm: 4 }}>
        {Object.entries(rooms).map(([key, room], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Button
              onClick={() => setActiveRoom(key)}
              aria-label={`Select ${room.name}`}
              aria-current={activeRoom === key ? 'true' : undefined}
              p={{ base: 4, sm: 5 }}
              borderRadius="xl"
              borderWidth="1px"
              transition="all 0.3s"
              bg={activeRoom === key ? 'accent.500' : 'primary.600'}
              opacity={activeRoom === key ? 0.2 : 0.5}
              borderColor={activeRoom === key ? 'accent.500' : 'primary.400'}
              boxShadow={activeRoom === key ? 'lg' : 'none'}
              h="auto"
              flexDir="column"
              _hover={{
                bg: activeRoom === key ? 'accent.500' : 'primary.600',
                opacity: activeRoom === key ? 0.2 : 0.6,
                borderColor: activeRoom === key ? 'accent.500' : 'primary.400',
              }}
              _focus={{
                ring: 2,
                ringColor: 'accent.400',
                ringOffset: 2,
                ringOffsetColor: 'primary.900',
              }}
            >
              <Flex
                align="center"
                justify="center"
                w={{ base: 12, sm: 14 }}
                h={{ base: 12, sm: 14 }}
                borderRadius="lg"
                bg="primary.700"
                opacity={0.5}
                borderWidth="1px"
                borderColor="primary.400"
                mb={{ base: 2, sm: 3 }}
              >
                <Text fontSize={{ base: 'xs', sm: 'sm' }} fontWeight="bold" color="accent.400">
                  {room.icon}
                </Text>
              </Flex>
              <Text
                fontWeight="semibold"
                fontSize={{ base: 'sm', sm: 'base' }}
                mb={2}
                color={activeRoom === key ? 'accent.300' : 'white'}
              >
                {room.name}
              </Text>
              <Flex align="center" gap={2} w="full">
                <Box flex={1} h={{ base: 1.5, sm: 2 }} bg="whiteAlpha.100" borderRadius="full" overflow="hidden">
                  <Box
                    h="full"
                    bgGradient="linear(to-r, accent.400, accent.500)"
                    transition="all 0.5s"
                    w={`${room.score}%`}
                    role="progressbar"
                    aria-valuenow={room.score}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${room.name} optimization score`}
                  />
                </Box>
                <Text fontSize={{ base: 'xs', sm: 'sm' }} color="whiteAlpha.600" fontWeight="semibold">
                  {room.score}%
                </Text>
              </Flex>
            </Button>
          </motion.div>
        ))}
      </Grid>

      {/* Room Details */}
      <motion.div
        key={activeRoom}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          bg="primary.600"
          opacity={0.5}
          borderWidth="1px"
          borderColor="primary.400"
          borderRadius="2xl"
          p={{ base: 5, sm: 6 }}
        >
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            align={{ base: 'flex-start', sm: 'center' }}
            justify={{ base: 'flex-start', sm: 'space-between' }}
            gap={3}
            mb={{ base: 5, sm: 6 }}
          >
            <Heading as="h3" size={{ base: 'lg', sm: 'xl' }} color="white">
              {currentRoom.name}
            </Heading>
            <Flex align="center" gap={2}>
              <Box
                w={{ base: 3, sm: 3.5 }}
                h={{ base: 3, sm: 3.5 }}
                borderRadius="full"
                bg={getScoreColor(currentRoom.score)}
                aria-hidden="true"
              />
              <Text color="whiteAlpha.600" fontSize={{ base: 'sm', sm: 'base' }} fontWeight="medium">
                {currentRoom.score}% Optimized
              </Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap={{ base: 3, sm: 4 }}>
            {currentRoom.optimizations.map((opt, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Box
                  bg="primary.700"
                  opacity={0.5}
                  borderRadius="xl"
                  p={{ base: 4, sm: 5 }}
                  _hover={{ bg: 'primary.700', opacity: 0.6 }}
                  transition="all 0.3s"
                >
                  <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    align={{ base: 'stretch', sm: 'flex-start' }}
                    justify={{ base: 'flex-start', sm: 'space-between' }}
                    gap={4}
                  >
                    <Box flex={1}>
                      <Flex align="center" gap={2} mb={2} flexWrap="wrap">
                        <Heading as="h4" size={{ base: 'sm', sm: 'md' }} color="white">
                          {opt.title}
                        </Heading>
                        <Badge
                          px={2}
                          py={0.5}
                          borderRadius="md"
                          fontSize={{ base: 'xs', sm: 'sm' }}
                          bg={getPriorityBg(opt.priority)}
                          color={getPriorityColor(opt.priority)}
                        >
                          {opt.priority}
                        </Badge>
                      </Flex>
                      <Flex align="center" gap={2} fontSize={{ base: 'sm', sm: 'base' }} mb={3} flexWrap="wrap">
                        <Text color="whiteAlpha.400">Current:</Text>
                        <Text color="whiteAlpha.700" fontWeight="medium">
                          {opt.current}
                        </Text>
                        <Text color="whiteAlpha.400">→</Text>
                        <Text color="accent.400" fontWeight="semibold">
                          {opt.optimal}
                        </Text>
                      </Flex>
                      <Text color="whiteAlpha.600" fontSize={{ base: 'sm', sm: 'base' }} mb={4}>
                        {opt.description}
                      </Text>
                      <Box
                        bg="primary.600"
                        opacity={0.5}
                        borderWidth="1px"
                        borderColor="primary.400"
                        borderRadius="lg"
                        p={{ base: 3, sm: 4 }}
                      >
                        <Text fontSize={{ base: 'xs', sm: 'sm' }} color="whiteAlpha.400" mb={1.5} fontWeight="medium">
                          Recommended Action:
                        </Text>
                        <Text fontSize={{ base: 'sm', sm: 'base' }} color="whiteAlpha.800">
                          {opt.action}
                        </Text>
                      </Box>
                    </Box>
                    <Flex
                      w={{ base: 12, sm: 14 }}
                      h={{ base: 12, sm: 14 }}
                      borderRadius="full"
                      align="center"
                      justify="center"
                      flexShrink={0}
                      bg={getStatusBg(opt.status)}
                      aria-label={`Status: ${opt.status}`}
                    >
                      {opt.status === 'optimized' ? (
                        <Icon
                          viewBox="0 0 24 24"
                          w={{ base: 6, sm: 7 }}
                          h={{ base: 6, sm: 7 }}
                          color="accent.400"
                          fill="none"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </Icon>
                      ) : opt.status === 'good' ? (
                        <Icon
                          viewBox="0 0 24 24"
                          w={{ base: 6, sm: 7 }}
                          h={{ base: 6, sm: 7 }}
                          color="accent.400"
                          fill="none"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </Icon>
                      ) : (
                        <Icon
                          viewBox="0 0 24 24"
                          w={{ base: 6, sm: 7 }}
                          h={{ base: 6, sm: 7 }}
                          color="accent.400"
                          fill="none"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </Icon>
                      )}
                    </Flex>
                  </Flex>
                </Box>
              </motion.div>
            ))}
          </Flex>
        </Box>
      </motion.div>

      {/* Equipment Guide */}
      <Box
        bgGradient="linear(to-br, accent.500, accent.600)"
        opacity={0.1}
        borderWidth="1px"
        borderColor="accent.500"
        borderRadius="2xl"
        p={{ base: 5, sm: 6, lg: 8 }}
        textAlign="center"
      >
        <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white" mb={2}>
          Equipment Recommendations
        </Heading>
        <Text
          color="whiteAlpha.600"
          fontSize={{ base: 'sm', sm: 'base' }}
          mb={{ base: 4, sm: 5 }}
          maxW="2xl"
          mx="auto"
        >
          Curated tools for optimal home environment
        </Text>
        <Button
          aria-label="View equipment guide"
          w={{ base: 'full', sm: 'auto' }}
          px={{ base: 6, sm: 8 }}
          py={{ base: 3, sm: 3.5 }}
          bg="accent.500"
          opacity={0.2}
          borderWidth="1px"
          borderColor="accent.500"
          color="accent.300"
          borderRadius="xl"
          fontWeight="semibold"
          _hover={{
            bg: 'accent.500',
            opacity: 0.3,
          }}
          transition="all 0.3s"
          _focus={{
            ring: 2,
            ringColor: 'accent.400',
            ringOffset: 2,
            ringOffsetColor: 'primary.900',
          }}
        >
          View Equipment Guide
        </Button>
      </Box>
    </Flex>
  );
}

function getScoreColor(score: number) {
  if (score >= 80) return 'accent.400';
  if (score >= 60) return 'accent.500';
  return 'accent.600';
}

function getStatusBg(status: string) {
  if (status === 'optimized') return 'accent.500';
  if (status === 'good') return 'accent.400';
  return 'accent.600';
}

function getPriorityBg(priority: string) {
  if (priority === 'high') return 'accent.600';
  if (priority === 'medium') return 'accent.500';
  return 'primary.400';
}

function getPriorityColor(priority: string) {
  if (priority === 'high') return 'accent.300';
  if (priority === 'medium') return 'accent.300';
  return 'accent.400';
}
