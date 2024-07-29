const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      group: "grid",
      isLogin: true,
      icon: "mdi-monitor-dashboard",
    },
    component: () => import("../views/login/"),
  },
  {
    path: "/",
    name: "main",
    meta: {
      group: "grid",
      icon: "mdi-monitor-dashboard",
    },
    component: () => import("../views/main/"),
  },
  {
    path: "/my-command",
    name: "my_command",
    meta: {
      group: "grid",
      icon: "mdi-monitor-dashboard",
    },
    component: () => import("../views/myCommand/"),
  },
  {
    path: "/statistics",
    name: "statistics",
    meta: {
      group: "grid",
      icon: "mdi-monitor-dashboard",
    },
    component: () => import("../views/statistics/"),
  },
  {
    path: "/active-streams",
    name: "active_streams",
    meta: {
      group: "grid",
      icon: "mdi-monitor-dashboard",
    },
    component: () => import("../views/activeStreams/"),
    redirect: "/active-streams/all",
    children: [
      {
        path: "all",
        name: "active_streams_all",
        component: () => import("../views/activeStreams/All"),
        meta: {},
      },
      {
        path: ":id",
        name: "active_streams_stream",
        component: () => import("../views/activeStreams/Stream"),
        meta: {},
      },
    ],
  },
  {
    path: "/my-streams",
    name: "my_streams",
    meta: {
      group: "grid",
      icon: "mdi-monitor-dashboard",
    },
    component: () => import("../views/myStreams/"),
    redirect: "/my-streams/all",
    children: [
      {
        path: "all",
        name: "my_streams_all",
        component: () => import("../views/myStreams/All"),
        meta: {},
      },
      {
        path: ":id",
        name: "my_streams_stream",
        component: () => import("../views/myStreams/Stream"),
        meta: {},
      },
    ],
  },
  {
    path: "/offers",
    name: "offers",
    meta: {
      group: "grid",
      icon: "mdi-monitor-dashboard",
    },
    component: () => import("../views/offers/"),
    redirect: "/offers/all",
    children: [
      {
        path: "all",
        name: "offers_all",
        component: () => import("../views/offers/All"),
        meta: {},
      },
      {
        path: ":id",
        name: "offers_offer",
        component: () => import("../views/offers/Offer"),
        meta: {},
      },
    ],
  },
  {
    path: "/add-offers",
    name: "add_offers",
    meta: {
      group: "grid",
      icon: "mdi-monitor-dashboard",
    },
    component: () => import("../views/addOffers/"),
    redirect: "/add-offers/all",
    children: [
      {
        path: "all",
        name: "add_offers_all",
        component: () => import("../views/addOffers/All"),
        meta: {},
      },
      {
        path: ":id",
        name: "add_offers_offer",
        component: () => import("../views/addOffers/Offer"),
        meta: {},
      },
    ],
  },
]

export default {
  get: function () {
    return routes
      .filter((x) => {
        let width = document.querySelector("html").clientWidth
        if (x.meta && x.meta.maxDisplay)
          switch (x.meta.maxDisplay) {
            case "xs":
              return width <= 600
            case "sm":
              return width <= 960
            case "md":
              return width <= 1264
            case "lg":
              return width <= 1904
          }
        else if (x.meta.minDisplay)
          switch (x.meta.minDisplay) {
            case "sm":
              return width > 600
            case "md":
              return width > 960
            case "lg":
              return width > 1264
          }
        return true
      })
      .map((x) => {
        if (x.children && x.children.length) {
          x.meta.children = x.children.filter((x) => !x.redirect)
        }
        return x
      })
  },
  pre: () => routes,
}
