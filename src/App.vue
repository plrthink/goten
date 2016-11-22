<template>
  <div id="app">
    <users :users="users"></users>
  </div>
</template>

<script>
import Users from './components/Users'
import Promise from 'es6-promise'
Promise.polyfill()
import fetch from 'isomorphic-fetch'

const URL = 'http://localhost:5000/api/v1/users'

export default {
  name: 'app',
  components: {
    Users
  },
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.getInitialUsers()
  },
  methods: {
    getInitialUsers () {
      return fetch(URL)
      .then(res => res.json())
      .then(users => {
        this.users = users
        return Promise.resolve()
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
