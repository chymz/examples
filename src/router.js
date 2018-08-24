import Router from "vue-router";

export default () => {
  return new Router({
    mode: process.ssr ? "history" : "hash",
    routes: [
      {
        path: "/",
        name: "home",
        component: () => import("./views/Home.vue")
      },
      {
        path: "/login",
        name: "login",
        component: () => import("./views/Login.vue")
      },
      {
        path: "/private",
        component: () => import("./views/PrivateLayout.vue"),
        children: [
          {
            path: "",
            name: "private.onHttpRequest",
            component: () => import("./views/OnHttpRequest.vue")
          },
          {
            path: "middleware",
            name: "private.middleware",
            component: () => import("./views/Middleware.vue")
          },
          {
            path: "async-data",
            name: "private.asyncData",
            component: () => import("./views/AsyncData.vue")
          }
        ]
      }
    ]
  });
};
