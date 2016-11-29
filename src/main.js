import createApp from './app'

const initialState = {
  users: window.__INITIAL_STATE__ || []
}
const app = createApp(initialState)

app.$mount('#app')
