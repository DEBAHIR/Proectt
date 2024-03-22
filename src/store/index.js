import { createStore } from 'vuex'
import { CountStore } from './CountStore'
import { userState } from './userState'
import { ticketState } from './ticketState'

export default createStore({
  state: {
  },
  getters: {

  },
  mutations: {

  },
  actions: {
  },
  modules: {
    counter: CountStore,
    user: userState,
    ticket: ticketState,
  }
})
