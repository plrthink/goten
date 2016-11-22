import Vue from 'vue'
import App from './App'
const app = new Vue(App)

// the default export should be a function
// which will receive the context of the render call
export default function (context) {
  // data pre-fetching
  if (context.url === '/') {
    if (app.getInitialUsers) {
      return app.getInitialUsers()
        .then(() => {
          return app
        })
    }
  }
}
