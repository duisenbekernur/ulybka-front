import { createStore } from 'vuex'
import userModule from "@/store/user.module";

// Create a new store instance.
export const store = createStore({
    modules: {
        user: userModule
    }
})