// pages/home/home.js
import ajax from '../../utils/ajax.js'
const app = getApp()
Page({

  test(){
    console.log(1)
    const { id = 1232, count } = this.data
    let cart = wx.getStorageSync("lxa_cart") ? JSON.parse(wx.getStorageSync("lxa_cart")) : []
    const isInCart = cart.some(item => item.id === id)
    if (isInCart) {
      cart.map(item => {
        if (item.id === id) {
          item.count += 1
        }
        return item
      })
    } else {
      cart.push({ id, count })
    }
    wx.setStorageSync("lxa_cart", JSON.stringify(cart))
    app.getCartCount()
  },
  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    interval: 3000,
    duration: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax.getData("http://www.xiongmaoyouxuan.com/api/tab/1?start=0")
      .then(res => {
        console.log(res)
        this.setData({
          banners: res.banners
        })
        console.log(this.data.banners)
      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.doShowBadge()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})