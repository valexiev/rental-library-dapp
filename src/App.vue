<template>
  <body>
    <header>
      <b-navbar toggleable="md" type="light" variant="light" id="top-bar">
        <b-navbar-brand to="/">Rental Library</b-navbar-brand>

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <!-- <b-nav-item to="/books" exact>Books</b-nav-item> -->
            <b-nav-item to="/arbitrators" exact>Arbitrators</b-nav-item>
          </b-navbar-nav>

        </b-collapse>

      </b-navbar>
    </header>

    <router-view v-if="hasMM"></router-view>

    <div v-if="!hasMM">
      <p>Please, install <a href="https://metamask.io/" target="_blank">MetaMask</a> browser plugin to use this app.</p>
    </div>

    <footer></footer>

  </body>
</template>


<script>
export default {
  name: 'App',
  created() {
    if (typeof web3 !== 'undefined') {
      // web3 is available
      this.hasMM = true
    } else {
      // web3 is NOT available
      this.hasMM = false
      // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  },
  data() {
    return {
      hasMM: false,
    }
  },
}
</script>


<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap';

footer {
  padding: 50px;
}
</style>
