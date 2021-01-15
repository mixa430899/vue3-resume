<template>
  <div class="form-control">
    <label :for="id">{{label}}</label>
    <textarea :id="id" :value="modelValue" @input="change" :rows="rows"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    rows: String,
    id: String,
    modelValue: String
  },
  emits: ['update:modelValue'],
  // data: () => ({}),
  methods: {
    change(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>