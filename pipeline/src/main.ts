import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import dayjs from "dayjs";

Vue.use(ElementUI, { size: "small" });
Vue.prototype.$dayjs = dayjs;

new Vue({
  render: h => h(App),
}).$mount("#app");
