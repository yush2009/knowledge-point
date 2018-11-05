Page({
  data:{
    //图片是否被选中
    isChoosed: [0,0,0,0,0,0,0,0,0],
    //选中后的图片
    imagePig: '/pages/image/pig.png',
    //图片数组
    srcs:[
      '/pages/image/hongshaorou.png',
      '/pages/image/chuanchuanxiang.png',
      '/pages/image/dundoufu.png',
      '/pages/image/xihongshijidan.png',
      '/pages/image/shaoqiezi.png',
      '/pages/image/niupai.png',
      '/pages/image/kongxincai.png',
      '/pages/image/youmendaxia.png',
      '/pages/image/yumipaigutang.png',
    ],
  },

  //根据索引获取图片名称
  getImageName(index){
    var imageNames = ['红烧肉','串串香','炖豆腐','西红柿鸡蛋','烧茄子','牛排','空心菜','油焖大虾','玉米排骨汤']
    return imageNames[index]
  },

  //点击按钮
  changeForChoose(e){
    var index = e.currentTarget.id
    var isChoosedTmp = this.data.isChoosed
    var logs = wx.getStorageSync('logs') || []
    var image = this.data.srcs[index]
    var imageName = this.getImageName(index)

    if (this.data.isChoosed[index] == 0) {
      isChoosedTmp[index] = 1
      this.setData({
        isChoosed: isChoosedTmp,
      });
      logs.unshift(imageName);
      wx.setStorageSync('logs', logs)
      console.log('+++', imageName)
    }else{
      isChoosedTmp[index] = 0
      this.setData({
        isChoosed: isChoosedTmp,
      });
      var image_index = logs.indexOf(imageName)
      if (image_index > -1) {
        logs.splice(image_index, 1)
      }
      wx.setStorageSync('logs', logs)
      console.log('---', imageName)
    }
  },
  //点击按钮
  seeMenu(e) {
    this.setData({
      isChoosed: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    });
  }
})