import { createApp } from 'vue'
import App from './App.vue'
import lazyLoad from '@/plugins/lazyLoad'
import placeholderImg from '@/assets/placeholder.svg'

createApp(App)
  .use(lazyLoad, { placeholderImg })
  .mount('#app')
