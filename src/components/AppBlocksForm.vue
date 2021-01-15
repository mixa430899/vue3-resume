<template>
  <form class="card card-w30" @submit.prevent="send">
    <AppFormsSelect 
      label="Тип блока" 
      id="type" 
      v-model.trim="blockType"
    />

    <AppFormsTextarea 
      label="Значение" 
      rows="3" 
      id="value" 
      v-model.trim="value" 
    />
    
    <app-button color="primary" :disabled="valueTooShort">Добавить</app-button>
  </form>
</template>

<script>
import AppFormsSelect from './forms/AppFormsSelect'
import AppFormsTextarea from './forms/AppFormsTextarea'

export default {
  emits: {
    send(value, blockType) {
      if(value && blockType) return true
      console.warn('Value and blockType must be passed')
      return false
    }
  },
  data: () => ({
    value: '',
    blockType: 'title'
  }),
  computed: {
    valueTooShort() {
      return this.value.length < 5
    },
  },
  methods: {
    send() {
      if(!this.valueTooShort) {
        this.$emit('send', this.value, this.blockType)
        this.resetForm()
      }
    },
    resetForm() {
      this.blockType = 'title'
      this.value = ''
    },
  },
  components: {
    AppFormsSelect, AppFormsTextarea
  }
}
</script>