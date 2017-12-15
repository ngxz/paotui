// pages/choseAddress/choseAddress.js
var app = getApp();
var li = [{
  "index": "0",
  "name": "张三",
  "tel": "13733332222",
  "addre": "长沙市天心区解放路一单元110号",
},
{
  "index": "1",
  "name": "李四",
  "tel": "15172225222",
  "addre": "长沙市岳麓区中南大学校本部五舍11号",
},]; 
Page({
  data: {
    mycomid:'',
    list: li,
    addre:'',
  },
  /**
   * 点击后选择地址跳到提交订单页面
   */
  toChose:function(){
    wx.navigateTo({
      url: '../yuyue/yuyue',
    })
  },
  /**
   * 点击增加地址
   */
  addAddre:function(){
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  /**
   * 加载获取用户地址数据
   */
  onLoad:function(){
    // var that = this;
    // wx.request({
    //   url: app.data.host+'addressList',
    //   data:{
    //     comid: this.data.mycomid,
    //   },
    //   header:{
    //     'content-type':'application/json'
    //   },
    //   success:function(res){
    //     that.setData({
    //       list:res.data
    //     })
    //   }
    // })
  }
})