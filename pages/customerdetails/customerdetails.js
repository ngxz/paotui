// pages/customerdetails/customerdetails.js
var app = getApp
var inputs = {};
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    userIcon: '../../images/userIcon.jpg',
    name:'',
    mobile:'',
    address:'',
    about:'',
    checked:'true',
  },
  //获取对应id的input的值
  bindinput: function (e) {
    inputs[e.currentTarget.id] = e.detail.value;
  },
  //提交，验证input
  submit: function () {
    var that = this;
    //console.log(inputs)
    if (!inputs.name || inputs.name == "") {
      app.wxToast({
        tapClose: true,
        title: "请填写姓名"
      })
      return;
    }

    if (!inputs.mobile) {
      app.wxToast({
        tapClose: true,
        title: "请填写联系电话"
      })
      return;
    }

    var mobile = inputs.mobile;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (mobile == "" || !myreg.test(mobile)) {
      app.wxToast({
        tapClose: true,
        title: "请输入正确手机号码"
      })
      return;
    }

    if (!inputs.address) {
      app.wxToast({
        tapClose: true,
        title: "请填写地址"
      })
      return;
    }
    if (!inputs.about) {
      app.wxToast({
        tapClose: true,
        title: "请填写自我介绍"
      })
      return;
    }
    app.wxLoad({
      img: '/images/base/loading1.gif',
      contentClass: "loadding",
      duration: 100000,
      title: '加载中'
    })
    wx.request({
      url: host + '/guanwang/editmessage',
      data: {
        data: inputs
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.status == 0) {
          app.wxToast({
            tapClose: true,
            title: res.data.text
          })
        } else {
          app.wxToast(false);
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  }
})