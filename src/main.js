import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import axios from 'axios';
import VueSimpleAlert from "vue-simple-alert";
import App from './App.vue';

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
          /*
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
          */
        },
      });
    },
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
