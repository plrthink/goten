<template>
  <div class="hello">
    <div v-if="!loaded">
      <h1>Loading...</h1>
    </div>
    <ul v-else>
      <li v-for="user in users">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      loaded: false,
      users: []
    }
  },
  mounted () {
    const URL = '/api/v1/users'

    window.fetch(URL)
    .then(res => res.json())
    .then(users => {
      this.users = users
      this.loaded = true
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
