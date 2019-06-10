Page({
  data: {
    openid: "",
    token: "",
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    //要推送的内容
    push_content_data: [
      //keyword1
      {
        value: "你是史远吗？！",
        color: "#4a4a4a"
      }
    ]
  },
  //发送模板消息
  template_Msg: function(e) {
    wx.showLoading({ //期间为了显示效果可以添加一个过渡的弹出框提示“加载中”  
      title: '加载中',
      icon: 'loading',
    });
    //获取access_token
    var fId = e.detail.formId; //获取formId
    console.log("formId:" + fId);
    wx.request({
      url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa2d8cb78d952606a&secret=6b26cb047a3a5c9123d754c86ec42f4e",
      success: (res) => {
        console.log(res);
        this.setData({
          token: res.data.access_token //将access_token存到data的token里
        });
        console.log("access_token:" + this.data.token);
        var access_token_url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + this.data.token;
        var push_content = {
          "keyword1": this.data.push_content_data[0]
        };
        wx.request({
          url: access_token_url,
          data: {
            touser: this.data.openid, //接收者（用户）的 openid
            template_id: 'L4ZPIRNUNXuDBd8dRKl4PtdXheYmZ6-QwykLSDwq5S0', //申请的模板消息id，  
            page: '/pages/timing/timing',
            form_id: fId,
            data: push_content,
            color: '#ccc'
          },
          method: 'POST',
          success: function(res) {
            wx.hideLoading();
            console.log("发送成功");
            console.log(res);
          },
          fail: function(err) {
            // fail  
            console.log("push err")
            console.log(err);
          }
        })
      }
    });
  },
  onLoad: function() {
    var that = this;
    wx.login({
      success: (res) => {
          wx.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            data: {
              appid: 'wxa2d8cb78d952606a',
              secret: '6b26cb047a3a5c9123d754c86ec42f4e',
              js_code: res.code,
              grant_type: "authorization_code"
            },
            success: (res) => {
              console.log(res);
              that.setData({
                openid: res.data.openid //存储openid
              })
            }
          })
        }
    })
  },
  onReady: function() {
    //倒计的秒数
    var totalSecond = Date.parse(new Date("2019/06/11")) / 1000 - Date.parse(new Date()) / 1000;

    var interval = setInterval(function() {
      // 秒数
      var second = totalSecond;

      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '' + dayStr;

      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        wx.showToast({
          title: '活动已结束',
        });
        this.setData({
          countDownDay: '0',
          countDownHour: '0',
          countDownMinute: '0',
          countDownSecond: '0',
        });
      }
    }.bind(this), 1000);
  }
})