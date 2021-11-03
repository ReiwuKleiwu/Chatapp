<template>
  <label class="inputLabel">
    <div class="inputLabel--label">{{ label }}</div>
    <input v-if="!textarea" :type="type" :value="value" @keyup="inputHandler" />
    <textarea v-else :value="value" @keyup="inputHandler"></textarea>
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
    type: {
      type: String,
      required: false,
      default: "text",
    },
    textarea: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    inputHandler(event) {
      const element = event.target;
      this.$emit("update:value", element.value);
    },
  },
};
</script>
