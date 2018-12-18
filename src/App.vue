<template>
  <div id="app">
    <div>isSigned:{{isSigned}}</div>
    <div>user: <pre>{{firebaseUser}}</pre></div>
    <div>token: <pre>{{token}}</pre></div>
    <div>error: <pre>{{error}}</pre></div>

    <div id="nav">
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
    </div>

    <button @click="login">login</button>
    <button @click="logout">logout</button>
    <RouterView/>
  </div>
</template>

<script>
import auth from "./components/auth";

export default {
  data() {
    return {
      firebaseUser: null,
      isSigned: null,
      token: "",
      error: null
    };
  },
  created() {
    var self = this;

    console.log("created");

    auth.init();

    // Listening for auth state changes.
    // [START authstatelistener]
    auth.onAuthStateChanged(function() {
      console.log(
        "onAuthStateChanged",
        auth.currentUser.email,
        auth.isSigned()
      );
      self.firebaseUser = auth.currentUser.email;
      self.isSigned = auth.isSigned();
      self.token = auth.accessToken;
    });
  },
  methods: {
    login() {
      auth.signIn();
    },
    logout() {
      auth.signOut();
    }
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
