//index.js
//获取应用实例
const app = getApp()

import { request, regeneratorRuntime } from '../../utils/request.js'
import { formatTime, throttle } from '../../utils/util.js'
Page({
  data: {
    openids: '',
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    ischeckStatus: false
  },
  onLoad: async function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          screenHeight: res.screenHeight
        })
      },
    })

    this.getScenicSpotListData()

    if (app.globalData.openId) {
      this.initData()
      return
    }

    this.wxloginRquest()
    
  },

  wxloginRquest: async function() {
    // 登录
    wx.login({
      success: async rescode => {
        if (rescode.code) {
          // app.globalData.openId = "198273982173912"
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                this.loginCode(rescode.code)
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                this.initData()
              } else {
                console.log('未授权')
                wx.redirectTo({
                  url: '/pages/login/step1/step1'
                })
              }
            }
          })
        }
      }
    })
  },

  loginCode: async function(code) { // 获取code 到后台换取 openid
    let openiddata = await request('getOpenid', { code: code }, false, "POST")
    app.globalData.openId = openiddata.data.openid
    wx.setStorageSync("openids", openiddata.data.openid)
  },

  initData: async function () {
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        app.globalData.userInfo = res.userInfo
      }
    })
    this.setData({
      userInfo: app.globalData.userInfo,
      openids: wx.getStorageSync("openids")
    })
  },

  shootbutton: throttle(function (e) {
    // 处理用户是否登录，逻辑代码
    if (!this.pageLoading) {
      this.pageLoading = !0
      if (!wx.getStorageSync('openids')) {
        this.wxloginRquest()
      }
      if (wx.getStorageSync('token')) {
        wx.navigateTo({
          url: '/pages/pay/pay?ordertype=' + e.currentTarget.dataset.ordertype +
            '&orderpaytype=' + e.currentTarget.dataset.orderpaytype +
            '&functionid=' + e.currentTarget.dataset.functionid +
            '&spotid=' + e.currentTarget.dataset.spotid +
            '&cityname=' + e.currentTarget.dataset.cityname +
            '&ordertotalprice=' + e.currentTarget.dataset.ordertotalprice +
            '&orderlongitude=' + e.currentTarget.dataset.orderlongitude +
            '&orderlatitude=' + e.currentTarget.dataset.orderlatitude +
            '&openid=' + e.currentTarget.dataset.openids +
            '&areaname=' + e.currentTarget.dataset.areaname +
            '&spotname=' + e.currentTarget.dataset.spotname
        })
      } else {
        wx.navigateTo({
          url: '/pages/register/register'
        })
      }
    }
    
  }, 1000),

  usercenter: throttle(function() {
    if (!this.pageLoading) {
      this.pageLoading = !0
      wx.navigateTo({
        url: '/pages/usercenter/usercenter'
      })
    }
  }, 1000),

  orderBtnCen: throttle(function(e) {
    if (!this.pageLoading) {
      this.pageLoading = !0
      if (wx.getStorageSync('token')) { // wx.getStorageSync('token')
        wx.navigateTo({
          url: '/pages/order/ordercenter/ordercenter?path=indexbtn',
        })
      } else {
        wx.navigateTo({
          url: '/pages/register/register'
        })
      }
    }
  }, 1000),

  getScenicSpotListData: async function() {
    this.setData({
      getScenicSpotListData: await request('getScenicSpotList', {}, true, 'POST')
    })
    // if (wx.getStorageSync('token')) {
    //   this.setData({
    //     getScenicSpotListData: await request('getScenicSpotList', { token: wx.getStorageSync('token') }, false, 'GET')
    //   })
    // } else {
    //   this.setData({
    //     getScenicSpotListData: ''
    //   })
    // }
  },

  onShow: function () {
    this.pageLoading = !1
  }
})
