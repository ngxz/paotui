// pages/customer/customer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userIcon:'../../images/userIcon.jpg',
    open:true,
    open2:true,
    row1:true,
    row2:true
  },
  /**
   * 打开关闭标签菜单
   */
  listOpen:function(){
    this.setData({
      open:!this.data.open,
      row1: !this.data.row1
    })
  },
  listOpen2: function () {
    this.setData({
      open2: !this.data.open2,
      row2:!this.data.row2
    })
  },
  /**
   * 编辑用户资料
   */
  editUser:function(){
    wx.navigateTo({
      url: '../customerdetails/customerdetails'
    })
  },
  /**
   * 我的评价
   */
  addpingjia:function(){
    wx.navigateTo({
      url: '../addpingjia/addpingjia',
    })
  }
})