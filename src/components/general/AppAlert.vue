<template>
  <div class="alert" v-if="alert" :class="alert.type">
    <h3>{{alert.title}}</h3>
    <p>{{alert.text}}</p>
    <app-button :color="alert.type" @action="$emit('close')">Закрыть</app-button>
  </div>
</template>

<script>

export default {
  props: {
    alert: Object,
    validator(v) {
      if(v.title && v.text) return true
      else {
        console.warn('Alert props title and text must be passed')
        return false
      }
    }
  },
  emits: ['close']
}
</script>

<style scoped>

</style>