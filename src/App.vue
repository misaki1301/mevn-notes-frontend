<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="/">JWT Notes</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{name: 'Home'}" exact exact-active-class="active">Home</b-nav-item>
          <b-nav-item :to="{name: 'About'}" exact exact-active-class="active">About</b-nav-item>
          <b-nav-item :to="{name: 'Notes'}" v-if="isActive" exact exact-active-class="active">Notes</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="user.data.name" v-if="isActive">
            <b-dropdown-item :to="{name:'Profile'}" exact exact-active-class="active">My Profile</b-dropdown-item>
            <b-dropdown-item @click="logOut">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="!isActive" :to="{name: 'Login'}" exact exact-active-class="active">Sign In</b-nav-item>
          <!--<b-nav-item v-if="isActive" @click="logOut">Log Out</b-nav-item>-->

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState} from "vuex";
  export default {
    methods: {
      ...mapActions(['logOut', "readToken"])
    },
    computed: {
      ...mapGetters(['isActive']),
      ...mapState(['user'])
    },
    created() {
      console.log("event triggered readToken")
      this.readToken();
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
}
</style>
