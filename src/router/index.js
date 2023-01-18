import { createRouter, createWebHistory } from "vue-router";
import ProductTable from "../views/ProductTable.vue";

const routes = [
  {
    path: "/",
    name: "product",
    component: ProductTable,
  },
  {
    path: "/product_details",
    name: "product_details",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductForm.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
