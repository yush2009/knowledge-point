// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
var qqmapsdk
var myKey = '6X6BZ-LTI2Q-AX557-GFPRT-IL6X3-PWBFS'

Page({
  data: {
    markers: [],
    placeData: {},
    location_lat: 39.90469,
    location_lng: 116.40717,
  },
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: myKey
    })
  },
  getMyLocation: function () {
    var _this = this
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(latitude, longitude)
        _this.setData({
          location_lat: latitude,
          location_lng: longitude,
        })
        _this.nearby_search()
      }
    })
  },
  // 事件触发，调用接口
  nearby_search: function () {
    var _this = this
    // 调用接口
    qqmapsdk.search({
      keyword: '餐饮',  //搜索关键词
      location:{
        latitude: _this.data.location_lat,
        longitude: _this.data.location_lng
      },
      success: function (res) { //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            address: res.data[i].address,
            telephone: res.data[i].tel,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "../image/marker_red.png", //图标路径
            width: 20,
            height: 20,
          })
        }
        _this.setData({
          markers: mks,
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },

  //显示marker函数
  markerTap: function (e) {
    console.log(e)
    var _this = this
    var markersTemp = _this.data.markers
    var markerTemp = {}
    for (var i = 0; i < markersTemp.length; i++) {
      if (markersTemp[i].id == e.markerId) {
        markerTemp = markersTemp[i]
      }
    }
    _this.setData({
        placeData: {
          title: '名称：' + markerTemp.title + '\n',
          address: '地址：' + markerTemp.address + '\n',
          telephone: '电话：' + markerTemp.telephone,
        }
    })
  }

})