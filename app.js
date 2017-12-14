var server = require('./utils/foodserver');
var wxToast = require('/pages/plus/toast/toast.js')
var code;
var homeurl = "https://xcode.7ying.cc/index.php";
//var homeurl = "http://weiapp.runqi.com/index.php";
var Linkto = require('/utils/linkto.js')
var imgLoad = require('/utils/imgload.js')
App(
  {
    wxToast,
    Linkto,
    imgLoad,
    onLaunch: function () {
      var that = this;
      let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
      that.data.comid = extConfig.comid
      that.data.appid = extConfig.appid
      that.data.appname = extConfig.appname
      that.data.indexurl = extConfig.indexurl
      that.data.codetype = extConfig.codetype
      that.data.color = extConfig.color
      this.getUserInfo();
     
    },
    onShow: function () {

    },


    data: {
      host: homeurl + "/getindex/",
      hostguanwang: homeurl + "/guanwang/",
      hostmall: homeurl + "/mall/",
      hostmalluser: homeurl + "/malluser/",
      hostmember: homeurl + "/member/",
      hostupload: homeurl + "/Uploadimg/",
      hostfood: homeurl + "/food/",
      hostms: homeurl + "/miaosha/",
      hostpt: homeurl + "/pintuan/",
      hostdashang: homeurl + "/dashang/",
      hostyuyue: homeurl + "/yuyue/",
      hostpaimai: homeurl + "/paimai/",
      comid: null,
      indexurl: null,
      regsms: 0,
      appid: null,
      openid: null,
      tuandui: null,
      appname: null,
      codetype: null,
    },


    getUserInfo: function (cb) {
      var that = this

      if (this.globalData.userInfo) {
        typeof cb == "function" && cb(this.globalData.userInfo)
      } else {
        //调用登录接口
        wx.getUserInfo({
          withCredentials: false,
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    },

    globalData: {
      userInfo: null,
      tempdata: null
    },

    getopenid: function () {
    
      var that = this;
      wx.getSetting({
        success(res) {
          wx.login({
            success: function (res) {
              if (res.code) {
                wx.request({
                  url: that.data.host + 'myopenid',
                  data: {
                    comid: that.data.comid,
                    code: res.code,
                    appid: that.data.appid,
                    userinfo: that.globalData.userInfo
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log("openid:" + res.data)
                    if (res.data == "") {
                      wx.reLaunch({
                        url: '/pages/noauth/noauth',
                      })
                      return;
                    }
                    that.data.openid = res.data;
                    
                  },
                  fail: function (res) {

                  }
                })
              } else {
                wx.showModal({
                  content: '获取用户登录态失败！' + res.errMsg,
                  showCancel: false,
                  success: function (res) {

                  }
                });

              }
            }
          });
        },
        fail(res) {
          wx.showModal({
            content: '请重新进入授权',
            showCancel: false,
            success: function (res) {

            }
          });
        }
      })


    }

  })
