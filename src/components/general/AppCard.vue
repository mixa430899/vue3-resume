<template>
  <div class="card" :class="additionalClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    additionalClass: {
      type: String,
      required: false
    }
  }
}
</script>