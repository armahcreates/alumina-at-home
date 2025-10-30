'use client';

import { useState } from 'react';
import { useStoreDb } from '@/lib/store-db';
import { useUserData } from '@/lib/hooks/useUserData';
import DemoLoginPage from '@/components/auth/DemoLoginPage';
import OnboardingFlow from '@/components/auth/OnboardingFlow';
import DashboardWithQuery from '@/components/DashboardWithQuery';
import Protocols from '@/components/Protocols';
import Environment from '@/components/Environment';
import Supplements from '@/components/Supplements';
import Progress from '@/components/Progress';
import Profile from '@/components/Profile';
import VideoLibrary from '@/components/VideoLibrary';
import EquipmentGuide from '@/components/EquipmentGuide';
import AchievementsModal from '@/components/AchievementsModal';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Spinner
} from '@chakra-ui/react';

type Tab = 'dashboard' | 'protocols' | 'environment' | 'supplements' | 'progress' | 'profile' | 'videos' | 'equipment';

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showAchievements, setShowAchievements] = useState(false);
  
  const {
    isAuthenticated,
    userId,
    logout
  } = useStoreDb();

  // Load user data with TanStack Query
  const { user, stats, isLoading, isError } = useUserData(userId);

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <DemoLoginPage />;
  }

  // Show loading
  if (isLoading) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="primary.900" flexDir="column" gap={4}>
        <Spinner size="xl" color="accent.400" />
        <Text color="white" fontSize="xl">Loading your data from database...</Text>
      </Flex>
    );
  }

  // Show error
  if (isError) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="primary.900" flexDir="column" gap={4}>
        <Text color="red.400" fontSize="xl">Error loading data</Text>
        <Button onClick={() => logout()} colorScheme="red">
          Back to Login
        </Button>
      </Flex>
    );
  }

  // Show onboarding if not completed
  if (user && !user.hasCompletedOnboarding) {
    return <OnboardingFlow />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardWithQuery />;
      case 'protocols':
        return <Protocols />;
      case 'environment':
        return <Environment />;
      case 'supplements':
        return <Supplements />;
      case 'videos':
        return <VideoLibrary />;
      case 'equipment':
        return <EquipmentGuide />;
      case 'progress':
        return <Progress />;
      case 'profile':
        return <Profile />;
      default:
        return <DashboardWithQuery />;
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'protocols', label: 'Protocols', icon: '📋' },
    { id: 'progress', label: 'Progress', icon: '📈' },
    { id: 'supplements', label: 'Supplements', icon: '💊' },
    { id: 'environment', label: 'Environment', icon: '🏠' },
    { id: 'videos', label: 'Videos', icon: '🎥' },
    { id: 'equipment', label: 'Equipment', icon: '🛠️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <Flex h="100vh" bg="primary.900" overflow="hidden">
      {/* Desktop Sidebar */}
      <Box
        display={{ base: 'none', lg: 'flex' }}
        w="280px"
        bg="primary.800"
        opacity={0.5}
        borderRightWidth="1px"
        borderColor="primary.700"
        flexDir="column"
        p={6}
      >
        <Heading as="h1" size="xl" color="accent.400" mb={8}>
          ALUMINA
        </Heading>

        {/* Stats */}
        <Flex gap={4} mb={8}>
          <Box>
            <Text color="whiteAlpha.500" fontSize="xs" mb={1}>Streak</Text>
            <Text color="accent.400" fontSize="2xl" fontWeight="bold">
              {stats?.currentStreak || 0} 🔥
            </Text>
          </Box>
          <Box>
            <Text color="whiteAlpha.500" fontSize="xs" mb={1}>Points</Text>
            <Text color="accent.400" fontSize="2xl" fontWeight="bold">
              {stats?.totalPoints?.toLocaleString() || 0}
            </Text>
          </Box>
        </Flex>

        {/* Navigation */}
        <Flex flexDir="column" gap={2}>
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              variant={activeTab === item.id ? 'solid' : 'ghost'}
              justifyContent="flex-start"
              color={activeTab === item.id ? 'white' : 'whiteAlpha.700'}
              bg={activeTab === item.id ? 'accent.500' : 'transparent'}
              _hover={{
                bg: activeTab === item.id ? 'accent.600' : 'primary.700'
              }}
            >
              <span>{item.icon}</span> {item.label}
            </Button>
          ))}
        </Flex>

        {/* Logout Button */}
        <Box mt="auto" pt={6}>
          <Button
            onClick={logout}
            w="full"
            variant="ghost"
            color="red.400"
            _hover={{ bg: 'red.900', opacity: 0.3 }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex="1" overflow="auto">
        <Box maxW="1400px" mx="auto" p={{ base: 4, sm: 6, lg: 8 }}>
          {/* Header */}
          <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
            <Box>
              <Heading as="h2" size="xl" color="white">
                Welcome, {user?.name?.split(' ')[0] || 'Friend'}!
              </Heading>
              <Text color="whiteAlpha.600" fontSize="sm" mt={1}>
                🎯 TanStack Query + Neon DB - Real-time data synchronization
              </Text>
            </Box>

            <Flex gap={3}>
              <Button
                onClick={() => setShowAchievements(true)}
                bg="accent.500"
                color="white"
                _hover={{ bg: 'accent.600' }}
                size="sm"
              >
                🏆 Achievements
              </Button>
              <Button
                onClick={logout}
                variant="ghost"
                color="whiteAlpha.700"
                _hover={{ bg: 'primary.700' }}
                size="sm"
                display={{ base: 'flex', lg: 'none' }}
              >
                Logout
              </Button>
            </Flex>
          </Flex>

          {/* Mobile Navigation */}
          <Box display={{ base: 'block', lg: 'none' }} mb={6}>
            <Flex gap={2} overflowX="auto" pb={2}>
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  size="sm"
                  flexShrink={0}
                  variant={activeTab === item.id ? 'solid' : 'outline'}
                  bg={activeTab === item.id ? 'accent.500' : 'transparent'}
                  color={activeTab === item.id ? 'white' : 'whiteAlpha.700'}
                  borderColor={activeTab === item.id ? 'accent.500' : 'primary.600'}
                  _hover={{
                    bg: activeTab === item.id ? 'accent.600' : 'primary.700'
                  }}
                >
                  {item.icon} {item.label}
                </Button>
              ))}
            </Flex>
          </Box>

          {/* Content */}
          {renderContent()}
        </Box>
      </Box>

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
      />
    </Flex>
  );
}
