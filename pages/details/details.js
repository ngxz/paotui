var Data = require("../../utils/data.js");

var app = getApp()
Page({
  data: {
    navbar: ['预定', '酒店详情'],
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  dial: function () {
    wx.makePhoneCall({
      phoneNumber: '15123162599' //仅为示例，并非真实的电话号码
    })
  },
  //事件处理函数
  bindViewTap: function () {
    var that = this;
    var startDate = that.data.date;
    var endDate = that.data.tomorrow;
    console.log(startDate);
    console.log(endDate);
    wx.navigateTo({
      url: '../calender/index?startDate=' + startDate + "&endDate=" + endDate
    })
  },
  onShow: function () {
    var startDate = this.data.startDate;
    var endDate = this.data.endDate;
    console.log(startDate);
    console.log(endDate);
    var date = Data.formatDate(new Date(), "yyyy-MM-dd");
    var tomorrow1 = new Date();
    tomorrow1.setDate((new Date()).getDate() + 1);
    var tomorrow = Data.formatDate(new Date(tomorrow1), "yyyy-MM-dd");
    if (startDate == null) {
      startDate = date;
      endDate = tomorrow;
    }
    this.setData({
      date: startDate,
      tomorrow: endDate
    });
  }
})   

