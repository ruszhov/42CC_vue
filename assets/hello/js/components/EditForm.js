import Loader from "./Loader.js";
import ageValidator from "../validators/age_validator.js";
import "../validators/validators.min.js";
import "../bootstrap-datepicker.min.js";
const { required, email, minLength } = window.validators;
const mustBeCool = (value) => value.indexOf("cool") >= 0;
export default {
  name: "Home",
  template: `
    <div class="container">
      <h1>42 Coffee Cups Test Assignment #15</h1>
      <form id="main-form" enctype="multipart/form-data" @submit.prevent="submitHandler">
        <div class="row">
          <div class="column">
            <div class="main">
              <div class="form-group row">
                <label class="col-md-4 col-form-label">First Name:</label>
                <div class="col-md-8">
                  <input class="form-control" type="text" id="id_first_name" name="first_name" placeholder="First Name"
                    v-model.trim="contact.first_name"
                    :class="{'is-invalid': ($v.contact.first_name.$dirty && !$v.contact.first_name.required)}"
                    :disabled="disabled == true"
                    >
                  <div class="invalid-feedback"
                    v-if="($v.contact.first_name.$dirty && !$v.contact.first_name.required)"
                    >This field is required</div>
                </div>
              </div>
              <div class="form-group row">
                <label for="id_last_name" class="col-md-4 col-form-label">Last Name:</label>
                <div class="col-md-8">
                  <input class="form-control" type="text" id="id_last_name" name="last_name" placeholder="Last Name"
                    v-model.trim="contact.last_name"
                    :class="{'is-invalid': ($v.contact.last_name.$dirty && !$v.contact.last_name.required)}"
                    :disabled="disabled == true"
                    >
                  <div class="invalid-feedback"
                    v-if="($v.contact.last_name.$dirty && !$v.contact.last_name.required)"
                    >This field is required</div>
                </div>
              </div>
              <div class="form-group row">
                <label for="id_date_of_birth" class="col-md-4 col-form-label">Date of birth:</label>
                <div class="col-md-8">
                  <input class="form-control" type="text" id="id_date_of_birth" name="date_of_birth" placeholder="Date of birth"
                    v-model.trim="contact.date_of_birth"
                    v-on:focus="datepick_dialog_open"
                    :class="{'is-invalid': ($v.contact.date_of_birth.$dirty && !$v.contact.date_of_birth.required) || ($v.contact.date_of_birth.$dirty && !$v.contact.date_of_birth.ageValidator)}"
                    :disabled="disabled == true"
                    >
                  <div class="invalid-feedback"
                    v-if="($v.contact.date_of_birth.$dirty && !$v.contact.date_of_birth.required)"
                    >This field is required</div>
                  <div 
                    class="invalid-feedback"
                    v-else-if="($v.contact.date_of_birth.$dirty && !$v.contact.date_of_birth.ageValidator)"
                    >Age can"t be longer than 100 years!!!!</div>
                </div>
              </div>
              <div class="form-group row">
                <label for="id_photo" class="col-md-4 col-form-label">Photo:</label>
                <div class="col-md-8">                            
                  <input type="file" id="id_photo" name="photo"
                    @change="onFileSelected"
                    :disabled="disabled == true"
                    >
                </div>
              </div>
              <div v-if="contact.photo">
                <p>Photo:</p>
                <p><img id="img_id" :src="contact.photo" alt="s photo" width="200" height="200" /></p>
              </div>
              <p class="buttons-row">
              <div class="form-group row">
                <div class="col-sm-10">
                  <button type="submit" class="btn btn-primary">Save</button>
                  <a href="" class="btn btn-secondary">Cancel</a>
                </div>
              </div>
              </p>
            </div>
          </div>
          <div class="column">
            <div class="main">
              <div class="form-group row">
                <label for="id_email" class="col-md-4 col-form-label">Email:</label>
                <div class="col-md-8">
                  <input class="form-control" type="text" name="email" placeholder="Email"
                    v-model.trim="contact.email"
                    :class="{'is-invalid': ($v.contact.email.$dirty && !$v.contact.email.required)}"
                    :disabled="disabled == true"
                    >
                  <div class="invalid-feedback"
                    v-if="($v.contact.email.$dirty && !$v.contact.email.required)"
                    >This field is required</div>
                </div>
              </div>
              <div class="form-group row">
                <label for="id_skype" class="col-md-4 col-form-label">Skype:</label>
                <div class="col-md-8">                            
                  <input class="form-control" type="text" name="skype" placeholder="Skype"
                    v-model.trim="contact.skype"
                    :disabled="disabled == true"
                    >
                </div>
              </div>
              <div class="form-group row">
                <label for="id_jabber" class="col-md-4 col-form-label">Jabber:</label>
                <div class="col-md-8">
                  <input class="form-control" type="text" name="jubber" placeholder="Jabber"
                    v-model.trim="contact.jabber"
                    :class="{'is-invalid': ($v.contact.jabber.$dirty && !$v.contact.jabber.required) || ($v.contact.jabber.$dirty && !$v.contact.jabber.email)}"
                    :disabled="disabled == true"
                    >
                  <div class="invalid-feedback"
                    v-if="($v.contact.jabber.$dirty && !$v.contact.jabber.required)"
                    >This field is required</div>
                  <div 
                    class="invalid-feedback"
                    v-else-if="($v.contact.jabber.$dirty && !$v.contact.jabber.email)"
                    >This value can"t be used as Jabber account</div>
                </div>
              </div>
              <div class="form-group row">
                <label for="id_other_contacts" class="col-md-4 col-form-label">Other:</label>
                <div class="col-md-8">
                  <textarea class="form-control" name="other_contacts" id="id_other_contacts" cols="40" rows="10" placeholder="Other Contacts" 
                    :style="textareaStyle"
                    v-model.trim="contact.other_contacts"
                    :disabled="disabled == true"
                    ></textarea>
                </div>
              </div>
              <div class="form-group row">
                <label for="id_bio" class="col-md-4 col-form-label">Bio:</label>
                <div class="col-md-8 bio">
                  <textarea class="form-control" name="bio" id="" cols="40" rows="10" placeholder="Other Contacts" 
                    :style="textareaStyle"
                    v-model.trim="contact.bio"
                    :disabled="disabled == true"
                    ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <hr>
      <router-link to="/http_requests"> requests</router-link>
      <Loader v-if="loading"/>
    </div>
  `,
  data() {
    return {
      contact: "",
      loading: false,
      disabled: false,
      selectedFile: null,
      url: "/api/contacts/1/",
      textareaStyle: {
        height: "100px",
      },
      spinnerStyle: {
        height: "6rem !important",
        width: "6rem !important",
        position: "absolute",
        top: "40%",
        display: "none",
      },
    };
  },
  validations: {
    contact: {
      first_name: { required: required },
      last_name: { required: required },
      date_of_birth: { required: required, ageValidator: ageValidator },
      email: { required: required, email: email },
      jabber: { required: required, email: email },
    },
  },
  async mounted() {
    await axios.get(this.url).then((response) => {
      this.contact = response.data;
    });
    $("#id_date_of_birth").datepicker({
      uiLibrary: "bootstrap4",
      iconsLibrary: "fontawesome",
      locale: "en-en",
      format: "yyyy-mm-dd",
    });
  },
  methods: {
    datepick_dialog_open() {
      document.querySelector("#id_date_of_birth").click();
      this.contact.date_of_birth = document.querySelector(
        "#id_date_of_birth"
      ).value;
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.uploadImages(this.selectedFile);
    },
    uploadImages(input) {
      if (input) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const targetElement = document.querySelector("#img_id");
          targetElement.setAttribute("src", e.target.result);
          targetElement.setAttribute("width", 200);
          targetElement.setAttribute("height", 200);
        };
        reader.readAsDataURL(input);
      }
    },
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      let formData = new FormData();
      const fields = [
        "first_name",
        "last_name",
        "date_of_birth",
        "email",
        "skype",
        "jabber",
        "other_contacts",
        "bio",
      ];
      for (const i of fields) {
        formData.append(i, this.contact[i]);
      }
      if (this.selectedFile) {
        formData.append("photo", this.selectedFile, this.selectedFile.name);
      }

      try {
        const token = localStorage.getItem("user-token");
        if (token) {
          this.disabled = true;
          this.loading = true;
          await axios
            .put(this.url, formData, {
              headers: {
                Authorization: "Token " + token,
              },
            })
            .then((response) => {
              if (response) {
                this.loading = false;
                this.disabled = false;
              }
            });
        }
      } catch (e) {}
    },
  },
  components: {
    Loader,
  },
};
