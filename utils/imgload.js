function imgLoad(e,that) {

  var $width = e.detail.width,    //获取图片真实宽度
    $height = e.detail.height,
    ratio = $width / $height;    //图片的真实宽高比例
  var viewWidth = that.data.screenWidth,           //设置图片显示宽度，左右留有16rpx边距
    viewHeight = viewWidth / ratio;    //计算的高度值
  var image = {};
  //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
  image[e.target.dataset.index] = {
    width: viewWidth,
    height: viewHeight
  }
  that.setData({
    images: image
  })
}
module.exports = imgLoad