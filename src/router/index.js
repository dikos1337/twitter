import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Feed from "@/views/Feed.vue";
import Profile from "@/views/Profile.vue";
import TweetDetails from "@/views/TweetDetails.vue";
import NotFound from "@/views/NotFound.vue";

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
    component: Feed
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
    path: "/:profileUrl/lists",
    name: "Lists",
    component: NotFound // TODO fix
  },
  {
    path: "/:profileUrl",
    name: "Profile",
    component: Profile
  },
  {
    path: "/:profileUrl/status/:tweetId",
    name: "TweetDetails",
    component: TweetDetails
  },
  {
    path: "*",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
