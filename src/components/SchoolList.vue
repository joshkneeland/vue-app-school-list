<template>
  <div class="school-list container-fluid">
    <div class="school-list-input-wrapper">
      <h1>Vue Example - Search Schools</h1>
      <p>
        <input v-model="schoolName" type="text" />
      </p>
      <b-button
        @click="searchSchools(schoolName)"
        variant="outline-primary"
        class="search-schools"
      >Search Schools</b-button>
      <ul>
        <li v-for="school of schoolMatches" :key="school.id">
          <p>Name: {{ school.schoolName }}</p>
          <p>State: {{ school.state }}</p>
          <p>Level: {{ school.schoolLevel }}</p>
          <p>Grades: {{ school.lowGrade }} - {{ school.highGrade }}</p>
        </li>
      </ul>
      <div v-if="displayError">
        <h3>Sorry, no schools were generated with this input. Please try again.</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse, AxiosError } from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import SchoolDiggerResponse from "./models/SchoolDiggerResponse.model";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

@Component
export default class SchoolList extends Vue {
  private schoolName = "";
  private schoolMatches: any[] = [];
  private displayError = false;

  private async searchSchools(
    schoolName: string
  ): Promise<AxiosResponse<SchoolDiggerResponse> | AxiosError> {
    try {
      const res: AxiosResponse<SchoolDiggerResponse> = await axios.get(
        `https://api.schooldigger.com/v1.2/autocomplete/schools?q=${schoolName}&appID=${process.env.VUE_APP_ID}&appKey=${process.env.VUE_APP_KEY}`
      );
      console.log("res: ", res);
      this.schoolMatches = res.data.schoolMatches;
      this.displayError = false;
      return res;
    } catch (e) {
      console.log("Error is: ", e);
      this.displayError = true;
      return e;
    }
  }
}
</script>

<style scoped lang="scss">
@import "~bootstrap";
@import "~bootstrap-vue";

h1,
input,
p,
ul {
  text-align: left;
  margin-top: 2rem;
}

h1 {
  padding-left: 40px;
  margin: 0;
  font-weight: normal;
}

h3 {
  font-weight: normal;
}

button.search-schools {
  text-align: center;
  display: block;
  width: 9rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-left: 2.5rem;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
}

input {
  display: inline-block;
  margin: 1rem 1rem 1rem 2.5rem;
  height: 2rem;
  width: 15rem;
  font-size: 1.25rem;
  padding-left: 0.25rem;
}

li {
  list-style: none;
  margin-bottom: 20px;
}

p {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
