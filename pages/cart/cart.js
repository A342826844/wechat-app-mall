// pages/cart/cart.js
import ajax from '../../utils/ajax.js'
const app = getApp()
Page({
  handleAllCheck(){
    this.setData({
      allChecked: !(this.data.allChecked)
    })
  },
  carts: [],
  getCardList(){
    const requests = this.carts.map(item => {
      return ajax.getData(`http://www.xiongmaoyouxuan.com/api/detail?id=${item.id}&normal=1&sa=`)
    })
    Promise.all(requests)
      .then( res =>{
        let detail = []
        res.map(item => {
          if(item){
            detail.push(item.detail)
          }
          return item
        })
        console.log(detail)
        detail.map((item,index) =>{
          const {
            id,
            accessoryHints,
            title,
            price,
            originPrice,
            qunTitle
          } = item
          return {
            id,
            accessoryHints,
            title,
            price,
            originPrice,
            qunTitle,
            count: this.cart[index].count
          }
        })
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    imageURL: '//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
    cart: [1,2,3,4,5],
    allChecked: true,
    cartList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let storage = wx.getStorageSync("lxa_cart");
    this.carts = storage ? JSON.parse(storage) : []
    if(this.carts.length){
      this.getCardList()
    }
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