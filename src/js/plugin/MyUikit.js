require('./sass/com.scss');
import Button from './button/button.vue';
import Checkbox from './checkBox/checkbox.vue';
import Loading from './loading/loading';
import Input from './input/input.vue';

const components = [
    Button,
    Checkbox,
    Input,
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
    Vue.use(Loading)
}
module.exports = {
    install
}