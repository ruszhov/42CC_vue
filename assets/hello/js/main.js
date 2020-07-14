import router from "./router/index.js";
import store from "./storage/index.js";
import App from "./components/App.js";
import "./validators/vuelidate.min.js";
import "./validators/validators.min.js";

Vue.use(window.vuelidate.default);
const { required, minLength } = window.validators;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount(`#app`);
