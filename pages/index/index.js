//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'), //判断小程序的API，回调，参数，组件等是否在当前版本可用
    showModalStatus: false,
  },
  toChat: function() {
    wx.navigateTo({
      url: '../chat/chat'
    })
  },
  onLoad: function() {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  show_modal: function(e) {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0
    });
    this.setData({
      showModalStatus: true
    });
    setTimeout(function() {
      animation.translateY(0).step();
      this.setData({
        animationData: animation.export()//export 方法每次调用后会清掉之前的动画操作
      });
    }.bind(this), 200);
  },
  hide_modal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0
    });
    animation.translateY(400).step();
    this.setData({
      showModalStatus: false,
      animationData: animation.export()
    });
  }
})