const db = wx.cloud.database()
var updatedb = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    profile: [],
    homepage:[],
    folist: [],
    starlist:[]
  },
  // 关注账号
  follow: function (event) {
    var name = event.currentTarget.dataset.name
    var index = this.data.folist.indexOf(name)
    if(this.data.folist.includes(name)){
      wx.cloud.callFunction({
        name: "follow",
        data:{
          foprofile: name,
          run:"unfollow"
        }
      })
      this.data.folist.splice(index, 1)
      console.log("取关成功,当前用户关注账户:", this.data.folist)
      console.log(name)
      this.setData({
        folist: this.data.folist
      })
    }else{
      wx.cloud.callFunction({
        name: "follow",
        data:{
          foprofile: name,
          run: "follow"
        }
      })
      this.data.folist.push(name)
      console.log("关注成功,当前用户关注账户:", this.data.folist)
      console.log(name)
      this.setData({
        folist: this.data.folist
      })
    }
  },
  // 收藏图片
  star(event) {
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
        console.log("取消收藏成功", img)
    } else {
      wx.cloud.callFunction({
        name: "star",
        data: {
          starimg: img,
          run: "star"
        }
      })
      this.data.starlist.push(img),
      console.log("收藏成功", img)

    }

    console.log("收藏列表:", this.data.starlist)
  },
  // 预览帖子图片
  previewimg: function (event) {
    var img = event.currentTarget.dataset.img;
    console.log(img)
    wx.previewImage({
      urls: [img],
      current: ''
    })
  },
  // 预览头像
  previewavatar: function (event) {
    var avatar = event.currentTarget.dataset.avatar;
    console.log(avatar)
    wx.previewImage({
      urls: [avatar],
      current: ''
    })
  },
// 获取账号主页
  gethomepage: function(pagenum=3, skipnum=0) {
    wx.cloud.callFunction({
      name:"getdatabase",
      data:{
        pagenum: pagenum,
        skipnum: skipnum,
        name:this.options.name,
        database: "profilelist",
        run: true
      }
    }).then(res=>{
      this.setData({
        homepage: res.result.data[0]
      })
    })
  },
// 获取帖子
  getprofile: function(pagenum=3, skipnum=0) {
    wx.cloud.callFunction({
      name:"getdatabase",
      data:{
        pagenum: pagenum,
        skipnum: skipnum,
        name:this.options.name,
        database: "postlist",
        run:true
      }
    }).then(res=>{
      var olddata = this.data.profile
      var newdata = olddata.concat(res.result.data)
      this.setData({
        profile: newdata
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.gethomepage(3, 0)
    this.getprofile(3, 0)
    wx.cloud.callFunction({
      name: "follow",
      data:{
        run: "get"
      }
    }).then(res => {
      this.setData({
        folist: res.result.data[0]["folist"],
      })
      console.log("当前用户关注账户:", this.data.folist)
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
      console.log("当前用户收藏:", this.data.starlist)
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
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
    if(updatedb.length != 0){
      wx.showLoading({
        title: '加载中...',
      })
    }
    else{
      wx.hideLoading()
      wx.showToast({
        title: '已无更多帖子!',
      })
    }
    this.getprofile(3, rbskipnum)
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)  
    // setTimeout(function () {
    //   wx.hideToast()
    // }, 500)  
      
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})