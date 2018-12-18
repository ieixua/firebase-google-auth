"use strict";

import Vue from "vue";
import firebase from "firebase";
import "firebase";
import authDefaultConfig from "./authDefaultConfig";

/**
 * Ofrece los métodos mismos métodos para acceder a la autenticación independientemente del servidor a que acceda
 * Desacopla el código del framework y de la aplicaciones de cómo se accede al proveedor de autorización
 * @type {Object}
 */

const auth = new Vue({
  // (se crea como componente Vue para que tenga acceso a toda la funcionalidad del framework,
  // p.e. $mdApp.utils, $log...), y también para aprovechar las facilidades de vue a la hora
  // de propiedades reactivas, computed, métodos y eso
  data: {
    accessToken: null,
    config: null
  },
  computed: {
    currentUser() {
      return firebase.auth().currentUser;
    }
  },
  methods: {
    init(newConfig) {
      this.config = newConfig;

      if (!this.config) {
        this.config = authDefaultConfig;
      }

      firebase.initializeApp(this.config).auth();

      var self = this;

      if (!this.isSigned()) {
        firebase
          .auth()
          .getRedirectResult()
          .then(function(result) {
            if (result.credential) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              self.accessToken = result.credential.accessToken;
            }
          })
          .catch(function(error) {
            // Handle Errors here.
            self.error = error;
          });
      } else {
        console.log(
          "created:",
          this.currentUser.email,
          this.isSigned(),
          this.accessToken
        );
      }
    },
    getRedirectResult() {
      return firebase.auth().getRedirectResult();
    },
    isSigned() {
      return !!firebase.auth().currentUser;
    },
    onAuthStateChanged(callback) {
      return firebase.auth().onAuthStateChanged(callback);
    },
    signIn() {
      var fbProvider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(fbProvider);
    },
    signOut() {
      firebase.auth().signOut();
    }
  }
});

export default auth;
