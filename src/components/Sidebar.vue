<script setup>
import { ref } from "vue";
import {
  Home,
  Heart,
  Briefcase,
  Newspaper,
  Coins,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from "lucide-vue-next";

const isCollapsed = ref(false);
const isHovering = ref(false);
const activeItem = ref("overview");

const navigationItems = [
  { id: "overview", label: "Overview", icon: Home, href: "/dashboard" },
  { id: "favorites", label: "Favorites", icon: Heart, href: "/favorites" },
  { id: "portfolio", label: "Portfolio", icon: Briefcase, href: "/portfolio" },
  { id: "news", label: "News", icon: Newspaper, href: "/news" },
  { id: "coins", label: "Coins", icon: Coins, href: "/coins" },
];

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleMouseEnter = () => {
  if (isCollapsed.value) {
    isHovering.value = true;
  }
};

const handleMouseLeave = () => {
  if (isCollapsed.value) {
    isHovering.value = false;
  }
};

const setActiveItem = (id) => {
  activeItem.value = id;
};
</script>

<template>
  <div
    class="fixed left-0 top-0 h-full bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border z-50 transition-all duration-300 ease-in-out"
    :class="[isCollapsed && !isHovering ? 'w-16' : 'w-64', 'flex flex-col']"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Header with Logo and Add Portfolio -->
    <div class="p-4 border-b border-sidebar-border">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <!-- Logo -->
          <div class="relative">
            <div
              class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center"
            >
              <div
                class="w-4 h-4 bg-white rounded-sm transform rotate-45"
              ></div>
              <div
                class="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg opacity-20 blur-sm"
              ></div>
            </div>
          </div>

          <!-- Add Portfolio Button -->
          <div
            v-if="!isCollapsed || isHovering"
            class="flex items-center space-x-2 text-sidebar-foreground hover:text-sidebar-primary cursor-pointer transition-colors"
          >
            <Plus class="w-4 h-4" />
            <span class="text-sm font-medium">Add portfolio</span>
            <ChevronRight class="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="p-4 border-b border-sidebar-border">
      <div v-if="!isCollapsed || isHovering" class="relative">
        <Search
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search"
          class="w-full bg-sidebar-accent/50 border border-sidebar-border rounded-lg pl-10 pr-4 py-2 text-sm text-sidebar-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-primary/20 focus:border-sidebar-primary"
        />
        <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
          <kbd
            class="px-2 py-1 text-xs bg-sidebar-accent rounded border border-sidebar-border text-muted-foreground"
            >⌘ K</kbd
          >
        </div>
      </div>

      <!-- Collapsed Search Icon -->
      <div v-else class="flex justify-center">
        <div
          class="w-8 h-8 bg-sidebar-accent/50 border border-sidebar-border rounded-lg flex items-center justify-center hover:bg-sidebar-accent transition-colors cursor-pointer"
        >
          <Search class="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>

    <!-- Navigation Items -->
    <nav class="flex-1 p-4">
      <ul class="space-y-2">
        <li v-for="item in navigationItems" :key="item.id">
          <a
            :href="item.href"
            @click="setActiveItem(item.id)"
            class="flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group"
            :class="[
              activeItem === item.id
                ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              !isCollapsed || isHovering ? 'justify-start' : 'justify-center',
            ]"
          >
            <component
              :is="item.icon"
              class="w-5 h-5 flex-shrink-0"
              :class="[
                activeItem === item.id
                  ? 'text-sidebar-primary-foreground'
                  : 'text-muted-foreground group-hover:text-sidebar-foreground',
              ]"
            />
            <span v-if="!isCollapsed || isHovering" class="font-medium text-sm">
              {{ item.label }}
            </span>

            <!-- Special indicators for some items -->
            <div
              v-if="item.id === 'coins' && (!isCollapsed || isHovering)"
              class="ml-auto"
            >
              <div
                class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
              ></div>
            </div>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Bottom Section -->
    <div class="border-t border-sidebar-border p-4">
      <div class="space-y-2">
        <!-- Get Started -->
        <a
          href="#"
          class="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
          :class="
            !isCollapsed || isHovering ? 'justify-start' : 'justify-center'
          "
        >
          <div
            class="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span v-if="!isCollapsed || isHovering" class="font-medium text-sm"
            >Get Started</span
          >
          <div v-if="!isCollapsed || isHovering" class="ml-auto">
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </a>

        <!-- Account Settings -->
        <a
          href="#"
          class="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
          :class="
            !isCollapsed || isHovering ? 'justify-start' : 'justify-center'
          "
        >
          <div
            class="w-5 h-5 bg-sidebar-accent rounded-full flex items-center justify-center flex-shrink-0"
          >
            <div class="w-2 h-2 bg-muted-foreground rounded-full"></div>
          </div>
          <span v-if="!isCollapsed || isHovering" class="font-medium text-sm"
            >Account Settings</span
          >
          <div v-if="!isCollapsed || isHovering" class="ml-auto">
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </a>

        <!-- What's New -->
        <a
          href="#"
          class="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
          :class="
            !isCollapsed || isHovering ? 'justify-start' : 'justify-center'
          "
        >
          <div
            class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <span class="text-xs text-white font-bold">!</span>
          </div>
          <span v-if="!isCollapsed || isHovering" class="font-medium text-sm"
            >What's New</span
          >
          <div v-if="!isCollapsed || isHovering" class="ml-auto">
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </a>
      </div>
    </div>

    <!-- Collapse Toggle Button -->
    <div class="border-t border-sidebar-border p-4">
      <button
        @click="toggleCollapse"
        class="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 w-full"
        :class="!isCollapsed || isHovering ? 'justify-start' : 'justify-center'"
      >
        <component
          :is="isCollapsed ? ChevronRight : ChevronLeft"
          class="w-5 h-5 flex-shrink-0"
        />
        <span v-if="!isCollapsed || isHovering" class="font-medium text-sm"
          >Collapse Menu</span
        >
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for sidebar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Animation for smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.hover-lift:hover {
  transform: translateY(-1px);
}

/* Active item shadow */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Glassmorphism effect */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}
</style>
