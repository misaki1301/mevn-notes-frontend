<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h4>{{url}}</h4>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed: {
      url() {
        console.log("URL", process.env.VUE_APP_API_URL)
        return process.env.VUE_APP_API_URL
      }
    }
}
</script>
