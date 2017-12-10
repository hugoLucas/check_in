<template>
  <div id="app">
    <div class="loadingIcon" v-show="loading">
      <circle8></circle8>
    </div>
    <div v-show="!loading">
      <div class="navigation-buttons">
        <b-button :disabled="this.pageNumber == 1" v-on:click="decrement" size='lg' variant="primary"> Previous </b-button>
        <b-button :disabled="this.noMorePages" v-on:click="increment" size='lg' variant="primary"> Next </b-button>
      </div>
      <!-- <h3>{{ this.currentPageResults}}</h3> -->
      <b-table striped hover :items="currentPageResults"></b-table>
    </div>
    <div v-show="noMorePages">
      <h1>End of the Line!</h1>
    </div>
  </div>
</template>

<script>
import { Circle8 } from 'vue-loading-spinner';
import axios from 'axios';


export default {
  data() {
    return {
      pageNumber: 1,
      maxItemsPerPage: 10,
      currentPageResults: new Array(),
      columns: ['Name', 'PhoneNumber', 'EmailAddress', 'Comapany', 'EscortName', 'OfficialVisit'],
      noMorePages: false,
      loading: false,
    };
  },
  components: {
    Circle8,
  },
  methods: {
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
          this.currentPageResults = null;
        } else {
          this.processResults(dataRetrieved);
          this.noMorePages = false;
        }
        this.loading = false;
      }).then((error) => {
        if (error) {
          console.log('ERROR', error);
        }
      });
    },
    processResults(results) {
      let cleanResults = new Array();
      for (let i = 0; i < results.length; i += 1) {
        const dataRow = {
          Name: results[i].name,
          PhoneNumber: results[i].telephone,
          EmailAddress: results[i].email,
          Comapany: results[i].company,
        };
        if (results[i].escort) {
          dataRow.EscortName = results[i].escortName;
        } else {
          dataRow.EscortName = 'N/A';
        }
        if (results[i].official) {
          dataRow.OfficialVisit = 'Yes';
        } else {
          dataRow.OfficialVisit = 'No';
        }
        cleanResults.push(dataRow);
      }
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
</style>