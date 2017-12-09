<template>
  <div id="app">
    <h1>Registration</h1>
    <b-form @submit.prevent="validateBeforeSubmit">
      <div class="column is-8">
        <label class="label" v-b-popover.hover="'Tell us your name.'" title="Name" for="name">Name</label>
        <p :class="{ 'control': true }">
          <b-form-input v-model="name" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('name') }" name="name" type="text" placeholder="Max Plank"></b-form-input>
          <small v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</small>
        </p>
      </div>
      <div class="column is-8">
        <label class="label" v-b-popover.hover="'Let us know the which email address is best to reach you.'" title="Email" for="email">Email</label>
        <p :class="{ 'control': true }">
          <b-form-input v-model="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="max@lambda.com"></b-form-input>
          <small v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</small>
        </p>
      </div>
      <div class="column is-8">
        <label class="label" v-b-popover.hover="'Enter a number where we can reach you.'" title="Phone Number">Phone Number</label>
        <p :class="{ 'control': true }">
          <b-form-input name="phone" v-model="phone" v-validate="'required|numeric|max:10'" :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="(105) 457-1800"></b-form-input>
          <small v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</small>
        </p>
      </div>
      <div class="column is-8">
        <label class="label" v-b-popover.hover="'Enter the name of your current employer.'" title="Company">Company Name</label>
        <p :class="{ 'control': true }">
          <b-form-input name="company" v-model="company" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('company') }" type="text" placeholder="University of Kiel"></b-form-input>
          <small v-show="errors.has('company')" class="help is-danger">{{ errors.first('company') }}</small>
        </p>
      </div>

      <div class="radios">
        <label class="label" v-b-popover.hover="'Is your visit with us on behalf of your employer?'" title="Official Visit?">Business or Pleasure?</label>
        </br>
        <b-form-radio-group v-model="selectedVisit" buttons button-variant="info" name="visitButtons" :options="this.optionsVisit"> </b-form-radio-group>
        </br>

        <label class="label" v-b-popover.hover="'Are you in need of an escort during your time with us?'" title="Escort Services">Are you in need of an escort?</label>
        </br>
        <b-form-radio-group v-model="selectedEscort" buttons button-variant="info" name="escortButtons" :options="this.optionsEscort"> </b-form-radio-group>
        <b-form-input v-show="selectedEscort == 'true'" name="escortName" v-model="escortName" v-validate="'alpha'" :class="{'input': true, 'is-danger': errors.has('escortName') }" type="text" placeholder="Gustav Ludwig Hertz"></b-form-input>
      </div>

      <b-button type="submit" variant="primary" size="lg">Submit</b-button>

      <b-modal v-model="showAlert" title="Alert" header-bg-variant="danger" header-text-variant="light">
        <p class="my-4">Please correct the errors in you submission!</p>
        <div slot="modal-footer" class="w-100">
          <b-btn size="sm" class="float-right" variant="primary" @click="showAlert=false"> Ok </b-btn>
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
      showAlert: false,
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
      pageError: null,
      pageResponse: null,
    };
  },
  methods: {
    validateBeforeSubmit() {
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
      axios.post('http://localhost:3000/visitor/add', newInfo).then((response) => {
        if (response.status == 200) {
          alert('Thank you!');
        } else {
          alert('Problem :(');
        }
      }).then((error) => {
        this.pageError = error;
      });
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
  padding: 50px;
}

.label {
  font-weight: bold;
  font-size: 20px;
}

.radios {
  padding-top: 20px;
  padding-bottom: 20px;
}

.container {
  width: 500px;
}

h1 {
  text-align: center
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
}
</style>