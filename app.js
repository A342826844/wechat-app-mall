//app.js
App({
  onLaunch: function () {
    this.getCartCount()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
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
  getCartCount(){
    let cart = wx.getStorageSync("lxa_cart") ? JSON.parse(wx.getStorageSync("lxa_cart")) : []
    let total = cart.reduce( (result,item) => {
      result += item.count
      return result  
    },0)
    this.totalBage = total > 99 ? '99+' : total.toString();
    this.doShowBadge()
  },
  doShowBadge(){
    this.totalBage =  this.totalBage !== "0" ? this.totalBage : ""
    if(this.totalBage){
      wx.setTabBarBadge({
        index: 2,
        text: this.totalBage
      })
    }
  },
  totalBage: "",
  globalData: {
    userInfo: null,
  },
})