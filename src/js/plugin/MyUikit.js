require('./sass/com.scss');
import Button from './button/button.vue';
import Checkbox from './checkBox/checkbox.vue';
import CheckboxGroup from './checkBox/checkbox-group.vue';
import Radio from './radio/radio.vue';
import RadioGroup from './radio/radio-group.vue';
import Loading from './loading/loading';
import Input from './input/input.vue';
import Select from './select/select.vue';
import Option from './select/option.vue';

const components = [
  Button,
  Input,
  CheckboxGroup,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  Option,
];
const install = function (Vue, opts = {}) {
  //======= 统一注册组件
  /**
   * 模板组件
   * forms
   */
  components.map(component => {
    Vue.component(component.name, component);
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