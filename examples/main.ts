import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import SnowMonsterUI from '../src'
import App from './app'
const app = createApp(App)
app.use(SnowMonsterUI)
app.use(Antd)
app.mount('#app')
