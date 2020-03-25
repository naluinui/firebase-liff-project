<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted () {
    const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "")
    const params = new URLSearchParams(queryString)
    const pollId = params.get('poll')
    console.log(queryString)
    console.log(pollId)
    if (pollId) {
      this.$router.push(`/poll/${pollId}`)
    }
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
