function Linkto(e){
  var url = e.target.dataset.url;
  if (url == "") {
    return;
  }
  console.log(e)
  wx.navigateTo({
    url: url,
    fail: function () {
      wx.reLaunch({
        url: url
      })
    }
  })
}


module.exports = Linkto
