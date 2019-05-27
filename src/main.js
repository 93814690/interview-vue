import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './http/index'
import VueQuillEditor from 'vue-quill-editor'

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(api);
Vue.use(VueQuillEditor);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
