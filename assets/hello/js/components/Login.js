import "../validators/validators.min.js";
const { required, minLength } = window.validators;
export default {
  name: "Home",
  template: `
    <div class="row justify-content-center">
      <div class="col-lg-4 col-md-6 col-sm-8">
        <div class="card login-card">
          <div class="card-body">
            <h3 class="card-title">Log in</h3>
            <form @submit.prevent="loginHandler">
              <div class="form-group">
                <label for="id_username">Username:</label>
                <input class="form-control" name="username" type="text" id="id_username" 
                  v-model.trim="username"
                  :class="{'is-invalid': ($v.username.$dirty && !$v.username.required) || ($v.username.$dirty && !$v.username.minLength)}"
                  />
                <div 
                  class="invalid-feedback"
                  v-if="($v.username.$dirty && !$v.username.required)"
                  >This field is required</div>
                <div 
                  class="invalid-feedback"
                  v-else-if="($v.username.$dirty && !$v.username.minLength)"
                  >The field must be at least 5 characters long. Now is {{username.length}}</div>
              </div>
              <div class="form-group">
                <label for="id_password">Password:</label>
                <input class="form-control" name="password" type="password" id="id_password" 
                  v-model.trim="password" 
                  :class="{'is-invalid': ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                  />
                <div 
                  class="invalid-feedback"
                  v-if="($v.password.$dirty && !$v.password.required)"
                  >This field is required</div>
                <div 
                  class="invalid-feedback"
                  v-else-if="($v.password.$dirty && !$v.password.minLength)"
                  >The field must be at least 5 characters long. Now is {{password.length}}</div>
              </div>
              <button class="btn btn-primary" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      username: "",
      password: "",
    };
  },
  validations: {
    username: { required: required, minLength: minLength(5) },
    password: { required: required, minLength: minLength(5) },
  },
  methods: {
    async loginHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        username: this.username,
        password: this.password,
      };
      try {
        await this.$store.dispatch("login", formData);
        console.log(this.$route.query.next);
        this.$router.push(this.$route.query.next || "/");
      } catch (e) {}
    },
  },
};
