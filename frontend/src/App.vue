<template>
  <div id="app">
    <ul class="nav">
      <li>
        <router-link :to="{name: 'home'}" class="link">Home</router-link>
      </li>
      <li>
        <router-link :to="{name: 'cadastrar'}" class="link">Cadastrar</router-link>
      </li>
    </ul>
    <img alt="Vue logo" src="./assets/logo.png" />

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("retrieveForms");
    this.$store.dispatch("retrieveClientes");
  }
};
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

.nav {
  display: flex;
  list-style-type: none;
  margin-top: -60px;
  padding: 0;
  justify-content: flex-start;
  background-color: #333;
}

.nav li {
  display: inline;
  padding: 8px;
}

.link {
  color: white;
  text-decoration: none;
  font-size: 14px;
  text-transform: uppercase;
}

.nav li:hover {
  background-color: #111;
}
</style>
