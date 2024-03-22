export const CountStore = {
    state: {
        count: 0,
    },
    getters: {
        square(state) {
            return state.count * state.count
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setNewCount(state, payload) {
            state.count = payload
        },
    },
}