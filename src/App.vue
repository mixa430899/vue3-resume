<template>
  <app-container additionalClass="column">
    <AppBlocksForm @send="addBlock" />

    <app-card additionalClass="card-w70">
      <template v-if="!blocksLoading">
        <AppAlert :alert="alert" @close="alert = null" />
        <AppBlocksList v-if="hasBlocks" :blocks="blocks" />
        <h3 v-else>Добавьте первый блок, чтобы увидеть результат</h3>
      </template>
      <AppLoader v-else />
    </app-card>
  </app-container>

  <app-container>
    <p v-if="!hasComments">
      <app-button color="primary" @action="loadComments">Загрузить комментарии</app-button>
    </p>
    <app-comments-list v-else :comments="comments"></app-comments-list>
    <AppLoader v-if="commentsLoading" />
  </app-container>
</template>

<script>
import AppBlocksForm from './components/AppBlocksForm'
import AppBlocksList from './components/AppBlocksList'
import AppCommentsList from './components/AppCommentsList'
import AppLoader from './components/general/AppLoader'
import AppAlert from './components/general/AppAlert'
import { dbUrl, commentsUrl } from './common/params'
import { alerts } from './common/alerts'
import { get, post } from './common/utils'

export default {
  data: () => ({
    blocksTypes: [
      {type: 'title', name: 'Заголовок'},
      {type: 'subtitle', name: 'Подзаголовок'},
      {type: 'avatar', name: 'Аватар'},
      {type: 'text', name: 'Текст'},
    ],
    blocks: [],
    comments: [],
    commentsLoading: false,
    blocksLoading: false,
    alert: null
  }),
  computed: {
    hasBlocks() {
      return this.blocks.length > 0
    },
    hasComments() {
      return this.comments.length > 0
    }
  },
  methods: {
    async addBlock(value, blockType) {
      try {
        this.blocksLoading = true
        const res = await post(`${dbUrl}/blocks.json`, { type: blockType, content: value })
        // добавляем блок в случае успешного ответа
        if(res.name) this.blocks.push({ id: res.name, type: blockType, content: value })
        this.blocksLoading = false
        // получаем русское название блока для алерта
        const blockName = this.blocksTypes.find(b => b.type === blockType).name
        this.showAlert(alerts.success.newBlock(blockName))
      } catch(e) {
        this.blocksLoading = false
        this.showAlert(alerts.errors.dbError)
      }
    },
    async loadBlocks() {
      try{
        this.blocksLoading = true
        const data = await get(`${dbUrl}/blocks.json`)
        // кидаем свою ошибку если блоков нет
        if(!data) throw new Error('Got null')
        this.blocks = Object.keys(data).map(key => {
          return { id: key, ...data[key] }
        })
        this.blocksLoading = false
        this.showAlert(alerts.success.loadBlocks(this.blocks.length))
      } catch(e) {
        this.blocksLoading = false
        // обрабатываем свою ошибку
        if(e.message === 'Got null') this.showAlert(alerts.warnings.blocksDbNull)
        // сообщение для всех остальных ошибок
        else this.showAlert(alerts.errors.blocksDbError)
      }
    },
    async loadComments() {
      try{
        this.commentsLoading = true
        this.comments = await get(commentsUrl)
        this.commentsLoading = false
      } catch(e) {
        this.commentsLoading = false
        this.showAlert(alerts.errors.commentError)
      }
    },
    showAlert(alertObj) {
      this.alert = alertObj
      setTimeout(() => { this.alert = null }, alertObj.time)
    }
  },
  // сделано ради проброса сразу в компонент AppFormsSelect, минуя компонент формы
  // возможно сомнительное решение, просто захотелось чтобы этот концепт тоже был в проекте
  provide() {
    return {
      blocksTypes: this.blocksTypes
    }
  },
  components: {
    AppBlocksForm, AppBlocksList, AppCommentsList, AppLoader, AppAlert
  },
  // забираем ранее добавленные блоки из firebase
  mounted() {
    this.loadBlocks()
  }
}
</script>

<style>
  
</style>
