// websocket---chat
var url = 'ws://.......';

function connect(user, func) {
    wx.connectSocket({
        url: url,
        header: {
            'content-type': 'application/json'
        },
        success: function () {
            console.log('信道连接成功')
        },
        fail: function () {
            console.log('信道连接失败')
        }
    })
    //监听 WebSocket 连接打开事件
    wx.onSocketOpen(function (res) {
        wx.showToast({
            title: '信道已开通',
            icon: "success",
            duration: 2000
        })
        //接受服务器消息
        wx.onSocketMessage(func); //func回调可以拿到服务器返回的数据
    });
    //监听 WebSocket 错误事件
    wx.onSocketError(function (res) {
        wx.showToast({
            title: '信道连接失败，请检查!',
            icon: "none",
            duration: 2000
        })
    })
}

//发送消息
function send(msg) {
    //通过 WebSocket 连接发送数据。需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送
    wx.sendSocketMessage({
        data: msg
    });
}

module.exports = {
    connect: connect,
    send: send
}
