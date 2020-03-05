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
    }
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
            }

        } catch (error) {
            console.log(error);
        }

    }
}