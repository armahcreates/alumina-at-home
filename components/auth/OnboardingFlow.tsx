'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Grid,
  Icon,
  Progress
} from '@chakra-ui/react';

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const completeOnboarding = useStore((state) => state.completeOnboarding);

  const [formData, setFormData] = useState({
    name: '',
    goals: [] as string[],
    experienceLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    availableTime: 30,
    healthConditions: [] as string[],
    budget: 'intermediate' as 'essential' | 'intermediate' | 'premium',
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      completeOnboarding({
        ...formData,
        email: useStore.getState().user?.email || ''
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSkip = () => {
    completeOnboarding({
      name: formData.name || 'Friend',
      email: useStore.getState().user?.email || '',
      goals: formData.goals.length > 0 ? formData.goals : ['Increase energy'],
      experienceLevel: formData.experienceLevel,
      availableTime: formData.availableTime,
      healthConditions: formData.healthConditions,
      budget: formData.budget,
    });
  };

  const toggleGoal = (goal: string) => {
    setFormData({
      ...formData,
      goals: formData.goals.includes(goal)
        ? formData.goals.filter(g => g !== goal)
        : [...formData.goals, goal]
    });
  };


  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-br, primary.900, primary.700, primary.900)"
      align="center"
      justify="center"
      p={{ base: 4, sm: 6 }}
    >
      <Box maxW="2xl" w="full">
        {/* Skip Button */}
        <Flex justify="flex-end" mb={{ base: 3, sm: 4 }}>
          <Button
            onClick={handleSkip}
            variant="ghost"
            color="whiteAlpha.600"
            _active={{ color: "white" }}
            fontSize="sm"
            textDecoration="underline"
            minH="44px"
          >
            Skip for now
          </Button>
        </Flex>

        {/* Progress Bar */}
        <Box mb={{ base: 6, sm: 8 }}>
          <Flex align="center" justify="space-between" mb={2}>
            <Text color="whiteAlpha.600" fontSize="sm">
              Step {step} of {totalSteps}
            </Text>
            <Text color="accent.400" fontSize="sm">
              {Math.round((step / totalSteps) * 100)}%
            </Text>
          </Flex>
          <Box h={2} bg="primary.600" opacity={0.5} borderRadius="full" overflow="hidden">
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(to right, var(--chakra-colors-accent-400), var(--chakra-colors-accent-500))',
                width: `${(step / totalSteps) * 100}%`
              }}
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </Box>
        </Box>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Box
                bg="primary.600"
                opacity={0.5}
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="2xl"
                p={{ base: 5, sm: 8 }}
              >
                <Heading as="h2" size={{ base: "xl", sm: "2xl" }} color="white" mb={{ base: 3, sm: 4 }}>
                  Welcome! What&apos;s your name?
                </Heading>
                <Text color="whiteAlpha.600" mb={{ base: 5, sm: 6 }} fontSize={{ base: "sm", sm: "base" }}>
                  Let&apos;s personalize your longevity journey
                </Text>

                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  px={{ base: 5, sm: 6 }}
                  py={4}
                  bg="primary.700"
                  opacity={0.5}
                  borderWidth="1px"
                  borderColor="primary.400"
                  borderRadius="xl"
                  color="white"
                  fontSize={{ base: "base", sm: "lg" }}
                  placeholder="Enter your name"
                  _placeholder={{ color: "whiteAlpha.400" }}
                  _focus={{ borderColor: "accent.400", outline: "none" }}
                  minH="52px"
                  autoFocus
                  autoComplete="name"
                />
              </Box>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Box
                bg="primary.600"
                opacity={0.5}
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="2xl"
                p={{ base: 5, sm: 8 }}
              >
                <Heading as="h2" size={{ base: "xl", sm: "2xl" }} color="white" mb={{ base: 3, sm: 4 }}>
                  What are your main goals?
                </Heading>
                <Text color="whiteAlpha.600" mb={{ base: 5, sm: 6 }} fontSize={{ base: "sm", sm: "base" }}>
                  Select all that apply
                </Text>

                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={{ base: 2.5, sm: 3 }}>
                  {[
                    'Increase energy',
                    'Improve sleep quality',
                    'Reduce stress',
                    'Optimize body composition',
                    'Enhance mental clarity',
                    'Reverse biological age',
                    'Build healthy habits',
                    'Improve athletic performance'
                  ].map((goal) => (
                    <Button
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      px={{ base: 4, sm: 6 }}
                      py={{ base: 3.5, sm: 4 }}
                      borderRadius="xl"
                      borderWidth="1px"
                      minH="56px"
                      justifyContent="flex-start"
                      bg={formData.goals.includes(goal) ? "accent.500" : "primary.700"}
                      opacity={formData.goals.includes(goal) ? 0.2 : 0.5}
                      borderColor={formData.goals.includes(goal) ? "accent.500" : "primary.400"}
                      color={formData.goals.includes(goal) ? "accent.300" : "whiteAlpha.700"}
                      _active={{ bg: formData.goals.includes(goal) ? "accent.500" : "primary.700" }}
                    >
                      <Flex align="center" gap={{ base: 2.5, sm: 3 }}>
                        <Box
                          w={5}
                          h={5}
                          borderRadius="full"
                          borderWidth="2px"
                          borderColor={formData.goals.includes(goal) ? "accent.400" : "whiteAlpha.300"}
                          bg={formData.goals.includes(goal) ? "accent.400" : "transparent"}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {formData.goals.includes(goal) && (
                            <Icon viewBox="0 0 24 24" w={3} h={3} color="white">
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
                        </Box>
                        <Text fontWeight="medium">{goal}</Text>
                      </Flex>
                    </Button>
                  ))}
                </Grid>
              </Box>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Box
                bg="primary.600"
                opacity={0.5}
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="2xl"
                p={{ base: 5, sm: 8 }}
              >
                <Heading as="h2" size={{ base: "xl", sm: "2xl" }} color="white" mb={{ base: 3, sm: 4 }}>
                  What&apos;s your experience level?
                </Heading>
                <Text color="whiteAlpha.600" mb={{ base: 5, sm: 6 }} fontSize={{ base: "sm", sm: "base" }}>
                  This helps us customize your protocols
                </Text>

                <Flex direction="column" gap={{ base: 2.5, sm: 3 }}>
                  {[
                    { value: 'beginner', label: 'Beginner', desc: 'New to wellness and longevity practices' },
                    { value: 'intermediate', label: 'Intermediate', desc: 'Some experience with biohacking' },
                    { value: 'advanced', label: 'Advanced', desc: 'Experienced with wellness optimization' }
                  ].map((level) => (
                    <Button
                      key={level.value}
                      onClick={() => setFormData({ ...formData, experienceLevel: level.value as 'beginner' | 'intermediate' | 'advanced' })}
                      w="full"
                      px={{ base: 5, sm: 6 }}
                      py={{ base: 3.5, sm: 4 }}
                      borderRadius="xl"
                      borderWidth="1px"
                      minH="68px"
                      justifyContent="flex-start"
                      flexDir="column"
                      alignItems="flex-start"
                      bg={formData.experienceLevel === level.value ? "accent.500" : "primary.700"}
                      opacity={formData.experienceLevel === level.value ? 0.2 : 0.5}
                      borderColor={formData.experienceLevel === level.value ? "accent.500" : "primary.400"}
                      _active={{ bg: formData.experienceLevel === level.value ? "accent.500" : "primary.700" }}
                    >
                      <Text color="white" fontWeight="semibold" fontSize="base">
                        {level.label}
                      </Text>
                      <Text color="whiteAlpha.600" fontSize="sm" mt={0.5}>
                        {level.desc}
                      </Text>
                    </Button>
                  ))}
                </Flex>
              </Box>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Box
                bg="primary.600"
                opacity={0.5}
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="2xl"
                p={{ base: 5, sm: 8 }}
              >
                <Heading as="h2" size={{ base: "xl", sm: "2xl" }} color="white" mb={{ base: 3, sm: 4 }}>
                  How much time can you commit daily?
                </Heading>
                <Text color="whiteAlpha.600" mb={{ base: 5, sm: 6 }} fontSize={{ base: "sm", sm: "base" }}>
                  We&apos;ll build your protocol around your schedule
                </Text>

                <Box mb={8}>
                  <Flex align="center" justify="space-between" mb={4}>
                    <Text color="white" fontSize="lg" fontWeight="semibold">
                      {formData.availableTime} minutes
                    </Text>
                  </Flex>
                  <Input
                    type="range"
                    min="15"
                    max="120"
                    step="15"
                    value={formData.availableTime}
                    onChange={(e) => setFormData({ ...formData, availableTime: parseInt(e.target.value) })}
                    w="full"
                    h={2}
                    bg="primary.700"
                    opacity={0.5}
                    borderRadius="full"
                    cursor="pointer"
                  />
                  <Flex justify="space-between" color="whiteAlpha.400" fontSize="xs" mt={2}>
                    <Text>15 min</Text>
                    <Text>120 min</Text>
                  </Flex>
                </Box>

                <Box bg="primary.700" opacity={0.3} borderRadius="xl" p={4} borderWidth="1px" borderColor="primary.400">
                  <Text color="whiteAlpha.700" fontSize="sm">
                    {formData.availableTime < 30 && "We'll focus on essential quick wins"}
                    {formData.availableTime >= 30 && formData.availableTime < 60 && "Perfect for building core habits"}
                    {formData.availableTime >= 60 && "Great! You'll have time for advanced protocols"}
                  </Text>
                </Box>
              </Box>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Box
                bg="primary.600"
                opacity={0.5}
                borderWidth="1px"
                borderColor="primary.400"
                borderRadius="2xl"
                p={{ base: 5, sm: 8 }}
              >
                <Heading as="h2" size={{ base: "xl", sm: "2xl" }} color="white" mb={{ base: 3, sm: 4 }}>
                  What&apos;s your equipment budget?
                </Heading>
                <Text color="whiteAlpha.600" mb={{ base: 5, sm: 6 }} fontSize={{ base: "sm", sm: "base" }}>
                  We&apos;ll recommend tools that fit your investment level
                </Text>

                <Flex direction="column" gap={{ base: 2.5, sm: 3 }}>
                  {[
                    { value: 'essential', label: 'Essential ($0-$500)', desc: 'Start with free protocols and minimal equipment' },
                    { value: 'intermediate', label: 'Intermediate ($500-$2,500)', desc: 'Add helpful tools for better results' },
                    { value: 'premium', label: 'Premium ($2,500+)', desc: 'Invest in advanced optimization equipment' }
                  ].map((budget) => (
                    <Button
                      key={budget.value}
                      onClick={() => setFormData({ ...formData, budget: budget.value as 'essential' | 'intermediate' | 'premium' })}
                      w="full"
                      px={{ base: 5, sm: 6 }}
                      py={{ base: 3.5, sm: 4 }}
                      borderRadius="xl"
                      borderWidth="1px"
                      minH="68px"
                      justifyContent="flex-start"
                      flexDir="column"
                      alignItems="flex-start"
                      bg={formData.budget === budget.value ? "accent.500" : "primary.700"}
                      opacity={formData.budget === budget.value ? 0.2 : 0.5}
                      borderColor={formData.budget === budget.value ? "accent.500" : "primary.400"}
                      _active={{ bg: formData.budget === budget.value ? "accent.500" : "primary.700" }}
                    >
                      <Text color="white" fontWeight="semibold" fontSize="base">
                        {budget.label}
                      </Text>
                      <Text color="whiteAlpha.600" fontSize="sm" mt={0.5}>
                        {budget.desc}
                      </Text>
                    </Button>
                  ))}
                </Flex>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <Flex align="center" justify="space-between" mt={{ base: 6, sm: 8 }} gap={3}>
          <Button
            onClick={handleBack}
            disabled={step === 1}
            px={{ base: 5, sm: 6 }}
            py={3.5}
            bg="primary.600"
            opacity={0.5}
            borderWidth="1px"
            borderColor="primary.400"
            borderRadius="xl"
            color="whiteAlpha.700"
            _active={{ color: "white" }}
            _disabled={{ opacity: 0.3, cursor: "not-allowed" }}
            minH="48px"
          >
            ← Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={
              (step === 1 && !formData.name) ||
              (step === 2 && formData.goals.length === 0)
            }
            flex={1}
            px={{ base: 6, sm: 8 }}
            py={3.5}
            bgGradient="linear(to-r, accent.500, accent.600)"
            color="white"
            fontWeight="semibold"
            borderRadius="xl"
            _active={{
              bgGradient: "linear(to-r, accent.600, accent.700)"
            }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
            minH="48px"
          >
            {step === totalSteps ? 'Complete Setup' : 'Next →'}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
