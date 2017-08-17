// 初始化vuex中间件
export default{
    showLogs : store => {
        store.subscribe((mutation, state) => {
            console.log('mutation', mutation, 'state', state)
        })
    },
    // showLog1 : store => {
    //     store.subscribe((mutation, state) => {
    //         console.log('mutation', mutation, 'state', state)
    //     })
    // }
}
