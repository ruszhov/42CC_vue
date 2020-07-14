export default {
  name: "MainLayout",
  template: `
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <router-link class="navbar-brand" to="/">42 Coffee Cups Test Assignment</router-link>
          <ul class="navbar-nav ml-auto" v-if="info.username">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Logged as: <span id = "userName">{{info.username}}</span><i class="fas fa-user"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userMenu">
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" @click.prevent="logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
              </div>
            </li>
          </ul>
          <form class="form-inline ml-auto" v-else>
          <router-link to="/login" class="btn btn-outline-secondary"><i class="fas fa-sign-in-alt"></i> Login</router-link>
          </v-elseform>
        </div>
      </nav>
      <router-view></router-view>
    </div>
  `,
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    },
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    info() {
      return this.$store.getters.info;
    },
  },
  watch: {
    error(drfError) {
      console.log(drfError);
    },
  },
};
