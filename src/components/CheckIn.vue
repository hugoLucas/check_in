<template>
  <div id="app">
    <h1>Registration</h1>
    <b-form @submit.prevent="validateBeforeSubmit">
      <label class="label" v-b-popover.hover="'Tell us your name.'" title="Name" for="name">Name</label>
      <p :class="{ 'control': true }">
        <b-form-input v-model="name" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('name') && formSubmitted}" name="name" type="text" placeholder="Max Plank"></b-form-input>
        <small v-show="errors.has('name') && formSubmitted" class="help is-danger">{{ errors.first('name') }}</small>
      </p>
      <label class="label" v-b-popover.hover="'Let us know the which email address is best to reach you.'" title="Email" for="email">Email</label>
      <p :class="{ 'control': true }">
        <b-form-input v-model="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') && formSubmitted}" name="email" type="text" placeholder="max@lambda.com"></b-form-input>
        <small v-show="errors.has('email') && formSubmitted" class="help is-danger">{{ errors.first('email') }}</small>
      </p>
      <label class="label" v-b-popover.hover="'Enter a number where we can reach you.'" title="Phone Number">Phone Number</label>
      <p :class="{ 'control': true }">
        <b-form-input name="phone" v-model="phone" v-validate="'required|numeric|digits:10'" :class="{'input': true, 'is-danger': errors.has('phone') && formSubmitted}" type="text" placeholder="(105) 457-1800"></b-form-input>
        <small v-show="errors.has('phone') && formSubmitted" class="help is-danger">{{ errors.first('phone') }}</small>
      </p>
      <label class="label" v-b-popover.hover="'Enter the name of your current employer.'" title="Company">Company Name</label>
      <p :class="{ 'control': true }">
        <b-form-input name="company" v-model="company" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('company') && formSubmitted}" type="text" placeholder="University of Kiel"></b-form-input>
        <small v-show="errors.has('company') && formSubmitted" class="help is-danger">{{ errors.first('company') }}</small>
      </p>

      <div class="radios">
        <label class="label" v-b-popover.hover="'Is your visit with us on behalf of your employer?'" title="Official Visit?">Business or Pleasure?</label>
        </br>
        <b-form-radio-group v-model="selectedVisit" buttons button-variant="info" name="visitButtons" :options="this.optionsVisit"> </b-form-radio-group>
        </br>

        <label class="label" v-b-popover.hover="'Are you in need of an escort during your time with us?'" title="Escort Services">Are you in need of an escort?</label>
        </br>
        <b-form-radio-group v-model="selectedEscort" buttons button-variant="info" name="escortButtons" :options="this.optionsEscort"> </b-form-radio-group>
        <div class='escortInfo' v-show="selectedEscort == 'true'">
          <label class="label" v-b-popover.hover="'Please enter the name of your desired escort.'" title="escortName">Escort Name</label>
          <b-form-input name="escortName" v-model="escortName" v-validate="this.escortRules" :class="{'input': true, 'is-danger': errors.has('escortName') && this.stringToBoolean(this.selectedEscort) && formSubmitted}" type="text" placeholder="Gustav Ludwig Hertz"></b-form-input>
          <small v-show="errors.has('escortName') && formSubmitted" class="help is-danger">{{ errors.first('escortName') }}</small>
        </div>
      </div>

      <b-button type="submit" variant="primary" size="lg">Submit</b-button>

      <b-modal v-model="showErrorAlert" title="Alert" header-bg-variant="warning" header-text-variant="light">
        <p class="my-4">Please correct the errors in you submission.</p>
        <div slot="modal-footer" class="w-100">
          <b-btn size="sm" class="float-right" variant="primary" @click="showErrorAlert=false"> Ok </b-btn>
        </div>
      </b-modal>

      <b-modal v-model="showSuccessAlert" title="Alert" header-bg-variant="success" header-text-variant="light">
        <p class="my-4">Thank you for your submission.</p>
        <div slot="modal-footer" class="w-100">
          <b-btn size="sm" class="float-right" variant="primary" @click="showSuccessAlert=false"> Ok </b-btn>
        </div>
      </b-modal>

      <b-modal v-model="showNetworkErrorAlert" title="Network Error" header-bg-variant="danger" header-text-variant="light">
        <p class="my-4">Your submission did not go through, please try again.</p>
        <div slot="modal-footer" class="w-100">
          <b-btn size="sm" class="float-right" variant="primary" @click="showNetworkErrorAlert=false"> Ok </b-btn>
        </div>
      </b-modal>

    </b-form>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

export default {
  data() {
    return {
      showErrorAlert: false,
      showSuccessAlert: false,
      showNetworkErrorAlert: false,
      email: '',
      name: '',
      company: '',
      phone: '',
      formSubmitted: false,
      selectedVisit: 'false',
      optionsVisit: [
        { text: 'Personal Visit', value: 'false' },
        { text: 'Offical Visit', value: 'true' },
      ],
      selectedEscort: 'false',
      optionsEscort: [
        { text: 'No', value: 'false' },
        { text: 'Yes', value: 'true' },
      ],
      escortName: '',
    };
  },
  computer: {
    escortRules() {
      return this.selectedEscort === 'true' ? 'required|alpha-spaces' : '';
    },
  },
  methods: {
    validateBeforeSubmit() {
      this.formSubmitted = true;
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.submitForm();
          return;
        }
        this.showAlert = true;
      });
    },
    submitForm() {
      const officialVisit = this.stringToBoolean(this.selectedVisit);
      const inNeedOfEscort = this.stringToBoolean(this.selectedEscort);
      const newInfo = {
        name: this.name,
        email: this.email,
        telephone: this.phone,
        company: this.company,
        official: officialVisit,
        escort: inNeedOfEscort,
      };
      if (inNeedOfEscort) {
        newInfo.escortName = this.escortName;
      } else {
        newInfo.escortName = '';
      }
      axios.post('/backend/visitor/add', newInfo).then((response) => {
        if (response.data.result === 'OK') {
          this.showSuccessAlert = true;
          this.clearForm();
        } else {
          this.showNetworkErrorAlert = true;
        }
      }).catch((error) => {
        if (error) {
          // eslint-disable-next-line
          console.log('CAUGHT ERROR', error.response)
          this.showNetworkErrorAlert = true;
        }
      });
    },
    clearForm() {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.company = '';
      this.selectedVisit = 'false';
      this.selectedEscort = 'false';
      this.escortName = 'true';
      this.formSubmitted = false;
    },
    stringToBoolean(str) {
      return str === 'true';
    },
  },
};
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
  padding-top: 40px;
  padding-left: 70px;
  padding-right: 70px;
}

.label {
  /* font-weight: bold; */
  color: navy;
  font-size: 20px;  
  font-family: 'Trebuchet MS';
}

.input {
  border-color: lightblue;
}

.radios {
  padding-top: 20px;
  padding-bottom: 20px;
}

.container {
  width: 500px;
}

b-form {
  width: 480;
}

h1 {
  color: navy;
  text-align: center;
  font-family: 'Trebuchet MS';
}

img {
  text-align: center
}

.submitted {
  color: #4fc08d;
}

.is-danger {
  border-color: red;
  color: red;
  font-weight: bold;
  font-family: 'Trebuchet MS';

}
</style>