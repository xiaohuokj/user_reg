// pages/login/step1/step1.js

const app = getApp()

import { request, regeneratorRuntime } from '../../../utils/request.js'
import { formatTime } from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  bindGetUserInfo: function (e) {
    // console.log(e)
    let loginstatus = wx.getStorageSync('isLoginStatus')
    if (loginstatus == 1) {
      wx.redirectTo({
        url: '/pages/qrcodeimg/qrcodeimg',
      })
      return;
    }
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.redirectTo({
        url: '/pages/register/register',
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '请您同意授权后进行登录注册哦！',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.pageLoading = !1
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})