const db = wx.cloud.database()
wx.cloud.init()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    nickName: "用户未登陆",
    folist: [],
    name: [],
    ins: [],
    avatar: []
  },
  async showfolist() {
    await wx.cloud.callFunction({
      name: "follow",
      data: {
        run: "get"
      }
    }).then(res => {
      this.setData({
        folist: res.result.data[0]["folist"]
      })
    })
    console.log("关注列表:", this.data.folist)
    this.data.name = []
    this.data.ins = []
    this.data.avatar = []
    for (var i = 0; i < this.data.folist.length; i++) {
      wx.cloud.callFunction({
        name: "getdatabase",
        data: {
          pagenum: 1,
          skipnum: 0,
          name: this.data.folist[i],
          database: "profilelist",
          run: true
        }
      }).then(res => {
        var name = this.data.name
        var ins = this.data.ins
        var avatar = this.data.avatar
        name.push(res.result.data[0]["name"])
        ins.push(res.result.data[0]["ins"])
        avatar.push(res.result.data[0]["avatar"])
        this.setData({
          name,
          ins,
          avatar
        })
      })
    }
  },
  // 转到账户主页
  gotohomepage: function (event) {
    var name = event.currentTarget.dataset.name
    wx.navigateTo({
      url: '../profile/profile?name=' + name,
    })
    console.log(name)
  },
  // 转到发现页
  switchtabbar: function () {
    wx.switchTab({
      url: '../discover/discover',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              var {
                avatarUrl,
                nickName,
              } = res.userInfo
              // 图片转化为高清
              avatarUrl = avatarUrl.split("/")
              avatarUrl[avatarUrl.length - 1] = 0;
              avatarUrl = avatarUrl.join('/');
              this.setData({
                useravatar: avatarUrl,
                nickName: nickName,
              })
            }
          })
        }
      }
    });
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
    this.showfolist()
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