# CryptoSight Landing Page Components

## 📁 Component Structure

The landing page has been refactored into modular components located in `/src/pages/landingPage/`:

### Components Overview

- **`index.vue`** - Main landing page that imports all components
- **`HeaderSection.vue`** - Navigation header with logo and CTA button
- **`HeroSection.vue`** - Hero section with live crypto prices and main CTA
- **`StatsSection.vue`** - Crypto adoption statistics timeline
- **`FeaturesSection.vue`** - Feature showcase grid
- **`PortfolioShowcase.vue`** - Portfolio management demonstration
- **`CallToAction.vue`** - Final call-to-action section
- **`FooterSection.vue`** - Footer with branding

## 🎨 Theme Integration

All components now use the shadcn theme system with CSS variables from `main.css`:

### Background Colors

- `bg-background` - Main background color
- `bg-card` - Card background color
- `bg-primary` - Primary brand color
- `bg-chart-1` through `bg-chart-5` - Chart colors

### Text Colors

- `text-foreground` - Primary text color
- `text-muted-foreground` - Secondary text color
- `text-primary` - Primary brand text
- `text-chart-1` through `text-chart-5` - Chart text colors

### Interactive Classes

- `card-interactive` - Interactive card with hover effects
- `hover-lift` - Lift animation on hover
- `hover-glow` - Glow effect on hover
- `btn-primary` - Primary button style
- `btn-ghost` - Ghost button style

### Animation Classes

- `animate-float` - Floating animation
- `animate-glow` - Pulsing glow effect
- `animate-slide-in-left/right/bottom` - Slide animations
- `animate-fade-in-scale` - Fade and scale animation
- `stagger-animation` - Sequential animation for child elements

## 🔧 Usage

Import and use individual components:

```vue
<script setup>
import HeaderSection from "./HeaderSection.vue";
import HeroSection from "./HeroSection.vue";
// ... other components
</script>

<template>
  <div class="min-h-screen bg-background text-foreground dark">
    <HeaderSection />
    <HeroSection />
    <!-- ... other sections -->
  </div>
</template>
```

## 🌗 Theme Support

The application supports both light and dark themes. Components automatically adapt using CSS variables defined in `main.css`.

## 📱 Responsive Design

All components are fully responsive and include mobile-optimized animations and layouts.
