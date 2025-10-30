'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import ProtocolTimer from './ProtocolTimer';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  Icon,
  Badge
} from '@chakra-ui/react';

export default function Dashboard() {
  const { completedTasks, toggleTask, user } = useStore();
  const [activeTimer, setActiveTimer] = useState<{ id: string; name: string; duration: number } | null>(null);

  const todayProtocols = [
    { id: 'morning-light', title: 'Morning Light Exposure', time: '6:30 AM', duration: 15, durationStr: '15 min', category: 'circadian' },
    { id: 'cold-shower', title: 'Cold Shower', time: '7:00 AM', duration: 3, durationStr: '3 min', category: 'contrast' },
    { id: 'breathwork', title: 'Breathwork Session', time: '7:15 AM', duration: 10, durationStr: '10 min', category: 'restoration' },
    { id: 'morning-supps', title: 'Morning Supplements', time: '8:00 AM', duration: 2, durationStr: '2 min', category: 'supplements' },
    { id: 'movement', title: 'Movement Practice', time: '5:00 PM', duration: 30, durationStr: '30 min', category: 'movement' },
    { id: 'evening-supps', title: 'Evening Supplements', time: '7:00 PM', duration: 2, durationStr: '2 min', category: 'supplements' },
    { id: 'wind-down', title: 'Evening Wind-Down', time: '9:00 PM', duration: 20, durationStr: '20 min', category: 'restoration' },
  ];

  const startTimer = (protocol: typeof todayProtocols[0]) => {
    setActiveTimer({
      id: protocol.id,
      name: protocol.title,
      duration: protocol.duration * 60 // convert to seconds
    });
  };

  const completionRate = Math.round((completedTasks.length / todayProtocols.length) * 100);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
  };

  return (
    <>
      {/* Timer Modal */}
      {activeTimer && (
        <ProtocolTimer
          protocolName={activeTimer.name}
          duration={activeTimer.duration}
          onComplete={() => {
            toggleTask(activeTimer.id);
            setActiveTimer(null);
          }}
          onClose={() => setActiveTimer(null)}
        />
      )}

      <Flex direction="column" gap={{ base: 6, sm: 8 }}>
        {/* Welcome Section */}
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
          <Heading as="h2" size={{ base: "lg", sm: "xl", lg: "2xl" }} color="white" mb={1}>
            Good {getTimeOfDay()}, {user?.name || 'Friend'}
          </Heading>
          <Text color="accent.200" opacity={0.7} fontSize={{ base: "sm", sm: "base" }} mb={{ base: 4, sm: 5 }}>
            Your longevity journey continues
          </Text>

          {/* Progress Ring */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Flex
              align="center"
            gap={{ base: 4, sm: 6 }}
          >
            <Box position="relative" w={{ base: 20, sm: 24 }} h={{ base: 20, sm: 24 }}>
              <svg style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                <circle
                  cx="50%"
                  cy="50%"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  color="rgba(255, 255, 255, 0.1)"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${completionRate * 2.14} 214`}
                  color="var(--chakra-colors-accent-400)"
                  style={{ transition: 'all 0.5s' }}
                />
              </svg>
              <Flex position="absolute" inset={0} align="center" justify="center">
                <Text fontSize={{ base: "lg", sm: "xl" }} fontWeight="bold" color="white">
                  {completionRate}%
                </Text>
              </Flex>
            </Box>
            <Box>
              <Text color="white" fontWeight="semibold" fontSize={{ base: "base", sm: "lg" }}>
                Daily Progress
              </Text>
              <Text color="whiteAlpha.600" fontSize={{ base: "sm", sm: "base" }}>
                {completedTasks.length} of {todayProtocols.length} completed
              </Text>
            </Box>
          </Flex>
          </motion.div>
        </Box>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={{ base: 3, sm: 4 }}
        >
          {[
            { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Energy', value: '8.2', unit: '/10', detail: '+15% from last week' },
            { icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z', label: 'Sleep', value: '7.5', unit: 'hrs', detail: '89% quality score' },
            { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', label: 'HRV', value: '68', unit: 'ms', detail: '+26% improvement' },
            { icon: 'M12 2c1.5 1.5 3 3.5 3 5.5 0 2.5-1.5 4.5-3 4.5s-3-2-3-4.5c0-2 1.5-4 3-5.5zm0 18c-3.5 0-6-2.5-6-6 0-2 1-3.5 2-4.5.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5c1 1 2 2.5 2 4.5 0 3.5-2.5 6-6 6z', label: 'Streak', value: '12', unit: ' days', detail: 'Longest: 18 days', fill: true }
          ].map((stat, idx) => (
            <Box
              key={idx}
              bg="primary.600"
              opacity={0.5}
              borderWidth="1px"
              borderColor="primary.400"
              borderRadius="xl"
              p={{ base: 3.5, sm: 4 }}
              _hover={{ bg: "primary.600", opacity: 0.6 }}
              transition="all 0.2s"
            >
              <Flex align="center" gap={2} mb={2}>
                <Flex
                  w={{ base: 7, sm: 8 }}
                  h={{ base: 7, sm: 8 }}
                  bg="accent.500"
                  opacity={0.2}
                  borderRadius="lg"
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <Icon viewBox="0 0 24 24" w={{ base: 4, sm: 5 }} h={{ base: 4, sm: 5 }} color="accent.400">
                    <path
                      fill={stat.fill ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={stat.fill ? 0 : 2}
                      d={stat.icon}
                    />
                  </Icon>
                </Flex>
                <Text color="whiteAlpha.600" fontSize={{ base: "xs", sm: "sm" }}>
                  {stat.label}
                </Text>
              </Flex>
              <Text fontSize={{ base: "xl", sm: "2xl" }} fontWeight="bold" color="white">
                {stat.value}
                <Text as="span" fontSize={{ base: "xs", sm: "sm" }} color="whiteAlpha.400">
                  {stat.unit}
                </Text>
              </Text>
              <Text fontSize={{ base: "10px", sm: "xs" }} color="accent.400" mt={1}>
                {stat.detail}
              </Text>
            </Box>
          ))}
        </Grid>
        </motion.div>

        {/* Today's Protocols */}
        <Box>
          <Flex align="center" justify="space-between" mb={4}>
            <Heading as="h3" size={{ base: "sm", sm: "md", lg: "lg" }} color="white">
              Today&apos;s Protocol
            </Heading>
            <Text fontSize={{ base: "xs", sm: "sm" }} color="whiteAlpha.600">
              {completedTasks.length}/{todayProtocols.length} done
            </Text>
          </Flex>
          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={{ base: 3, sm: 4 }}>
            {todayProtocols.map((protocol, index) => (
              <motion.div
                key={protocol.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Box
                  p={{ base: 3.5, sm: 4 }}
                  borderRadius="xl"
                  borderWidth="1px"
                  bg={completedTasks.includes(protocol.id) ? "accent.500" : "primary.600"}
                  opacity={completedTasks.includes(protocol.id) ? 0.1 : 0.5}
                  borderColor={completedTasks.includes(protocol.id) ? "accent.500" : "primary.400"}
                  _hover={{ shadow: "lg" }}
                  transition="all 0.2s"
                >
                <Flex align="center" gap={{ base: 2.5, sm: 3 }}>
                  <Button
                    onClick={() => toggleTask(protocol.id)}
                    aria-label={`Mark ${protocol.title} as ${completedTasks.includes(protocol.id) ? 'incomplete' : 'complete'}`}
                    minW="44px"
                    minH="44px"
                    w={{ base: 11, sm: 12 }}
                    h={{ base: 11, sm: 12 }}
                    borderRadius="full"
                    borderWidth="2px"
                    flexShrink={0}
                    bg={completedTasks.includes(protocol.id) ? "accent.500" : "transparent"}
                    borderColor={completedTasks.includes(protocol.id) ? "accent.500" : "whiteAlpha.300"}
                    _hover={{ borderColor: completedTasks.includes(protocol.id) ? "accent.500" : "whiteAlpha.500" }}
                    _active={{ borderColor: completedTasks.includes(protocol.id) ? "accent.500" : "whiteAlpha.700" }}
                    _focus={{ ring: 2, ringColor: "accent.400", ringOffset: 2, ringOffsetColor: "primary.900" }}
                  >
                    {completedTasks.includes(protocol.id) && (
                      <Icon viewBox="0 0 24 24" w={{ base: 5, sm: 6 }} h={{ base: 5, sm: 6 }} color="white">
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </Icon>
                    )}
                  </Button>

                  <Box flex={1} minW={0}>
                    <Text
                      fontWeight="medium"
                      fontSize={{ base: "sm", sm: "base" }}
                      lineHeight="tight"
                      mb={1}
                      color={completedTasks.includes(protocol.id) ? "whiteAlpha.600" : "white"}
                      textDecoration={completedTasks.includes(protocol.id) ? "line-through" : "none"}
                    >
                      {protocol.title}
                    </Text>
                    <Flex align="center" gap={2} flexWrap="wrap">
                      <Text fontSize={{ base: "xs", sm: "sm" }} color="whiteAlpha.400">
                        {protocol.time} • {protocol.durationStr}
                      </Text>
                      <Badge
                        px={1.5}
                        py={0.5}
                        borderRadius="sm"
                        fontSize={{ base: "10px", sm: "xs" }}
                        bg={getCategoryColorBg(protocol.category)}
                        color={getCategoryColorText(protocol.category)}
                      >
                        {protocol.category}
                      </Badge>
                    </Flex>
                  </Box>

                  <Button
                    onClick={() => startTimer(protocol)}
                    aria-label={`Start timer for ${protocol.title}`}
                    minW="44px"
                    minH="44px"
                    w={{ base: 11, sm: 12 }}
                    h={{ base: 11, sm: 12 }}
                    bg="accent.500"
                    opacity={0.2}
                    borderWidth="1px"
                    borderColor="accent.500"
                    borderRadius="xl"
                    color="accent.400"
                    flexShrink={0}
                    _hover={{ bg: "accent.500", opacity: 0.3 }}
                    _active={{ bg: "accent.500", opacity: 0.4 }}
                    _focus={{ ring: 2, ringColor: "accent.400", ringOffset: 2, ringOffsetColor: "primary.900" }}
                  >
                    <Icon viewBox="0 0 24 24" w={{ base: 5, sm: 6 }} h={{ base: 5, sm: 6 }}>
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </Icon>
                  </Button>
                </Flex>
              </Box>
              </motion.div>
            ))}
          </Grid>
        </Box>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={{ base: 3, sm: 4 }}
        >
          {[
            { label: 'Start Timer', desc: 'Breathwork session', gradient: true },
            { label: 'Resources', desc: 'Learn more', gradient: false },
            { label: 'Community', desc: 'Connect & share', gradient: false },
            { label: 'Consultation', desc: 'Book a specialist', gradient: false }
          ].map((action, idx) => (
            <Button
              key={idx}
              aria-label={action.label}
              bgGradient={action.gradient ? "linear(to-br, accent.500, accent.600)" : undefined}
              bg={action.gradient ? undefined : "primary.600"}
              opacity={action.gradient ? 1 : 0.5}
              borderWidth={action.gradient ? 0 : "1px"}
              borderColor="primary.400"
              borderRadius="xl"
              p={{ base: 4, sm: 5 }}
              textAlign="left"
              minH={{ base: "100px", sm: "120px" }}
              flexDir="column"
              alignItems="flex-start"
              boxShadow={action.gradient ? "lg" : "none"}
              _hover={{
                bgGradient: action.gradient ? "linear(to-br, accent.600, accent.700)" : undefined,
                bg: action.gradient ? undefined : "primary.600",
                opacity: action.gradient ? 1 : 0.6,
                borderColor: action.gradient ? undefined : "primary.400"
              }}
              _focus={{ ring: 2, ringColor: "accent.400", ringOffset: 2, ringOffsetColor: "primary.900" }}
            >
              <Flex
                w={{ base: 9, sm: 10 }}
                h={{ base: 9, sm: 10 }}
                bg={action.gradient ? "whiteAlpha.200" : "whiteAlpha.50"}
                borderRadius="lg"
                align="center"
                justify="center"
                mb={{ base: 2, sm: 3 }}
              >
                <Icon
                  viewBox="0 0 24 24"
                  w={{ base: 5, sm: 6 }}
                  h={{ base: 5, sm: 6 }}
                  color={action.gradient ? "white" : "whiteAlpha.700"}
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      idx === 0 ? "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" :
                      idx === 1 ? "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" :
                      idx === 2 ? "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" :
                      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    }
                  />
                </Icon>
              </Flex>
              <Text color="white" fontWeight="semibold" fontSize={{ base: "sm", sm: "base" }}>
                {action.label}
              </Text>
              <Text color={action.gradient ? "whiteAlpha.700" : "whiteAlpha.700"} fontSize={{ base: "xs", sm: "sm" }} mt={0.5}>
                {action.desc}
              </Text>
            </Button>
          ))}
        </Grid>
        </motion.div>
      </Flex>
    </>
  );
}

function getCategoryColorBg(category: string) {
  const colors: Record<string, string> = {
    circadian: 'accent.500',
    contrast: 'accent.400',
    restoration: 'primary.400',
    supplements: 'accent.500',
    movement: 'accent.600',
  };
  return colors[category] || 'whiteAlpha.200';
}

function getCategoryColorText(category: string) {
  return 'accent.300';
}
