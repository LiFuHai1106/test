<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <pipeline></pipeline>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import pipeline from "./components/Pipeline/index.vue";

@Component({
  components: {
    pipeline,
  },
})
export default class extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
