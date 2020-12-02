const db = wx.cloud.database()
wx.cloud.init()
var updatedb = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    profile: []
  },
  async checkUser() {
    //获取clouddisk是否有当前用户的数据，注意这里默认带了一个where({_openid:"当前用户的openid"})的条件
    const userData = await db.collection('userlist').get()
    //如果当前用户的数据data数组的长度为0，说明数据库里没有当前用户的数据
    if (userData.data.length === 0) {
      //没有当前用户的数据，那就新建一个数据框架，其中_id和_openid会自动生成
      return await db.collection('userlist').add({
        data: {
          "folist": [],
          "starlist": []
        }
      }),
      console.log("用户数据添加成功")
    } else {
      console.log('用户数据', userData)
    }
  },
  // 获取账户列表
  getprofile: function (pagenum = 3, skipnum = 0) {
    wx.cloud.callFunction({
      name: "getdatabase",
      data: {
        pagenum: pagenum,
        skipnum: skipnum,
        database: "profilelist"
      }
    }).then(res => {
      var olddata = this.data.profile
      var newdata = olddata.concat(res.result.data)
      this.setData({
        profile: newdata
      })
    })
  },
  // 转到账户主页
  gotoprofile: function(event) {
    var name = event.currentTarget.dataset.name
    wx.navigateTo({
      url: '../profile/profile?name=' + name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getprofile(9, 0)
    this.checkUser()
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
    var rbskipnum = this.data.profile.length
    wx.showLoading({
      title: '加载中...',
    })
    this.getprofile(9, rbskipnum)
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})