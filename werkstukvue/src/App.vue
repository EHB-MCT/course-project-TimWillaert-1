<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Vue Werkstuk"/> -->
    <VR/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import VR from './components/VR.vue'

export default {
  name: 'App',
  components: {
    VR
  }
}
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
