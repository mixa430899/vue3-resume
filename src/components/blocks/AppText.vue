<template>
  <p>{{content}}</p>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
      validator(v) {
        return v.length >= 5 && v.length <= 500
      }
    }
  }
}
</script>