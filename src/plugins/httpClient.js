import Vue from "vue";
import axios from "axios";

/**
 * Create an Axios instance
 */
const httpClient = axios.create();

/**
 * On server side specify the base URL
 */
if (!process.client) {
  httpClient.defaults.baseURL = "http://localhost:8080";
}

/**
 * Add this client to all components
 */
export const $http = {
  // Simple variable to store current token
  token: null,

  /**
   * Login
   */
  login(name) {
    return httpClient.post("/api/login", { name }).then(response => {
      // Store token in memory
      this.token = response.data.token;

      // On client side: store token in cookie
      if (process.client) {
        const Cookies = require("js-cookie");
        Cookies.set("token", this.token, { path: "" });
      }

      return response;
    });
  },

  /**
   * Simple function to return current user with a token
   */
  me() {
    return httpClient.get("/api/me", {
      headers: {
        // Add JWT to headers
        Authorization: `Bearer ${this.token}`
      }
    });
  },

  /**
   * Fetch protected data
   */
  private() {
    return httpClient.get("/api/private", {
      headers: {
        // Add JWT to headers
        Authorization: `Bearer ${this.token}`
      }
    });
  },

  /**
   * Logout
   */
  logout() {
    // On client side: remove cookie with token
    require("js-cookie").set("token", "", { path: "" });
    this.token = null;
  }
};

Vue.prototype.$http = $http;

/**
 * At boot time try to get token from cookies
 */
export default async ({ ctx, store, redirect }) => {
  // On server side
  if (!process.client) {
    if (ctx.cookie) {
      $http.token = ctx.cookie.token;
      await store.commit("setToken", $http.token);
    }
    // On client side
  } else {
    const Cookies = require("js-cookie");
    $http.token = Cookies.get("token") || "";
    await store.commit("setToken", $http.token);
  }

  /**
   * Interceptors
   */
  httpClient.interceptors.response.use(
    function(response) {
      // Do something with response data
      return response;
    },
    function(error) {
      if (error.response && error.response.status == 401) {
        $http.token = null;
        store.commit("setToken", null);
        store.commit("setUser", null);

        redirect("/login");
      }
      return Promise.reject(error);
    }
  );
};
