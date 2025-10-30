# Chakra UI Migration - Session 3 Instructions

## Current Status: 39% Complete (7/18 components)

### Already Converted (DO NOT TOUCH):
1. components/LoadingSpinner.tsx
2. components/ErrorBoundary.tsx
3. components/FocusTrap.tsx
4. components/AchievementsModal.tsx
5. components/ProtocolTimer.tsx
6. components/auth/LoginPage.tsx
7. components/auth/OnboardingFlow.tsx
8. components/Dashboard.tsx (305 lines)

### Session 3 Task: Convert Remaining 11 Components

**Priority 3 - Feature Components (7 components):**
1. components/Protocols.tsx (~246 lines)
2. components/Environment.tsx (~299 lines)
3. components/Supplements.tsx (~248 lines)
4. components/Progress.tsx (~148 lines)
5. components/Profile.tsx
6. components/VideoLibrary.tsx
7. components/EquipmentGuide.tsx

**Priority 4 - Main Page (1 component):**
8. app/page.tsx (471 lines - LARGEST)

### Step-by-Step Process:

For each component:
1. **Read the file** to understand structure
2. **Convert following these patterns:**
   - `<div>` → `<Box>`
   - `className="flex"` → `<Flex>`
   - `className="grid"` → `<Grid>`
   - `<h1-h6>` → `<Heading>`
   - `<p>` → `<Text>`
   - `<button>` → `<Button>`
3. **Import Chakra components at top**
4. **Convert all className props to Chakra props**
5. **Handle responsive design:** `{{ base: value, md: value, lg: value }}`
6. **Write the converted file**
7. **Move to next component**

### 🔑 Key Conversion Reference:

```tsx
// LAYOUT
<div className="flex items-center gap-4"> → <Flex align="center" gap={4}>
<div className="grid grid-cols-2"> → <Grid templateColumns="repeat(2, 1fr)">

// COLORS & BACKGROUNDS
className="bg-primary-700 text-white" → bg="primary.700" color="white"
className="bg-gradient-to-br from-primary-900 to-primary-700" → 
  bgGradient="linear(to-br, primary.900, primary.700)"

// SPACING
className="p-4 sm:p-6" → p={{ base: 4, sm: 6 }}
className="mt-4 mb-8" → mt={4} mb={8}

// BORDERS
className="border border-accent-500/20 rounded-xl" → 
  border="1px" borderColor="accent.500" opacity={0.2} borderRadius="xl"

// TYPOGRAPHY
<h2 className="text-2xl font-bold"> → <Heading size="xl" fontWeight="bold">
<p className="text-white/60 text-sm"> → <Text color="whiteAlpha.600" fontSize="sm">

// BUTTONS
<button className="bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-lg">
→ <Button colorScheme="accent" px={4} py={2} borderRadius="lg">

// HOVER STATES
className="hover:bg-primary-600" → _hover={{ bg: "primary.600" }}

// RESPONSIVE
className="hidden lg:block" → display={{ base: "none", lg: "block" }}
```

### 🎨 Available Chakra Components:

Common imports you'll need:
```tsx
import { 
  Box, Flex, Grid, 
  Heading, Text, 
  Button, Input, 
  Image as ChakraImage,
  Stack, HStack, VStack,
  Card, CardBody, CardHeader,
  Badge,
  Progress as ChakraProgress,
  Divider,
  Icon
} from '@chakra-ui/react'
```

### 📊 Order of Operations:

**Start with smallest to largest:**

1. **components/Progress.tsx** (~148 lines - SMALLEST, START HERE)
2. **components/Protocols.tsx** (~246 lines)
3. **components/Supplements.tsx** (~248 lines)
4. **components/Environment.tsx** (~299 lines)
5. **components/Profile.tsx**
6. **components/VideoLibrary.tsx**
7. **components/EquipmentGuide.tsx**
8. **app/page.tsx** (471 lines - DO LAST)

### Important Notes:

- **Keep framer-motion:** Wrap Chakra components with `<motion.div>` for animations
- **Next.js Image:** Keep using `next/image`, wrap with Chakra Box if needed
- **Preserve all functionality:** Only change styling, not logic
- **Maintain accessibility:** Keep all aria-labels, roles, etc.
- **Test incrementally:** Check each component visually after conversion

### 🔍 Reference Files:

- **CHAKRA_MIGRATION_GUIDE.md** - Complete patterns library
- **components/Dashboard.tsx** - Recently converted 305-line example
- **components/auth/LoginPage.tsx** - Form conversion example
- **lib/theme.ts** - Custom theme with primary.* and accent.* colors

### Success Criteria:

- [ ] All 11 components converted to Chakra UI
- [ ] No Tailwind classes remain
- [ ] All functionality preserved
- [ ] Responsive behavior maintained
- [ ] Build succeeds: `npm run build`
- [ ] Dev server runs: `npm run dev`

### After Completion:

1. Run `npm run build` to verify no errors
2. Update MIGRATION_STATUS.md with 100% completion
3. Test the application in development mode
4. Document any issues found

**Estimated Time:** 4-6 hours for remaining 11 components

Good luck!