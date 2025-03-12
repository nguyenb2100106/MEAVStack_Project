import { createWebHistory, createRouter } from "vue-router";
import { isAuthenticated } from "@/utils/auth";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/login/user",
    name: "loginuser",
    component: () => import("@/views/UserLogin.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/bookuser",
    name: "bookuser",
    component: () => import("@/views/BookUser.vue"),
  },

  {
    path: "/bookborrow",
    name: "bookborrow",
    component: () => import("@/views/BookBorrowView.vue"),
  },

  {
    path: "/bookborrow/add",
    name: "bookborrow.add",
    component: () => import("@/views/BookBorrowAdd.vue"),
  },

  {
    path: "/bookborrow/edit/:id",
    name: "bookborrow.edit",
    component: () => import("@/views/BookBorrowEdit.vue"),
    props: true,
  },

  {
    path: "/staff",
    name: "staffs",
    component: () => import("@/views/StaffView.vue"),
  },

  {
    path: "/staff/add",
    name: "staff.add",
    component: () => import("@/views/StaffAdd.vue"),
  },

  {
    path: "/staff/edit/:id",
    name: "staff.edit",
    component: () => import("@/views/StaffEdit.vue"),
    props: true,
  },

  {
    path: "/book",
    name: "books",
    component: () => import("@/views/BookView.vue"),
  },

  {
    path: "/book/add",
    name: "book.add",
    component: () => import("@/views/BookAdd.vue"),
  },

  {
    path: "/book/edit/:id",
    name: "book.edit",
    component: () => import("@/views/BookEdit.vue"),
    props: true,
  },

  {
    path: "/publisher",
    name: "publishers",
    component: () => import("@/views/PublisherView.vue"),
  },

  {
    path: "/publisher/add",
    name: "publisher.add",
    component: () => import("@/views/PublisherAdd.vue"),
  },

  {
    path: "/publisher/edit/:id",
    name: "publisher.edit",
    component: () => import("@/views/PublisherEdit.vue"),
    props: true,
  },

  {
    path: "/user",
    name: "users",
    component: () => import("@/views/UserView.vue"),
  },

  {
    path: "/user/add",
    name: "user.add",
    component: () => import("@/views/UserAdd.vue"),
  },

  {
    path: "/user/edit/:id",
    name: "user.edit",
    component: () => import("@/views/UserEdit.vue"),
    props: true,
  },

  {
    path: "/bookPendingBorrow",
    name: "bookPendingBorrow",
    component: () => import("@/views/BookPendingBorrow.vue"),
  },

  {
    path: "/checkingBorrow",
    name: "checkingBorrow",
    component: () => import("@/views/CheckingBorrow.vue"),
  },

  {
    path: "/info",
    name: "info",
    component: () => import("@/views/UserInfo.vue"),
  },

  {
    path: "/info/:id",
    name: "editinfo",
    component: () => import("@/views/EditUserInfo.vue"),
    props: true,
  },

  {
    path: "/notfound",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
