// pages/addAddress/addAddress.js
var app = getApp();
var inputs = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    name: '',
  },
  openMap: function () {
    var that = this;
    wx.chooseLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        that.setData({
          address:res.address,
          name:res.name,
        })
      }
    })
  },
  //获取对应id的input的值
  bindinput: function (e) {
    inputs[e.currentTarget.id] = e.detail.value;
  },
  /**
   * 提交保存
   */
  submit: function () {
    inputs['destination'] = this.data.address;
    inputs['desAddre'] = this.data.name;
    var that = this;
    //console.log(inputs);
    if (!inputs.realname || inputs.realname == "") {
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
    app.wxLoad({
      img: '/images/base/loading1.gif',
      contentClass: "loadding",
      duration: 100000,
      title: '加载中'
    })
    //console.log(inputs);
    //保存地址信息
    wx.request({
      url: app.data.host + 'addAddress',
      data:{
        data:inputs
      },
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        // 成功时返回上一页
        if(res.data.status == 1){
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../choseAddress/choseAddress',
            })
          }, 1000)
        }else{
          app.wxToast({
            title: res.data.text
          })
        }
      }
    })
  }

})