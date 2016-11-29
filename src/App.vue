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
import queryString from 'query-string'

const URL = '/api/v1/users'

export default {
  name: 'app',
  components: {
    Users
  },
  data () {
    return {
      users: this.$options.store.users
    }
  },
  mounted () {
    this.getUsers(1, 1)
  },
  methods: {
    getUsers (offset, limit) {
      var params = queryString.stringify({
        offset,
        limit
      })
      return fetch(`${URL}?${params}`)
      .then(res => res.json())
      .then(users => {
        this.users = this.users.concat(users)
        return users
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
