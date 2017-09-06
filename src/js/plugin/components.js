import button from './button/button.vue';
import checkBox from './checkBox/checkbox.vue';
import loading from './loading/loading';

const components = [
    button,
    checkBox,
];
const install = function (Vue,opts = {}) {
    //======= 统一注册组件
    /**
     * 模板组件
     * forms
     */
    components.map(component => {
        Vue.component(component.name,component);
    });
    /**
     * api组件
     * loading
     * alert
     * message
     */
    Vue.use(loading)
}
module.exports = {
    install
}