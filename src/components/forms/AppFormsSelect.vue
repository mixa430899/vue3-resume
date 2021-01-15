<template>
  <div class="form-control">
    <label :for="id">{{label}}</label>
    <select :id="id" :value="modelValue" @input="change">
      <option
        v-for="block in blocksTypes" 
        :key="block.type" 
        :value="block.type"
      >
        {{block.name}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    id: String,
    modelValue: String
  },
  // я так понял эмит такого формата не нуждается в валидации
  emits: ['update:modelValue'],
  methods: {
    change(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  },
  inject: ['blocksTypes']
}
</script>