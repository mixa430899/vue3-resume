<template>
  <h1>{{content}}</h1>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
      validator(v) {
        return v.length >= 5 && v.length <= 55
      }
    }
  }
}
</script>