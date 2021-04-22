<template>
  <div id="app">
    <title>Traveling Blog</title>
    <div>
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand href="#">Traveling</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/">Home</b-nav-item>
            <b-nav-item href='/Create'>Create Post</b-nav-item>
            <b-nav-item href="/Review">Assignment Review</b-nav-item>
            <b-nav-item v-if="user" @click="logout">Logout</b-nav-item>
            <b-nav-item v-else href="/Login">Login</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <div class='view'>
      <router-view />
    </div>


    <div class='footer'>
      <div class='direct-contact'>
        <h3>Contact Information</h3>
        <p>Phone: <a class='link' href='tel:7205324077'>(720) 532-4077</a></p>
        <p>Email: <a class='link' href='mailto:khckn1@gmail.com'>khckn1@gmail.com</a></p>
      </div>
      <div class='social-media'>
        <h3>Social Media</h3>
        <p>Twitter: <a class='link' href='https://twitter.com/MyRoyalKainess'>@myroyalkainess</a></p>
        <p>Instagram: <a class='link' href='https://www.instagram.com/myroyalkainess/'>@myroyalkainess</a></p>
      </div>
      <div class='right-box'>
        <div class='other-links'>
          <h3>Other Links</h3>
          <p><a class='link' href='https://github.com/khckn1/final'>Github</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    computed: {
      user() {
        return this.$root.$data.user;
      },
    },
    async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      console.log(error);
      this.$root.$data.user = null;
    }
  },
    methods: {
      async logout() {
        try {
          await axios.delete("/api/users");
          this.$root.$data.user = null;
        } catch (error) {
          this.$root.$data.user = null;
        }
      },
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
    background-color: #454545;
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

  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: #77966d;
    color: #222222;
  }

  .direct-contact, .social-media, .right-box {
    text-align: left;
    padding: 5px;
  }

  .link:visited, .link:link {
    color: #222222;
  }

  .navbar {
    background-color: #449dd1 !important;
  }

  .nav-link {
    color: #414141 !important;
    font-family: 'Noto Sans JP', sans-serif !important;
  }

  .navbar-brand {
    color: #414141 !important; /*dark grey*/
    font-family: "Satisfy", cursive !important;
  }
</style>
