export default {
  name: "Home",
  template: `
    <div class="container">
      <h1>42 Coffee Cups Test Assignment #15</h1>
      <div class="edit-block">
        <router-link to="/edit_form">Edit</router-link>
        <a href="#" v-on:click="getAdminUrl">(admin)</a>
      </div>
      <div class="row">
        <div class="column">
          <p>Personal Data</p>
          <p>First Name: {{contact.first_name}}</p>
          <p>Last Name: {{contact.last_name}}</p>
          <p>Date of birth: {{contact.date_of_birth | formatDate}}</p>
          <p>Age: {{contact.age}}</p>
          <div v-if="contact.photo">
            <p>Photo:</p>
            <p><img :src="contact.photo" alt="s photo" width="200" height="200" /></p>
          </div>
        </div>
        <div class="column">
          <p>Contacts:</p>
          <p>email: {{contact.email}}</p>
          <p>Skype: {{contact.skype}}</p>
          <p>Jabber: {{contact.jabber}}</p>
          <p class="other">Other contacts: {{contact.other_contacts}}</p>
          <p class="bio">Bio: {{contact.bio}}</p>
        </div>
      </div>
      <hr>
      <router-link to="/http_requests"> requests</router-link>
    </div>
  `,
  data() {
    return {
      contact: {},
    };
  },
  methods: {
    async getAdminUrl(event) {
      await axios.get("/admin_url/").then(function (response) {
        window.location.replace(
          window.location.origin + response.data.adminUrl
        );
      });
    },
  },
  async mounted() {
    await axios.get("/api/contacts/1/").then((response) => {
      this.contact = response.data;
    });
  },
};
