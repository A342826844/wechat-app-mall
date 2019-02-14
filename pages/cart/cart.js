// pages/cart/cart.js
import ajax from '../../utils/ajax.js'
const app = getApp()
Page({
  handleAllCheck(){
    const cartList = this.data.cartList.map(item => {
      item.isChecked = !(this.data.allChecked)
      return item
    })
    this.setData({
      cartList
    })
    this.totalAllCheck()
    this.totalCheckedPrice()
  },
  totalAllCheck(){
    const allChecked =  this.data.cartList.every(item => (item.isChecked === true))
    console.log(this.data.cartList)
    this.setData({
      allChecked
    })
  },
  totalCheckedPrice(){
    const checkedPrice =  this.data.cartList.reduce((result, item) => {
      if(item.isChecked){
        result += item.price * item.count*100
      }
      return result
    },0)
    this.setData({
      checkedPrice
    })
  },
  handleCheck(e){
    console.log(e)
    this.totalCount(e, "Check")
    this.totalAllCheck()
  },
  handleMinusCount(e){
    this.totalCount(e,"minus")
  },
  handleAddCount(e){
    this.totalCount(e, "add")
  },
  totalCount(e,type){
    const { id } = e.target.dataset
    const cartList = this.data.cartList.map(item => {
      if(item.id === id){
        switch(type){
          case "add":
            this.setCartStorage(id,1)
            item.count += 1
            return item
          case "minus":
            if (item.count === 1){
              return item
            }
            this.setCartStorage(id, -1)
            item.count -= 1
            return item
          case "Check":
            item.isChecked = !item.isChecked
            return item

          default:
            return item
        }
      } 
      return item
    })
    this.setData({
      cartList
    })
    this.totalCheckedPrice()
  },
  setCartStorage(id,temp){
    let storage = wx.getStorageSync("lxa_cart");
    let carts = storage ? JSON.parse(storage) : []
    const cart = carts.map(item => {
      if(item.id === id){
        item.count += temp
        return item
      }
      return item
    })
    wx.setStorageSync("lxa_cart", JSON.stringify(cart))
    app.getCartCount()
  },
  carts: [],
  getCardList(){
    console.log("gitCard")
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
        const cartLists = detail.map((item,index) =>{
          const {
            id,
            accessoryHints,
            title,
            price,
            originPrice,
            qunTitle,
            image
          } = item
          return {
            id,
            accessoryHints,
            title,
            price,
            originPrice,
            qunTitle,
            image,
            count: this.carts[index].count,
            isChecked: false
          }
        })
        return cartLists
      })
      .then(res => {
        console.log(res)
        this.setData({
          cartList: res
        })
      })
      .then(() => {
        this.totalAllCheck()
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    imageURL: '//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg',
    cart: [1,2,3,4,5],
    allChecked: false,
    checkedPrice: 0,
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