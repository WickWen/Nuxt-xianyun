export const state = () => ({
    list: [
        
    ]
});

export const mutations = {
    addHistory(state,data) {
        state.list.push(data)
    }

}