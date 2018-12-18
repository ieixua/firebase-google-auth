import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Error404 from "./views/Error404.vue";
// import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home /* ,
      meta: {
        requiresAuth: true
      } */
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "*",
      name: "error404",
      component: Error404,
      meta: {
        requiresAuth: false
      }
    }
  ]
});

// Nav Guard
/* 
router.beforeEach((to, from, next) => {
  console.log("beforeEach", to, from, next);

  next();

  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
}); */

export default router;
