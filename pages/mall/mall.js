// pages/mall/mall.js
import ajax from '../../utils/ajax.js'
const app = getApp()
Page({

  lower(e){
    if(!(this.data.isEnd)){
      this.getList(true)
    }
  },
  // 上面tab点击事件
  handleChange(e) {
    this.setData({
      actionId: this.data.tab[e.detail.index].id,
      scrollTop: 0,
      start: 0
    })
    this.getList()
  },

  // 判断加载什么类容，对数组的进行操作
  getList(isLoadMore = false) {
    const { actionId, start } = this.data
    ajax.getData(`http://www.xiongmaoyouxuan.com/api/tab/${actionId}?start=${start}`)
      .then(res => {
        const list = isLoadMore ? this.data.list.concat(res.items.list) : res.items.list
        this.setData({
          list,
          isEnd: res.items.isEnd,
          start: res.items.nextIndex
        })
      })
  },

  /**
   * 页面的初始数据
   */
  data: {
    tab: [],
    list: [],
    actionId: 0,
    start: 0,
    isEnd: false,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    ajax.getData('http://www.xiongmaoyouxuan.com/api/tabs?sa=')
      .then(res => {
        this.setData({
          tab: res.list,
          actionId: res.list[0].id
        }, () => {
          this.getList()
        })
      })
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