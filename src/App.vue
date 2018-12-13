<template>
  <div id="app">
    <div><pre>{{$data}}</pre></div>

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
import firebase from "firebase";
import "firebase";
import dataAccessConfig from "./components/dataAccessConfig";

export default {
  data() {
    return {
      firebaseUser: null,
      token: "",
      error: null
    };
  },
  created() {
    var self = this;

    if (!firebase.currentUser) {
      firebase.initializeApp(dataAccessConfig);

      firebase
        .auth()
        .getRedirectResult()
        .then(function(result) {
          if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            self.token = result.credential.accessToken;
          }
        })
        .catch(function(error) {
          // Handle Errors here.
          self.error = error;
        });
    } else {
      firebase.initializeApp(dataAccessConfig);
      this.firebaseUser = firebase.auth().currentUser;
    }

    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function() {
      self.firebaseUser = firebase.auth().currentUser;
    });
  },
  methods: {
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    logout() {
      firebase.auth().signOut();
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
