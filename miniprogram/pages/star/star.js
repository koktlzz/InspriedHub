Page({
  data: {
    starlist: "",
    row: 0
  },
  previewimg: function (event) {
    var img = event.currentTarget.dataset.img;
    console.log(img)
    wx.previewImage({
      urls: [img],
      current: ''
    })
  },
  unstar(event) {
    var img = event.currentTarget.dataset.img
    var index = this.data.starlist.indexOf(img)
    if (this.data.starlist.includes(img)) {
      wx.cloud.callFunction({
          name: "star",
          data: {
            starimg: img,
            run: "unstar"
          }
        }),
        this.data.starlist.splice(index, 1),
        this.setData({
          starlist: this.data.starlist
        })
      console.log("取消收藏成功", img)
    }
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: "star",
      data: {
        run: "get"
      }
    }).then(res => {
      this.setData({
        starlist: res.result.data[0]["starlist"]
      })
      this.setData({
        row: Math.ceil(this.data.starlist.length / 3)
      })
      console.log("当前用户收藏:", this.data.starlist)
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
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