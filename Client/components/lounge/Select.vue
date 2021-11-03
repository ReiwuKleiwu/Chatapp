<template>
  <label class="selectLabel">
    <div class="selectLabel--label">{{ label }}</div>
    <div class="selectLabel--dropdownWrapper">
      <button
        class="selectLabel--toggler"
        :class="{ 'selectLabel--toggler_active': isDropdownVisible }"
        @click="isDropdownVisible = !isDropdownVisible"
      >
        <span> {{ value }} </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="feather feather-chevron-down"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <transition name="fade">
        <div v-if="isDropdownVisible" class="selectLabel--dropdown">
          <button
            v-for="(option, index) in options"
            :key="index"
            @click="
              $emit('select', option);
              isDropdownVisible = false;
            "
          >
            {{ option }}
          </button>
        </div>
      </transition>
    </div>
  </label>
</template>

<script>
export default {
  name: "Input",
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      isDropdownVisible: false,
    };
  },
};
</script>
