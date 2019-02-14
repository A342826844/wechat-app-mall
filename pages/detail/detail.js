// pages/detail/detail.js
import ajax from '../../utils/ajax.js'
const app = getApp()
Page({
  doChatHandle(e){
    console.log(e)
  },
  togglePopupNum(e){
    this.setData({
      numShow: !this.data.numShow
    })
  },
  setCartCount(){
    app.getCartCount()
    this.setData({
      cartCount: app.totalBage ? app.totalBage : ""
    })
  },
  addShopCart(e){
    const { id, count} = this.data
    let cart = wx.getStorageSync("lxa_cart") ? JSON.parse(wx.getStorageSync("lxa_cart")) : []
    const isInCart = cart.some(item => item.id === id)
    if(isInCart){
      cart.map( item => {
        if(item.id === id){
          item.count += 1
        }
        return item
      })
    } else{
      cart.push({id,count})
    }
    wx.setStorageSync("lxa_cart", JSON.stringify(cart))
    this.setCartCount()
  },
  /**
   * 页面的初始数据
   */
  data: {
    interval: 3000,
    duration: 1000,
    banner: [],
    contentList: [],
    id: 0,
    hints: [],
    title: '',
    price: 0,
    originPrice: 0,
    saleNum: 0,
    numShow: false,
    count: 1,
    cartCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setCartCount()
    options.id = options.id ? options.id : 3202228
    ajax.getData(`http://www.xiongmaoyouxuan.com/api/detail?id=${options.id}&normal=1&sa=`)
      .then( res => {
        const { title, price, originPrice, id, saleNum} = res.detail
        this.setData({
          title,
          price,
          originPrice,
          id,
          saleNum,
          banner: res.detail.photo,
          contentList: res.detail.descContentList.filter(item => (item.type === 1)),
          hints: res.detail.accessoryHints
        })
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