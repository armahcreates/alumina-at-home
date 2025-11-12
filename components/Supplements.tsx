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
} from '@chakra-ui/react';
import { Sunrise, Clock, Moon, Lightbulb, Check } from 'lucide-react';

export default function Supplements() {
  const [completedDoses, setCompletedDoses] = useState<string[]>([]);

  const supplementSchedule = {
    morning: [
      { id: 'morning-1', name: 'Vitamin D3 + K2', dose: '5000 IU + 100mcg', time: '8:00 AM', taken: false },
      { id: 'morning-2', name: 'Omega-3 (Fish Oil)', dose: '2g EPA/DHA', time: '8:00 AM', taken: false },
      { id: 'morning-3', name: 'Magnesium L-Threonate', dose: '2000mg', time: '8:00 AM', taken: false },
      { id: 'morning-4', name: 'B-Complex', dose: '1 capsule', time: '8:00 AM', taken: false },
    ],
    afternoon: [
      { id: 'afternoon-1', name: 'NAD+ Precursor (NMN)', dose: '500mg', time: '12:00 PM', taken: false },
      { id: 'afternoon-2', name: 'Creatine Monohydrate', dose: '5g', time: '12:00 PM', taken: false },
    ],
    evening: [
      { id: 'evening-1', name: 'Magnesium Glycinate', dose: '400mg', time: '7:00 PM', taken: false },
      { id: 'evening-2', name: 'Zinc', dose: '30mg', time: '7:00 PM', taken: false },
      { id: 'evening-3', name: 'Ashwagandha', dose: '600mg', time: '7:00 PM', taken: false },
    ],
    bedtime: [
      { id: 'bedtime-1', name: 'Melatonin', dose: '0.5mg', time: '9:30 PM', taken: false },
      { id: 'bedtime-2', name: 'L-Theanine', dose: '200mg', time: '9:30 PM', taken: false },
    ],
  };

  const toggleDose = (id: string) => {
    setCompletedDoses(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const totalDoses = Object.values(supplementSchedule).flat().length;
  const completionRate = Math.round((completedDoses.length / totalDoses) * 100);

  return (
    <Flex direction="column" gap={{ base: 6, sm: 8 }}>
      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Box
          bg="accent.500/10"
          borderWidth="1px"
          borderColor="accent.500/50"
          borderRadius="2xl"
          p={{ base: 5, sm: 6, lg: 8 }}
        >
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            align={{ base: 'flex-start', sm: 'center' }}
            justify={{ base: 'flex-start', sm: 'space-between' }}
            gap={3}
            mb={4}
          >
            <Heading as="h3" size={{ base: 'md', sm: 'lg', lg: 'xl' }} color="white">
              Today&apos;s Progress
            </Heading>
            <Text fontSize={{ base: '3xl', sm: '4xl' }} fontWeight="bold" color="accent.400">
              {completionRate}%
            </Text>
          </Flex>
          <Box h={{ base: 2, sm: 2.5 }} bg="whiteAlpha.100" borderRadius="full" overflow="hidden">
            <Box
              h="full"
              bgGradient="linear(to-r, accent.400, accent.500)"
              transition="all 0.5s"
              w={`${completionRate}%`}
              role="progressbar"
              aria-valuenow={completionRate}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Daily supplement completion"
            />
          </Box>
          <Text color="whiteAlpha.600" fontSize={{ base: 'sm', sm: 'base' }} mt={3}>
            {completedDoses.length} of {totalDoses} doses taken
          </Text>
        </Box>
      </motion.div>

      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={{ base: 6, sm: 8 }}>
        {/* Morning Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Flex align="center" gap={2.5} mb={4}>
            <Flex
              w={{ base: 9, sm: 10 }}
              h={{ base: 9, sm: 10 }}
              bg="accent.500/20"
              borderRadius="lg"
              align="center"
              justify="center"
            >
              <Box
                as={Sunrise}
                w={{ base: 5, sm: 6 }}
                h={{ base: 5, sm: 6 }}
                color="accent.400"
              />
            </Flex>
            <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white">
              Morning (8:00 AM)
            </Heading>
          </Flex>
          <Flex direction="column" gap={3}>
            {supplementSchedule.morning.map((supp, idx) => (
              <SupplementCard
                key={supp.id}
                supplement={supp}
                completed={completedDoses.includes(supp.id)}
                onToggle={() => toggleDose(supp.id)}
                delay={idx * 0.05}
              />
            ))}
          </Flex>
        </motion.div>

        {/* Afternoon Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Flex align="center" gap={2.5} mb={4}>
            <Flex
              w={{ base: 9, sm: 10 }}
              h={{ base: 9, sm: 10 }}
              bg="accent.500/20"
              borderRadius="lg"
              align="center"
              justify="center"
            >
              <Box
                as={Clock}
                w={{ base: 5, sm: 6 }}
                h={{ base: 5, sm: 6 }}
                color="accent.400"
              />
            </Flex>
            <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white">
              Afternoon (12:00 PM)
            </Heading>
          </Flex>
          <Flex direction="column" gap={3}>
            {supplementSchedule.afternoon.map((supp, idx) => (
              <SupplementCard
                key={supp.id}
                supplement={supp}
                completed={completedDoses.includes(supp.id)}
                onToggle={() => toggleDose(supp.id)}
                delay={idx * 0.05}
              />
            ))}
          </Flex>
        </motion.div>

        {/* Evening Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Flex align="center" gap={2.5} mb={4}>
            <Flex
              w={{ base: 9, sm: 10 }}
              h={{ base: 9, sm: 10 }}
              bg="accent.500/20"
              borderRadius="lg"
              align="center"
              justify="center"
            >
              <Box
                as={Moon}
                w={{ base: 5, sm: 6 }}
                h={{ base: 5, sm: 6 }}
                color="accent.400"
              />
            </Flex>
            <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white">
              Evening (7:00 PM)
            </Heading>
          </Flex>
          <Flex direction="column" gap={3}>
            {supplementSchedule.evening.map((supp, idx) => (
              <SupplementCard
                key={supp.id}
                supplement={supp}
                completed={completedDoses.includes(supp.id)}
                onToggle={() => toggleDose(supp.id)}
                delay={idx * 0.05}
              />
            ))}
          </Flex>
        </motion.div>

        {/* Bedtime Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Flex align="center" gap={2.5} mb={4}>
            <Flex
              w={{ base: 9, sm: 10 }}
              h={{ base: 9, sm: 10 }}
              bg="accent.500/20"
              borderRadius="lg"
              align="center"
              justify="center"
            >
              <Box
                as={Lightbulb}
                w={{ base: 5, sm: 6 }}
                h={{ base: 5, sm: 6 }}
                color="accent.400"
              />
            </Flex>
            <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white">
              Bedtime (9:30 PM)
            </Heading>
          </Flex>
          <Flex direction="column" gap={3}>
            {supplementSchedule.bedtime.map((supp, idx) => (
              <SupplementCard
                key={supp.id}
                supplement={supp}
                completed={completedDoses.includes(supp.id)}
                onToggle={() => toggleDose(supp.id)}
                delay={idx * 0.05}
              />
            ))}
          </Flex>
        </motion.div>
      </Grid>

      {/* Protocol Info */}
      <Box
        bg="accent.500/10"
        borderWidth="1px"
        borderColor="accent.500/50"
        borderRadius="2xl"
        p={{ base: 5, sm: 6, lg: 8 }}
      >
        <Heading as="h3" size={{ base: 'md', sm: 'lg' }} color="white" mb={{ base: 2, sm: 3 }}>
          About Your Protocol
        </Heading>
        <Text
          color="whiteAlpha.600"
          fontSize={{ base: 'sm', sm: 'base' }}
          mb={{ base: 4, sm: 5 }}
          maxW="3xl"
        >
          This supplement stack is optimized for longevity, cellular health, and recovery. All dosages are evidence-based and tailored to your goals.
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={{ base: 3, sm: 4 }}>
          <Button
            aria-label="Learn more about protocol"
            bg="accent.500/20"
            borderWidth="1px"
            borderColor="accent.500"
            color="accent.300"
            py={{ base: 2.5, sm: 3 }}
            borderRadius="xl"
            fontSize={{ base: 'sm', sm: 'base' }}
            fontWeight="semibold"
            _hover={{
              bg: 'accent.500/30',
            }}
            transition="all 0.3s"
            _focus={{
              ring: 2,
              ringColor: 'accent.400',
              ringOffset: 2,
              ringOffsetColor: 'primary.900',
            }}
          >
            Learn More
          </Button>
          <Button
            aria-label="Customize supplement stack"
            bg="accent.500/20"
            borderWidth="1px"
            borderColor="accent.500"
            color="accent.300"
            py={{ base: 2.5, sm: 3 }}
            borderRadius="xl"
            fontSize={{ base: 'sm', sm: 'base' }}
            fontWeight="semibold"
            _hover={{
              bg: 'accent.500/30',
            }}
            transition="all 0.3s"
            _focus={{
              ring: 2,
              ringColor: 'accent.400',
              ringOffset: 2,
              ringOffsetColor: 'primary.900',
            }}
          >
            Customize Stack
          </Button>
        </Grid>
      </Box>
    </Flex>
  );
}

function SupplementCard({
  supplement,
  completed,
  onToggle,
  delay = 0,
}: {
  supplement: { name: string; dose: string; time: string };
  completed: boolean;
  onToggle: () => void;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Button
        onClick={onToggle}
        aria-label={`Mark ${supplement.name} as ${completed ? 'not taken' : 'taken'}`}
        aria-pressed={completed}
        w="full"
        p={{ base: 3.5, sm: 4 }}
        borderRadius="xl"
        borderWidth="1px"
        transition="all 0.3s"
        bg={completed ? 'accent.500/10' : 'primary.600/50'}
        borderColor={completed ? 'accent.500' : 'primary.400'}
        h="auto"
        _hover={{
          boxShadow: 'lg',
          bg: completed ? 'accent.500/10' : 'primary.600/60',
          borderColor: completed ? 'accent.500' : 'primary.400',
        }}
        _focus={{
          ring: 2,
          ringColor: 'accent.400',
          ringOffset: 2,
          ringOffsetColor: 'primary.900',
        }}
      >
        <Flex align="center" gap={{ base: 3, sm: 3.5 }} w="full">
          <Flex
            w={{ base: 7, sm: 8 }}
            h={{ base: 7, sm: 8 }}
            borderRadius="full"
            borderWidth="2px"
            align="center"
            justify="center"
            transition="all 0.3s"
            flexShrink={0}
            bg={completed ? 'accent.500' : 'transparent'}
            borderColor={completed ? 'accent.500' : 'whiteAlpha.300'}
            _hover={{
              borderColor: completed ? 'accent.500' : 'whiteAlpha.500',
            }}
          >
            {completed && (
              <Box
                as={Check}
                w={{ base: 4, sm: 5 }}
                h={{ base: 4, sm: 5 }}
                color="white"
              />
            )}
          </Flex>
          <Box flex={1} textAlign="left" minW={0}>
            <Text
              fontWeight="medium"
              fontSize={{ base: 'sm', sm: 'base' }}
              truncate
              color={completed ? 'whiteAlpha.600' : 'white'}
              textDecoration={completed ? 'line-through' : 'none'}
            >
              {supplement.name}
            </Text>
            <Text fontSize={{ base: 'xs', sm: 'sm' }} color="whiteAlpha.400">
              {supplement.dose}
            </Text>
          </Box>
        </Flex>
      </Button>
    </motion.div>
  );
}
