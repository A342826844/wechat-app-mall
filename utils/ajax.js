class Ajax {
  getData(url) {
    wx.showNavigationBarLoading()
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method: 'GET',
        success: function (res) {
            resolve(res.data.data)
        },
        fail: function (res) {
          // 直接在这里处理错误都是可以的
          reject(res)
        },
        complete: function (res) {
          wx.hideNavigationBarLoading()
        },
      })
    })
  }
  postData() {
    wx.showNavigationBarLoading()
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method: 'POST',
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        },
        complete: function (res) {
          wx.hideNavigationBarLoading()
        },
      })
    })
  }
}

// TODO: 
// class构造中 使用箭头函数
class Super {
  //通过Super.prototype可以访问到todo方法，这种形式定义的方法，都是定义在prototype上
  //所有实例化之后的对象共享prototypy上的sayName方法
  todo() {
    return this
  }
  //通过Super.prototype访问不到xxx方法，该方法没有定义在prototype上
  //实例化之后的对象各自拥有自己的sayName方法，比demo1需要更多的内存空间
  xxx = () => {
    return this
  }
}
let a = new Super()
console.log(a)
export default new Ajax()