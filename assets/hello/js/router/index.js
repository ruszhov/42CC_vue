import Home from "../components/Home.js";
import HttpRequests from "../components/HttpRequests.js";
import EditForm from "../components/EditForm.js";
import Login from "../components/Login.js";
import store from "../storage/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    meta: { layout: "main" },
    component: Home,
  },
  {
    path: "/http_requests",
    meta: { layout: "main" },
    component: HttpRequests,
  },
  {
    path: "/edit_form",
    meta: { layout: "main", auth: true },
    component: EditForm,
  },
  {
    path: "/login",
    meta: { layout: "main" },
    component: Login,
  },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
  const userAuthenticated = Object.keys(store.getters.info).length;
  const requireAuth = to.matched.some((record) => record.meta.auth);
  if (requireAuth && !userAuthenticated) {
    next({
      path: "/login",
      query: {
        next: to.path,
      },
    });
  } else {
    next();
  }
});

export default router;
