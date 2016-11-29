import Vue from 'vue'
import App from './App.vue'

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
export default function createApp (initialState) {
  const app = new Vue(Vue.util.extend({
    store: initialState
  }, App))

  return app
}
