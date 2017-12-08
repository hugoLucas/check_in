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
        <b-form-input v-show="selectedEscort == 'true'" name="escortName" v-model="escortName" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('escortName') }" type="text" placeholder="Gustav Ludwig Hertz"></b-form-input>
      </div>

      <b-button type="submit" variant="primary" size="lg">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

export default {
  data() {
    return {
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
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          alert('From Submitted!');
          return;
        }

        alert('Correct them errors!');
      });
    },
    submitForm() {
      const data = {
        name: this.name,
        email: this.email,
        company: this.company,
        phone: this.phone,
        escort: this.selectedEscort,
        escortName: this.escortName,
        visit: this.selectedVisit,
      };
      console.log(data);
      alert('Hello!');
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