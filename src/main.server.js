import createApp from './app'

const initialState = {
  users: []
}

const app = createApp(initialState)

// the default export should be a function
// which will receive the context of the render call
export default function (context) {
  // data pre-fetching
  if (context.url === '/') {
    if (app.getUsers) {
      return app.getUsers(0, 1)
        .then((initialState) => {
          context.initialState = initialState
          return app
        })
    }
  }
}
