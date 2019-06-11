//app.js
App({
    onLaunch: function () {
        // 本地存储
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                wx.showToast({
                    title: '我来了',
                    icon: "none",
                    duration: 2000
                })
                if (res.code) {

                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        })
        // 获取用户的当前设置
        wx.getSetting({
            success: res => {
                // authSetting--用户授权结果
                // 当授权给一个 scope 之后，其对应的所有接口都可以直接使用
                // scope.userInfo--用户信息，对应--wx.getUserInfo
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null
    }
})
