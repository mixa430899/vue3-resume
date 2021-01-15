<template>
  <button class="btn" :class="color" :disabled="disabled" @click="$emit('action')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['action']
}
</script>