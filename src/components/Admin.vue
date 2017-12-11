<template>
  <div id="app">
    <div id="loginView" v-if="!this.authenticated">
      <b-modal v-model="showLogin" title="Login" :header-bg-variant="this.modalVariant"
      :no-close-on-backdrop="true" :no-close-on-esc="true" :cancel-disabled="true"
      :hide-header-close="true" :hide-footer="true" header-text-variant="light">
        <label class="label" title="username" for="username">Username</label>
        <p :class="{ 'control': true }">
          <b-form-input v-model="username" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('username')}" 
            name="username" type="text" placeholder="admin"></b-form-input>
          <small v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</small>
        </p>
        <label class="label" title="password" for="password">Password</label>
        <p :class="{ 'control': true }">
          <b-form-input v-model="password" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('password')}" 
            name="password" type="password" placeholder="admin"></b-form-input>
          <small v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</small>
        </p>
        </br>
        <b-btn class="mt-3" :variant="this.loginButtonVariant" 
          block @click="login">{{this.loginButtonText}}</b-btn>
      </b-modal>
    </div>
    <div id="adminView" v-else>
      <div class="loadingIcon" v-show="loading">
        <circle8></circle8>
      </div>
      <div v-show="!loading">
        <div class="navigation-buttons">
          <b-button :disabled="this.pageNumber == 1" v-on:click="decrement" size='lg' :variant="buttonStylePrev"> Previous </b-button>
          <b-button :disabled="this.noMorePages" v-on:click="increment" size='lg' :variant="buttonStyleNext"> Next </b-button>
        </div>
        <b-table striped hover :fields="fields" :items="currentPageResults">
          <template slot="index" scope="data">
            {{ (data.index + 1) + ((pageNumber - 1) * maxItemsPerPage)}}
          </template>
          <template slot="PhoneNumber" scope="data">
            {{ "(" + data.item.PhoneNumber.substring(0,3) + ") " 
                + data.item.PhoneNumber.substring(3,6) + "-" + data.item.PhoneNumber.substring(6,10)}}
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { Circle8 } from 'vue-loading-spinner';
import axios from 'axios';

Vue.use(VeeValidate);

export default {
  data() {
    return {
      username: '',
      password: '',
      pageNumber: 1,
      maxItemsPerPage: 25,
      // eslint-disable-next-line
      currentPageResults: new Array(),
      noMorePages: false,
      loading: false,
      authenticated: false,
      showLogin: true,
      accessDenied: false,
      networkError: false,
      fields: [
        'index',
        {
          key: 'Name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'PhoneNumber',
          label: 'Phone Number',
          sortable: false,
        },
        {
          key: 'EmailAddress',
          label: 'Email Address',
          sortable: true,
        },
        {
          key: 'Comapany',
          label: 'Company Name',
          sortable: true,
        },
        {
          key: 'EscortName',
          label: 'Escort Name',
          sortable: true,
        },
        {
          key: 'OfficialVisit',
          label: 'Official?',
          sortable: true,
        },
      ],
    };
  },
  components: {
    Circle8,
  },
  computed: {
    buttonStyleNext() {
      return !this.noMorePages ? 'primary' : 'danger';
    },
    buttonStylePrev() {
      return this.pageNumber > 1 ? 'primary' : 'danger';
    },
    modalVariant() {
      if (this.accessDenied) {
        return 'danger';
      }
      if (this.networkError) {
        return 'warning';
      }
      return 'info';
    },
    loginButtonVariant() {
      if (this.accessDenied) {
        return 'outline-danger';
      }
      if (this.networkError) {
        return 'outline-warning';
      }
      return 'outline-info';
    },
    loginButtonText() {
      if (this.accessDenied) {
        return 'Accessed Denied';
      }
      if (this.networkError) {
        return 'Network Error';
      }
      return 'Login';
    },
  },
  methods: {
    login() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          axios.post('http://localhost:3000/admin/login', {
            username: this.username,
            password: this.password,
          }).then((response) => {
            if (response.status === 200) {
              this.authenticated = true;
              this.showLogin = false;
            } else {
              this.accessDenied = true;
              window.setTimeout(() => {
                this.accessDenied = false;
              }, 1500);
            }
          }).catch((error) => {
            if (error) {
              // eslint-disable-next-line
              console.log('CAUGHT ERROR', error.response)
              this.networkError = true;
              window.setTimeout(() => {
                this.networkError = false;
              }, 1500);
            }
          });
        }
      });
    },
    increment() {
      this.pageNumber = this.pageNumber + 1;
      this.getPostData(this.pageNumber);
    },
    decrement() {
      this.pageNumber = this.pageNumber - 1;
      this.getPostData(this.pageNumber);
    },
    getPostData(pageNum) {
      this.loading = true;
      const apiPath = `http://localhost:3000/visitor/get/${pageNum - 1}/${this.maxItemsPerPage}`;
      axios.get(apiPath).then((response) => {
        const dataRetrieved = response.data;
        if (Object.keys(dataRetrieved).length <= 0) {
          this.noMorePages = true;
        } else {
          this.processResults(dataRetrieved);
          this.noMorePages = false;
        }
        this.loading = false;
      }).then((error) => {
        if (error) {
          // eslint-disable-next-line
          console.log('ERROR', error);
        }
      });
    },
    processResults(results) {
      // eslint-disable-next-line
      let cleanResults = new Array();
      for (let i = 0; i < results.length; i += 1) {
        const dataRow = {
          Name: results[i].name,
          PhoneNumber: `${results[i].telephone}`,
          EmailAddress: results[i].email,
          Comapany: results[i].company,
        };
        const dataStyle = {};
        if (results[i].escort && results[i].escortName !== '') {
          dataRow.EscortName = results[i].escortName;
        } else {
          dataRow.EscortName = 'N/A';
          dataStyle.EscortName = 'danger';
        }
        if (results[i].official) {
          dataRow.OfficialVisit = 'Yes';
          dataStyle.OfficialVisit = 'success';
        } else {
          dataRow.OfficialVisit = 'No';
          dataStyle.OfficialVisit = 'danger';
        }
        // eslint-disable-next-line
        dataRow._cellVariants = dataStyle;
        cleanResults.push(dataRow);
      }
      // eslint-disable-next-line
      console.log(cleanResults);
      this.currentPageResults = cleanResults;
    },
  },
  created() {
    this.getPostData(1);
  },
};
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
  margin: 50px;
}

.loadingIcon {
  position: fixed;
  top: 50%;
  left: 50%;
}

.label {
  font-weight: bold;
  font-size: 20px;
}

.navigation-buttons {
  padding-bottom: 20px;
}

.is-danger {
  border-color: red;
  color: red;
  font-weight: bold;
}
</style>