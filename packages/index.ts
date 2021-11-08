import RestfullPage from './components/restfull-page/index'
import ExportExcel from './components/export-excel'
const components = [RestfullPage, ExportExcel]

const install = (Vue: any) => {
    // 判断是否安装
    // if (install.installed) return
    components.forEach((component) => Vue.component(component.name, component))
}
export default {
    install,
}
