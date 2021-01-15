<template>
  <!-- вообще здесь был v-bind="{content: block.content}" -->
  <!-- но здесь же можно вместо v-bind и так :content="block.content"? или в чем-то подвох?  -->
  <component 
    v-for="block in blocks" 
    :key="block.id" 
    :is="`app-${block.type}`" 
    v-bind="genAttrs(block)"
  >
  </component>
</template>

<script>
import AppTitle from './blocks/AppTitle'
import AppAvatar from './blocks/AppAvatar'
import AppSubtitle from './blocks/AppSubtitle'
import AppText from './blocks/AppText'

export default {
  props: {
    blocks: Array
  },
  methods: {
    // генерирует, какие параметры нужно передать в компонент
    // сделано исключительно для красоты для компонента AppAvatar, в плане оптимизации наверняка херня
    genAttrs(block) {
      return block.type !== 'avatar' ? {content: block.content} : {src: block.content}
    },
  },
  components: {
    AppTitle, AppAvatar, AppSubtitle, AppText
  }
}
</script>