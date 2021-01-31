import { createStore } from 'vuex';
interface IState {
    user: string //用户的邮箱
}
const store = createStore({
    state(): IState {
        return {
            user: ''
        }
    },
    mutations: {
        setUser(state: IState, user: string) {
            state.user = user;
        }
    }
})

export default store;