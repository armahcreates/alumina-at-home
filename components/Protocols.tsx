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

export default function Protocols() {
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const protocols = [
    {
      id: 'morning-awakening',
      title: 'Morning Awakening Ritual',
      duration: '45-60 min',
      category: 'Foundation',
      description: 'Start your day with optimal circadian alignment and metabolic activation',
      steps: [
        'Wake naturally or with sunrise alarm (6:00-7:00 AM)',
        'Immediate sunlight exposure (15 min outdoors)',
        'Hydrate with mineralized water (16-24 oz)',
        'Light movement or stretching (5-10 min)',
        'Morning supplements stack',
      ],
      benefits: ['Improved energy', 'Better sleep quality', 'Metabolic activation', 'Hormone optimization']
    },
    {
      id: 'contrast-therapy',
      title: 'Contrast Therapy',
      duration: '10-15 min',
      category: 'Advanced',
      description: 'Hot/cold exposure for cardiovascular health and longevity',
      steps: [
        'Hot shower or sauna (3-5 min)',
        'Cold shower (1-3 min)',
        'Repeat 2-3 cycles',
        'End with cold exposure',
        'Controlled breathing throughout',
      ],
      benefits: ['Cardiovascular health', 'Inflammation reduction', 'Immune boost', 'Mental resilience']
    },
    {
      id: 'breathwork',
      title: 'Breathwork Practice',
      duration: '10-20 min',
      category: 'Foundation',
      description: 'Evidence-based breathing techniques for stress reduction and vitality',
      steps: [
        'Find quiet, comfortable space',
        'Box breathing (4-4-4-4) x 5 rounds',
        'Diaphragmatic breathing x 10',
        'Wim Hof method (optional, advanced)',
        'End with gratitude meditation (2 min)',
      ],
      benefits: ['Stress reduction', 'Improved HRV', 'Better oxygen efficiency', 'Parasympathetic activation']
    },
    {
      id: 'movement',
      title: 'Daily Movement',
      duration: '20-30 min',
      category: 'Foundation',
      description: 'Functional movement for longevity and metabolic health',
      steps: [
        'Dynamic warmup (5 min)',
        'Strength training or bodyweight exercises (15 min)',
        'Mobility work (5 min)',
        'Walking or light cardio (10 min)',
        'Cool down and stretch',
      ],
      benefits: ['Muscle maintenance', 'Bone density', 'Metabolic health', 'Longevity markers']
    },
    {
      id: 'evening-winddown',
      title: 'Evening Wind-Down',
      duration: '30-45 min',
      category: 'Foundation',
      description: 'Prepare your body for restorative sleep',
      steps: [
        'Dim lights 2 hours before bed',
        'Light dinner (stop eating 3 hours before sleep)',
        'Evening supplements',
        'Avoid screens 1 hour before bed',
        'Meditation or journaling (10 min)',
        'Cool bedroom temperature (65-68°F)',
      ],
      benefits: ['Better sleep quality', 'Deeper recovery', 'Hormone optimization', 'Cellular repair']
    },
    {
      id: 'grounding',
      title: 'Grounding Practice',
      duration: '15-20 min',
      category: 'Intermediate',
      description: 'Connect with earth energy for inflammation reduction',
      steps: [
        'Find natural outdoor space',
        'Remove shoes and socks',
        'Stand or walk on earth/grass (15 min)',
        'Practice mindful breathing',
        'Morning or evening optimal',
      ],
      benefits: ['Inflammation reduction', 'Better sleep', 'Stress reduction', 'Circadian alignment']
    },
  ];

  const categories = ['all', 'Foundation', 'Intermediate', 'Advanced'];

  const filteredProtocols = activeCategory === 'all'
    ? protocols
    : protocols.filter(p => p.category === activeCategory);

  return (
    <Flex direction="column" gap={{ base: 6, sm: 8 }}>
      {/* Category Filters */}
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
            aria-label={`Filter by ${category === 'all' ? 'all protocols' : category}`}
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
            {category === 'all' ? 'All Protocols' : category}
          </Button>
        ))}
      </Flex>

      {/* Protocols List */}
      {filteredProtocols.length > 0 ? (
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={{ base: 4, sm: 5 }}>
          {filteredProtocols.map((protocol, index) => (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Box
                bg="primary.600"
                opacity={0.5}
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="2xl"
                overflow="hidden"
                _hover={{ borderColor: 'primary.400', opacity: 0.5 }}
                transition="all 0.3s"
              >
                <Button
                  onClick={() => setSelectedProtocol(selectedProtocol === protocol.id ? null : protocol.id)}
                  aria-label={`${selectedProtocol === protocol.id ? 'Collapse' : 'Expand'} ${protocol.title} details`}
                  aria-expanded={selectedProtocol === protocol.id}
                  w="full"
                  p={{ base: 4, sm: 5 }}
                  textAlign="left"
                  bg="transparent"
                  _hover={{ bg: 'primary.600', opacity: 0.3 }}
                  transition="all 0.3s"
                  _focus={{
                    ring: 2,
                    ringColor: 'accent.400',
                  }}
                  borderRadius={0}
                  h="auto"
                >
                  <Flex align="flex-start" justify="space-between" mb={2} w="full">
                    <Box flex={1} pr={4}>
                      <Flex align="center" gap={2} mb={1.5} flexWrap="wrap">
                        <Heading as="h3" size={{ base: 'sm', sm: 'md' }} color="white">
                          {protocol.title}
                        </Heading>
                        <Badge
                          px={2}
                          py={0.5}
                          bg="accent.500"
                          opacity={0.2}
                          color="accent.300"
                          borderRadius="md"
                          fontSize={{ base: 'xs', sm: 'sm' }}
                        >
                          {protocol.category}
                        </Badge>
                      </Flex>
                      <Text color="whiteAlpha.600" fontSize={{ base: 'sm', sm: 'base' }} mb={2}>
                        {protocol.description}
                      </Text>
                      <Text color="whiteAlpha.400" fontSize={{ base: 'xs', sm: 'sm' }}>
                        Duration: {protocol.duration}
                      </Text>
                    </Box>
                    <Icon
                      viewBox="0 0 24 24"
                      w={{ base: 5, sm: 6 }}
                      h={{ base: 5, sm: 6 }}
                      color="whiteAlpha.400"
                      transition="transform 0.3s"
                      transform={selectedProtocol === protocol.id ? 'rotate(180deg)' : undefined}
                      flexShrink={0}
                      fill="none"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </Icon>
                  </Flex>
                </Button>

                {selectedProtocol === protocol.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Flex
                      direction="column"
                      gap={{ base: 4, sm: 5 }}
                      px={{ base: 4, sm: 5 }}
                      pb={{ base: 4, sm: 5 }}
                      borderTop="1px solid"
                      borderColor="primary.400"
                      opacity={0.3}
                      pt={{ base: 4, sm: 5 }}
                    >
                      {/* Steps */}
                      <Box>
                        <Heading as="h4" size={{ base: 'xs', sm: 'sm' }} color="white" mb={3}>
                          Protocol Steps
                        </Heading>
                        <Flex direction="column" gap={2.5}>
                          {protocol.steps.map((step, index) => (
                            <Flex key={index} gap={3}>
                              <Flex
                                w={{ base: 6, sm: 7 }}
                                h={{ base: 6, sm: 7 }}
                                borderRadius="full"
                                bg="accent.500"
                                opacity={0.2}
                                align="center"
                                justify="center"
                                flexShrink={0}
                              >
                                <Text color="accent.400" fontSize={{ base: 'xs', sm: 'sm' }} fontWeight="semibold">
                                  {index + 1}
                                </Text>
                              </Flex>
                              <Text color="whiteAlpha.700" fontSize={{ base: 'sm', sm: 'base' }} pt={0.5}>
                                {step}
                              </Text>
                            </Flex>
                          ))}
                        </Flex>
                      </Box>

                      {/* Benefits */}
                      <Box>
                        <Heading as="h4" size={{ base: 'xs', sm: 'sm' }} color="white" mb={3}>
                          Key Benefits
                        </Heading>
                        <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={{ base: 2, sm: 3 }}>
                          {protocol.benefits.map((benefit, index) => (
                            <Flex key={index} align="center" gap={2}>
                              <Icon
                                viewBox="0 0 24 24"
                                w={{ base: 4, sm: 5 }}
                                h={{ base: 4, sm: 5 }}
                                color="accent.400"
                                flexShrink={0}
                                fill="none"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </Icon>
                              <Text color="whiteAlpha.700" fontSize={{ base: 'sm', sm: 'base' }}>
                                {benefit}
                              </Text>
                            </Flex>
                          ))}
                        </Grid>
                      </Box>

                      {/* Action Button */}
                      <Button
                        aria-label={`Start ${protocol.title}`}
                        w="full"
                        bgGradient="linear(to-r, accent.500, accent.600)"
                        color="white"
                        fontWeight="semibold"
                        py={{ base: 3, sm: 3.5 }}
                        borderRadius="xl"
                        mt={2}
                        boxShadow="lg"
                        _hover={{
                          bgGradient: 'linear(to-r, accent.600, accent.700)',
                        }}
                        transition="all 0.3s"
                        _focus={{
                          ring: 2,
                          ringColor: 'accent.400',
                          ringOffset: 2,
                          ringOffsetColor: 'primary.900',
                        }}
                      >
                        Start This Protocol
                      </Button>
                    </Flex>
                  </motion.div>
                )}
              </Box>
            </motion.div>
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </Icon>
          </Flex>
          <Text color="whiteAlpha.600" textAlign="center" mb={2} fontSize={{ base: 'base', sm: 'lg' }}>
            No protocols found
          </Text>
          <Text color="whiteAlpha.400" fontSize={{ base: 'sm', sm: 'base' }} textAlign="center">
            Try selecting a different category
          </Text>
        </Flex>
      )}

      {/* Custom Protocol CTA */}
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
          Need a Custom Protocol?
        </Heading>
        <Text
          color="whiteAlpha.600"
          fontSize={{ base: 'sm', sm: 'base' }}
          mb={{ base: 4, sm: 5 }}
          maxW="2xl"
          mx="auto"
        >
          Work with our longevity specialists to create a personalized plan
        </Text>
        <Button
          aria-label="Schedule consultation with specialist"
          px={{ base: 6, sm: 8 }}
          py={{ base: 2.5, sm: 3 }}
          bg="accent.500"
          opacity={0.2}
          borderWidth="1px"
          borderColor="accent.500"
          color="accent.300"
          borderRadius="full"
          fontSize={{ base: 'sm', sm: 'base' }}
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
          Schedule Consultation
        </Button>
      </Box>
    </Flex>
  );
}
