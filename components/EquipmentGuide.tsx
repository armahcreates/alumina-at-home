'use client';

import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  Icon,
  Badge,
  Link,
} from '@chakra-ui/react';

interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  price: string;
  tier: 'essential' | 'intermediate' | 'premium';
  category: string;
  benefits: string[];
  buyLink: string;
  owned?: boolean;
}

export default function EquipmentGuide() {
  const [activeTier, setActiveTier] = useState<'essential' | 'intermediate' | 'premium'>('essential');
  const [ownedItems, setOwnedItems] = useState<string[]>([]);

  const equipment: EquipmentItem[] = [
    {
      id: '1',
      name: 'Blue Light Blocking Glasses',
      description: 'Wear 2-3 hours before bed to improve melatonin production',
      price: '$25-50',
      tier: 'essential',
      category: 'Sleep',
      benefits: ['Better sleep quality', 'Natural melatonin boost', 'Reduced eye strain'],
      buyLink: 'https://amazon.com'
    },
    {
      id: '2',
      name: 'Water Mineralization Drops',
      description: 'Add 70+ trace minerals to your drinking water',
      price: '$20-35',
      tier: 'essential',
      category: 'Hydration',
      benefits: ['Cellular hydration', 'Electrolyte balance', 'Better absorption'],
      buyLink: 'https://amazon.com'
    },
    {
      id: '3',
      name: 'Red Light Therapy Panel',
      description: 'Full-body red/NIR light for cellular energy and recovery',
      price: '$300-800',
      tier: 'intermediate',
      category: 'Recovery',
      benefits: ['ATP production', 'Skin health', 'Faster recovery', 'Collagen boost'],
      buyLink: 'https://amazon.com'
    },
    {
      id: '4',
      name: 'Oura Ring (Gen 3)',
      description: 'Track sleep, HRV, and readiness with precision',
      price: '$299-449',
      tier: 'intermediate',
      category: 'Tracking',
      benefits: ['Sleep insights', 'HRV tracking', 'Activity monitoring', 'Recovery score'],
      buyLink: 'https://ouraring.com'
    },
    {
      id: '5',
      name: 'Infrared Sauna',
      description: 'Full-spectrum IR sauna for detox and cardiovascular health',
      price: '$2,500-5,000',
      tier: 'premium',
      category: 'Recovery',
      benefits: ['Detoxification', 'Cardiovascular health', 'Stress reduction', 'Longevity boost'],
      buyLink: 'https://sunlighten.com'
    },
    {
      id: '6',
      name: 'Cold Plunge Tub',
      description: 'Dedicated cold immersion for daily contrast therapy',
      price: '$3,000-8,000',
      tier: 'premium',
      category: 'Recovery',
      benefits: ['Immune boost', 'Mental clarity', 'Inflammation reduction', 'Metabolism boost'],
      buyLink: 'https://plunge.com'
    },
  ];

  const filteredEquipment = equipment.filter(item => item.tier === activeTier);

  const toggleOwned = (id: string) => {
    setOwnedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const tierInfo = {
    essential: {
      title: 'Essential Tier',
      budget: '$0-500',
      description: 'Start with free protocols and minimal equipment'
    },
    intermediate: {
      title: 'Intermediate Tier',
      budget: '$500-2,500',
      description: 'Add helpful tools for better results'
    },
    premium: {
      title: 'Premium Tier',
      budget: '$2,500+',
      description: 'Invest in advanced optimization equipment'
    }
  };

  return (
    <Flex direction="column" gap={{ base: 6, sm: 8 }}>
      {/* Tier Selector */}
      <Grid templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap={{ base: 3, sm: 4 }}>
        {(Object.keys(tierInfo) as Array<keyof typeof tierInfo>).map((tier) => (
          <Button
            key={tier}
            onClick={() => setActiveTier(tier)}
            aria-label={`Select ${tierInfo[tier].title}`}
            aria-current={activeTier === tier ? 'true' : undefined}
            p={{ base: 4, sm: 5 }}
            borderRadius="xl"
            borderWidth="1px"
            transition="all 0.3s"
            textAlign="left"
            h="auto"
            flexDir="column"
            alignItems="flex-start"
            bg={activeTier === tier ? 'accent.500' : 'primary.600'}
            opacity={activeTier === tier ? 0.2 : 0.5}
            borderColor={activeTier === tier ? 'accent.500' : 'primary.400'}
            boxShadow={activeTier === tier ? 'lg' : 'none'}
            _hover={{
              bg: activeTier === tier ? 'accent.500' : 'primary.600',
              opacity: activeTier === tier ? 0.2 : 0.6,
            }}
            _focus={{
              ring: 2,
              ringColor: 'accent.400',
              ringOffset: 2,
              ringOffsetColor: 'primary.900',
            }}
          >
            <Text
              fontWeight="semibold"
              fontSize={{ base: 'sm', sm: 'base' }}
              color={activeTier === tier ? 'accent.300' : 'white'}
            >
              {tierInfo[tier].title}
            </Text>
            <Text fontSize={{ base: 'xs', sm: 'sm' }} color="whiteAlpha.600" mt={1}>
              {tierInfo[tier].budget}
            </Text>
          </Button>
        ))}
      </Grid>

      {/* Tier Description */}
      <Box
        bg="primary.600"
        opacity={0.3}
        borderWidth="1px"
        borderColor="primary.400"
        borderRadius="xl"
        p={{ base: 4, sm: 5 }}
      >
        <Text color="whiteAlpha.700" fontSize={{ base: 'sm', sm: 'base' }}>
          {tierInfo[activeTier].description}
        </Text>
      </Box>

      {/* Equipment List */}
      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={{ base: 4, sm: 5 }}>
        {filteredEquipment.map((item) => (
          <Box
            key={item.id}
            bg="primary.600"
            opacity={0.5}
            borderWidth="1px"
            borderColor="primary.400"
            borderRadius="xl"
            p={{ base: 4, sm: 5 }}
            _hover={{ bg: 'primary.600', opacity: 0.6, borderColor: 'primary.400' }}
            transition="all 0.3s"
          >
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              align={{ base: 'stretch', sm: 'flex-start' }}
              justify={{ base: 'flex-start', sm: 'space-between' }}
              gap={3}
              mb={4}
            >
              <Box flex={1}>
                <Flex align="center" gap={2} mb={1.5} flexWrap="wrap">
                  <Heading as="h3" size={{ base: 'sm', sm: 'md' }} color="white">
                    {item.name}
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
                    {item.category}
                  </Badge>
                </Flex>
                <Text color="whiteAlpha.600" fontSize={{ base: 'sm', sm: 'base' }} mb={2}>
                  {item.description}
                </Text>
                <Text color="accent.400" fontWeight="semibold" fontSize={{ base: 'base', sm: 'lg' }}>
                  {item.price}
                </Text>
              </Box>

              <Button
                onClick={() => toggleOwned(item.id)}
                aria-label={`Mark ${item.name} as ${ownedItems.includes(item.id) ? 'not owned' : 'owned'}`}
                aria-pressed={ownedItems.includes(item.id)}
                px={{ base: 4, sm: 5 }}
                py={{ base: 2, sm: 2.5 }}
                borderRadius="lg"
                fontSize={{ base: 'sm', sm: 'base' }}
                fontWeight="semibold"
                transition="all 0.3s"
                bg={ownedItems.includes(item.id) ? 'accent.500' : 'primary.700'}
                opacity={ownedItems.includes(item.id) ? 0.2 : 0.5}
                borderWidth="1px"
                borderColor={ownedItems.includes(item.id) ? 'accent.500' : 'primary.400'}
                color={ownedItems.includes(item.id) ? 'accent.300' : 'whiteAlpha.600'}
                _hover={{
                  bg: ownedItems.includes(item.id) ? 'accent.500' : 'primary.700',
                  opacity: ownedItems.includes(item.id) ? 0.2 : 0.7,
                }}
                _focus={{
                  ring: 2,
                  ringColor: 'accent.400',
                  ringOffset: 2,
                  ringOffsetColor: 'primary.900',
                }}
              >
                {ownedItems.includes(item.id) ? 'Owned' : 'Mark Owned'}
              </Button>
            </Flex>

            {/* Benefits */}
            <Box mb={4}>
              <Text color="whiteAlpha.500" fontSize={{ base: 'xs', sm: 'sm' }} mb={2.5} fontWeight="medium">
                Key Benefits:
              </Text>
              <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={{ base: 2, sm: 2.5 }}>
                {item.benefits.map((benefit, index) => (
                  <Flex key={index} align="center" gap={2}>
                    <Icon
                      viewBox="0 0 24 24"
                      w={{ base: 4, sm: 4.5 }}
                      h={{ base: 4, sm: 4.5 }}
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

            {/* Buy Button */}
            <Link
              href={item.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${item.name} product details`}
              display="inline-flex"
              alignItems="center"
              gap={2}
              px={{ base: 4, sm: 5 }}
              py={{ base: 2.5, sm: 3 }}
              bgGradient="linear(to-r, accent.500, accent.600)"
              color="white"
              borderRadius="xl"
              fontWeight="semibold"
              fontSize={{ base: 'sm', sm: 'base' }}
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
              <Text>View Product</Text>
              <Icon
                viewBox="0 0 24 24"
                w={{ base: 4, sm: 5 }}
                h={{ base: 4, sm: 5 }}
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </Icon>
            </Link>
          </Box>
        ))}
      </Grid>

      {/* Investment Summary */}
      <Box
        bgGradient="linear(to-br, accent.500, accent.600)"
        opacity={0.1}
        borderWidth="1px"
        borderColor="accent.500"
        borderRadius="2xl"
        p={{ base: 5, sm: 6, lg: 8 }}
      >
        <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white" mb={{ base: 2, sm: 3 }}>
          Investment ROI
        </Heading>
        <Text color="whiteAlpha.700" fontSize={{ base: 'sm', sm: 'base' }} mb={{ base: 4, sm: 5 }} maxW="3xl">
          Quality equipment pays for itself in health gains and healthcare cost avoidance.
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={{ base: 4, sm: 6 }}>
          <Box>
            <Text color="whiteAlpha.500" fontSize={{ base: 'xs', sm: 'sm' }} mb={1.5}>
              Avg. Equipment Cost
            </Text>
            <Text color="white" fontWeight="semibold" fontSize={{ base: 'base', sm: 'lg' }}>
              {tierInfo[activeTier].budget}
            </Text>
          </Box>
          <Box>
            <Text color="whiteAlpha.500" fontSize={{ base: 'xs', sm: 'sm' }} mb={1.5}>
              Potential Savings
            </Text>
            <Text color="accent.400" fontWeight="semibold" fontSize={{ base: 'base', sm: 'lg' }}>
              $50K+ lifetime
            </Text>
          </Box>
        </Grid>
      </Box>
    </Flex>
  );
}
