import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Feed from "@/views/Feed.vue";
import Profile from "@/views/Profile.vue";
import TweetDetails from "@/views/TweetDetails.vue";
import NotFound from "@/views/NotFound.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { requiresAuth: false },
    component: Home
  },
  {
    path: "/feed",
    name: "Feed",
    meta: { requiresAuth: true },
    component: Feed,
    beforeEnter: (to, from, next) => {
      window.scrollTo(0, 0);
      next();
    }
  },
  {
    path: "/explore",
    name: "Explore",
    meta: { requiresAuth: true },
    component: NotFound // TODO fix
  },
  {
    path: "/notifications",
    name: "Notifications",
    meta: { requiresAuth: true },
    component: NotFound // TODO fix
  },
  {
    path: "/messages",
    name: "Messages",
    meta: { requiresAuth: true },
    component: NotFound // TODO fix
  },
  {
    path: "/bookmarks",
    name: "Bookmarks",
    meta: { requiresAuth: true },
    component: NotFound // TODO fix
  },
  {
    path: "/:userSlug/lists",
    name: "Lists",
    meta: { requiresAuth: true },
    component: NotFound // TODO fix
  },
  {
    path: "/:userSlug",
    name: "Profile",
    meta: { requiresAuth: true },
    component: Profile,
    beforeEnter: (to, from, next) => {
      store.commit("clearProfileData");
      window.scrollTo(0, 0);
      next();
    }
  },
  {
    path: "/:userSlug/status/:tweetId",
    name: "TweetDetails",
    meta: { requiresAuth: true },
    component: TweetDetails
  },
  {
    path: "*",
    name: "NotFound",
    meta: { requiresAuth: false },
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log("TO", to);
  if (to.meta.requiresAuth == true) {
    if (store.getters.getIsAuthenticatedStatus) {
      next();
    } else {
      store.dispatch("checkAuthentication");
      let interval = setInterval(() => {
        if (store.getters.getIsAuthenticatedStatus) {
          clearInterval(interval);
          next();
        }
      }, 100);
    }
  } else {
    next();
  }
});

export default router;
