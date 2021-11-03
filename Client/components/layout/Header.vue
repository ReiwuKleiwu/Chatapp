<template>
  <header class="header">
    <nuxt-link to="/" aria-label="Home page" class="header--link">
    <div class="header-logo-wrapper">
      <h1>デュラララチャット！！</h1>
      <span> Durarara chat!!</span>
    </div>
    </nuxt-link>
    <button
      :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
      class="header--sideMenuBtn"
      @click="isMenuOpen = !isMenuOpen"
    >
      <svg
        v-if="!isMenuOpen"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path d="M3 12h18" />
        <path d="M3 6h18" />
        <path d="M3 18h18" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
    <transition name="fade">
      <LayoutMenu v-if="isMenuOpen" />
    </transition>
  </header>
</template>

<script>
export default {
  name: "LayoutHeader",
  data() {
    return {
      isMenuOpen: false,
    };
  },
};
</script>
