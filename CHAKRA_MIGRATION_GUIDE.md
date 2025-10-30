# Chakra UI Migration Guide

## Migration Status

### Completed
- Chakra UI dependencies installed
- Tailwind CSS removed
- Custom theme created (`lib/theme.ts`)
- Providers wrapper created (`components/Providers.tsx`)
- Layout updated with ChakraProvider

### 🔄 In Progress
- Component conversions (see below)

## Tailwind → Chakra Conversion Reference

### Layout & Container
```tsx
// Tailwind
<div className="container mx-auto px-4 py-6">

// Chakra
<Container maxW="container.xl" px={4} py={6}>
```

### Flexbox
```tsx
// Tailwind
<div className="flex items-center justify-between gap-4">

// Chakra
<Flex align="center" justify="space-between" gap={4}>
```

### Grid
```tsx
// Tailwind
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

// Chakra
<Grid templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
```

### Background & Colors
```tsx
// Tailwind
<div className="bg-primary-700 text-white">

// Chakra
<Box bg="primary.700" color="white">
```

### Border & Border Radius
```tsx
// Tailwind
<div className="border border-accent-500/20 rounded-xl">

// Chakra
<Box border="1px" borderColor="accent.500" borderRadius="xl" opacity={0.2}>
```

### Padding & Margin
```tsx
// Tailwind
<div className="p-4 sm:p-6 mt-4 mb-8">

// Chakra
<Box p={{ base: 4, sm: 6 }} mt={4} mb={8}>
```

### Typography
```tsx
// Tailwind
<h2 className="text-2xl font-bold text-white">

// Chakra
<Heading as="h2" size="xl" color="white">
```

### Buttons
```tsx
// Tailwind
<button className="bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-lg">

// Chakra
<Button colorScheme="accent" px={4} py={2} borderRadius="lg">
```

### Images
```tsx
// Tailwind (with Next.js Image)
<Image src="/logo.png" alt="Logo" width={64} height={64} className="rounded-full" />

// Chakra (with Next.js Image)
<ChakraImage as={NextImage} src="/logo.png" alt="Logo" width={64} height={64} borderRadius="full" />
```

## Component Conversion Checklist

### Priority 1: Utility Components
- [ ] `components/LoadingSpinner.tsx`
  - Convert to Chakra Spinner component
  - Use `<Spinner>` for basic spinner
  - Use `<Center>` for LoadingScreen
  - Use `<Skeleton>` for LoadingSkeleton

- [ ] `components/ErrorBoundary.tsx`
  - Convert to use Chakra Alert component
  - Use `<Alert>`, `<AlertIcon>`, `<AlertTitle>`, `<AlertDescription>`

- [ ] `components/FocusTrap.tsx`
  - Already uses external library, minimal changes needed

### Priority 2: Auth Components
- [ ] `components/auth/LoginPage.tsx`
  - Convert form elements to Chakra `<Input>`, `<Button>`, `<FormControl>`
  - Use `<Stack>` for layout

- [ ] `components/auth/OnboardingFlow.tsx`
  - Convert to Chakra `<Stepper>` or custom step indicators
  - Use Chakra form components

### Priority 3: Feature Components (Large)
- [ ] `app/page.tsx` (471 lines)
  - Desktop sidebar → `<Drawer>` or `<Box>` with Chakra styling
  - Mobile sidebar overlay → `<Drawer>`
  - Navigation items → `<Button>` or `<Link>` with Chakra props
  - Stats cards → `<Card>` or `<Box>` with Chakra styling
  
- [ ] `components/Dashboard.tsx` (305 lines)
  - Protocol cards → `<Card>` or `<Box>`
  - Progress ring → Custom SVG with Chakra `<Box>`
  - Quick actions → `<ButtonGroup>` or `<SimpleGrid>`

- [ ] `components/Protocols.tsx`
  - Convert protocol list to Chakra `<Stack>` or `<SimpleGrid>`
  - Use `<Checkbox>` for completed tasks

- [ ] `components/VideoLibrary.tsx`
  - Video cards → `<Card>` with `<AspectRatio>`
  - Video player controls → Chakra buttons

- [ ] `components/Environment.tsx`
  - Room/environment cards → `<Card>` or `<Box>`

- [ ] `components/Supplements.tsx`
  - Supplement cards → `<Card>` or `<Box>`
  - Stack information → `<Stack>`

- [ ] `components/Progress.tsx`
  - Charts → Keep existing chart library, style container with Chakra
  - Stats → `<Stat>`, `<StatLabel>`, `<StatNumber>`

- [ ] `components/Profile.tsx`
  - Form elements → `<FormControl>`, `<Input>`, `<Textarea>`
  - Avatar → `<Avatar>`

- [ ] `components/EquipmentGuide.tsx`
  - Equipment cards → `<Card>` or `<Box>`
  - Product info → `<Stack>`, `<Text>`, `<Heading>`

### Priority 4: Modal Components
- [ ] `components/AchievementsModal.tsx`
  - Convert to Chakra `<Modal>`, `<ModalOverlay>`, `<ModalContent>`
  - Achievement badges → `<Badge>` or custom components

- [ ] `components/ProtocolTimer.tsx`
  - Timer display → `<Heading>`, `<Text>`
  - Controls → `<Button>`
  - Use Chakra `<Modal>` for full-screen overlay

## Step-by-Step Migration Process

### For Each Component:

1. **Import Chakra Components**
```tsx
import { Box, Flex, Button, Heading, Text } from '@chakra-ui/react'
```

2. **Replace HTML tags with Chakra components**
- `<div>` → `<Box>`
- `<button>` → `<Button>`
- `<h1-h6>` → `<Heading>`
- `<p>` → `<Text>`

3. **Convert className to Chakra props**
- Look at the conversion reference above
- Use responsive props: `{{ base: value, md: value, lg: value }}`

4. **Handle special cases**
- Gradients: Use `bgGradient` prop
- Hover states: Use `_hover` prop
- Active states: Use `_active` prop
- Focus states: Use `_focus` prop

5. **Test the component**
- Check visual appearance
- Test interactions
- Verify responsive behavior

## Common Patterns

### Responsive Design
```tsx
// Chakra responsive props
<Box 
  display={{ base: "none", lg: "block" }}
  fontSize={{ base: "sm", md: "md", lg: "lg" }}
  p={{ base: 4, sm: 6, lg: 8 }}
>
```

### Hover & Interactive States
```tsx
<Button
  bg="accent.500"
  _hover={{ bg: "accent.600" }}
  _active={{ bg: "accent.700" }}
  _focus={{ ring: "2", ringColor: "accent.400" }}
>
```

### Gradients
```tsx
<Box
  bgGradient="linear(to-br, primary.900, primary.700, primary.900)"
>
```

### Custom Colors with Opacity
```tsx
// Instead of bg-primary-700/50
<Box bg="primary.700" opacity={0.5}>
// or
<Box bg="rgba(28, 73, 62, 0.5)">
```

## Testing Checklist

After converting each component:
- [ ] Visual appearance matches original
- [ ] All interactions work (clicks, hovers, etc.)
- [ ] Responsive behavior is correct
- [ ] Accessibility features maintained
- [ ] No console errors
- [ ] Component builds successfully

## Build Testing

Run after each major conversion:
```bash
npm run build
npm run dev
```

## Notes

- Keep `framer-motion` for animations - it works well with Chakra
- Maintain all accessibility attributes (aria-labels, roles, etc.)
- Preserve all functional logic - only change styling
- Test on mobile and desktop viewports
- Use the custom theme colors (primary.*, accent.*)

## Resources

- [Chakra UI Documentation](https://chakra-ui.com/docs)
- [Chakra UI + Next.js Guide](https://chakra-ui.com/getting-started/nextjs-app-guide)
- [Chakra Component Props](https://chakra-ui.com/docs/styled-system/style-props)
- [Responsive Styles](https://chakra-ui.com/docs/styled-system/responsive-styles)

## Estimated Time

- Small components (< 100 lines): 15-30 minutes each
- Medium components (100-200 lines): 30-60 minutes each  
- Large components (200+ lines): 1-2 hours each

Total estimated time: 8-12 hours for complete migration