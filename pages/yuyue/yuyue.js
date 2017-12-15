var app = getApp();
var mycomid = app.data.comid;
var host = app.data.host;
var indexurl = app.data.indexurl;
var inputs = {};
Page({
    data: {
        mobile:'',
        address:'',
        destination:'',
        list:'',
    },
    //  点击时间组件确定事件  
    bindTimeChange: function (e) {
       
        this.setData({
            times: e.detail.value
        })
        inputs["yytime"] = e.detail.value;
    },
    //  点击日期组件确定事件  
    bindDateChange: function (e) {
        console.log(e.detail.value)
        this.setData({
            dates: e.detail.value
        })
        inputs["yydate"] = e.detail.value;
    },
    //获取对应id的input的值
    bindinput:function(e){
      inputs[e.currentTarget.id] = e.detail.value;
    },
   onLoad:function(){
     var myDate = new Date();
     var year = myDate.getFullYear();
     var mon = myDate.getMonth();   
     var day = myDate.getDate();    
     var startdate = year+'-'+mon+'-'+day;
     var enddate = (year+1) + '-' + mon + '-' + day;
     this.setData({
       startdate: startdate,
       enddate: enddate
     })
     var that = this;
     //请求默认的地址信息
     wx.request({
       url: app.data.host+'getAddress',
       data:{
         mycomid:app.data.mycomid
       },
       header:{
        'content-type':'application/json'
       },
       success:function(res){
        that.setData({
          list:res.list
        })
       }
     })
   },
   //提交，验证input
   submit: function () {
     var that = this;
      //console.log(inputs)
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

     if (!inputs.yydate) {
       app.wxToast({
         tapClose: true,
         title: "请选择预约日期"
       })
       return;
     }

     if (!inputs.yytime) {
       app.wxToast({
         tapClose: true,
         title: "请选择预约时间"
       })
       return;
     }
     if (!inputs.destination) {
       app.wxToast({
         tapClose: true,
         title: "请填写目的地"
       })
       return;
      }
     if (!inputs.address) {
       app.wxToast({
         tapClose: true,
         title: "请填写联系人地址"
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
       url: host + '/guanwang/setyuyue',
       data: {
         comid: mycomid,
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
             title: '预约提交成功',
             icon: 'success',
             duration: 2000
           })
           setTimeout(function () {
             wx.redirectTo({
               url: indexurl,
             })
           }, 1000)
         }
       }
     })
   },
   /**
    * 点击进入选择地址
    */
   choseAddress:function(){
      wx.navigateTo({
        url: '../choseAddress/choseAddress',
      })
   }
})
