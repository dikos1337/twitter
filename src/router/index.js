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
    component: Home
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
    beforeEnter: (to, from, next) => {
      window.scrollTo(0, 0);
      next();
    }
  },
  {
    path: "/explore",
    name: "Explore",
    component: NotFound // TODO fix
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: NotFound // TODO fix
  },
  {
    path: "/messages",
    name: "Messages",
    component: NotFound // TODO fix
  },
  {
    path: "/bookmarks",
    name: "Bookmarks",
    component: NotFound // TODO fix
  },
  {
    path: "/:userSlug/lists",
    name: "Lists",
    component: NotFound // TODO fix
  },
  {
    path: "/:userSlug",
    name: "Profile",
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
    component: TweetDetails
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
