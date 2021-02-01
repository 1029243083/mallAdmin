import { createStore } from 'vuex';
export interface IStoreState {
    user: string //用户的邮箱
}
const store = createStore({
    state(): IStoreState {
        return {
            user: ''
        }
    },
    mutations: {
        setUser(state: IStoreState, user: string) {
            state.user = user;
        }
    }
})

export default store;