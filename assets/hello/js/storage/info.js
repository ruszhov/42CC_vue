export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const token = localStorage.getItem("user-token");
        if (token) {
          await axios
            .get("/get_user/", { headers: { Authorization: "Token " + token } })
            .then((response) => {
              commit("setInfo", {
                username: response.data.username,
              });
            });
        }
      } catch (e) {}
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
