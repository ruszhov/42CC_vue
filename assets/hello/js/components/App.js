import MainLayout from "../layouts/MainLayout.js";

export default {
  name: "App",
  template: `
    <div>
      <component :is="layout">
        <router-view></router-view>
      </component>
    </div>
  `,
  computed: {
    layout() {
      return this.$route.meta.layout + "-layout";
    },
  },
  components: { MainLayout },
};