import { createApp } from 'vue'
import App from './App.vue'
import AppButton from './components/general/AppButton.vue'
import AppContainer from './components/general/AppContainer.vue'
import AppCard from './components/general/AppCard.vue'
import './theme.css'

const app = createApp(App)
// вроде как имеет смысл зарегистрировать глобальные ui компоненты
app.component('app-button', AppButton)
app.component('app-container', AppContainer)
app.component('app-card', AppCard)

app.mount('#app')
