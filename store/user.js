// export 命令用于规定模块的对外接口 外部能够读取模块内部的某个变量
// state 必须是一个函数返回 一个数据对象
export const state = () => ({
    // 储存数据的仓库
    userInfo: {
        userInfo: {
            token: '',
            user: {},
        }
    }
})
// state，驱动应用的数据源；
export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data
    },

    // clearUserInfo(state) {
    //     // 清空 vuex
    //     state.userInfo = {};

    //     if (process.browser) {
    //         console.log(process.browser);
    //         // 当前运行的数据 如果是在浏览器 返回true , 在服务器 返回 false
    //         localStorage.removeItem('store')
    //         // localStorage保存的key 是 store value 是 user对象 保存了用户信息
    //     }
    // }


}

export const actions = {
    async login({commit}, data) {
        try {
            const res = await this.$axios({
                url: '/accounts/login',
                method: 'post',
                data
            });
            console.log(res.data);
            if (res.data.token) {
                commit('setUserInfo', res.data)
                return res;
            }

        } catch (error) {
            console.log(error);
        }

    }
}