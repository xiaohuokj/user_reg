// pages/register/register.js
const app = getApp()

import {
  request,
  regeneratorRuntime
} from '../../utils/request.js'
import {
  formatTime,
  throttle
} from '../../utils/util.js'

var interval = null //倒计时函数
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: '获取验证码', //倒计时 
    currentTime: 60,
    disabled: false,
    inputValuephone: '',
    inputValuecode: ''
  },

  getCode: function (e) {
    var that = this
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--
      that.setData({
        time: currentTime + 's'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
          // loginBtnStatus: true
        })
      }
    }, 1000)
  },
  getVerificationCode: async function (e) { // 获取手机验证码 || 重新发送
    var that = this
    if (that.data.disabled) {
      //console.log('00----------')
      return
    } else {
      //console.log('11----------')
      const phone = e.currentTarget.dataset.phone
      let isPoneSuccess = that.isPoneAvailable(phone)
      if (isPoneSuccess) {
        let postData = {
          phonenum: phone,
          forwhat: 2
        }
        this.getCode()
        that.setData({
          disabled: true
          // loginBtnStatus: false
        })
        // let getCodedata = await request('getCode', postData, false, 'GET')
        // wx.showToast({
        //   title: getCodedata.message,
        //   icon: 'none'
        // })
      } else {
        wx.showToast({
          title: '请输入正确手机号码',
          icon: 'none'
        })
        that.setData({
          inputdisabled: false,
          // loginBtnStatus: true
        })
      }
    }
  },

  bindKeyInput1: function (e) { // 获取用户手机号value
    this.setData({
      inputValuephone: e.detail.value
    })
    this.isIputValuestatus()
  },
  bindKeyInput2: function (e) { // 获取验证码value
    this.setData({
      inputValuecode: e.detail.value
    })
    this.isIputValuestatus()
  },

  isIputValuestatus: function () {
    if (this.data.inputValuephone === '' || this.data.inputValuecode === '') {
      this.setData({
        loginBgcolor: "#EAEAEA",
        // loginBtnStatus: false
      })
    } else {
      this.setData({
        loginBgcolor: "#3DA7BA",
        // loginBtnStatus: true
      })
    }
  },

  isPoneAvailable: function (phonenumber) {
    const that = this
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!myreg.test(phonenumber)) {
      return false
    } else {
      return true
    }
  },
  logibtns: throttle(async function (e) {

    if (this.data.inputValuephone === '' || this.data.inputValuecode === '') {
      return
    } else {
      wx.showToast({
        title: '注册成功',
        icon: 'none'
      })
      wx.setStorageSync('isLoginStatus', 1)
      setTimeout(function() {
        wx.redirectTo({
          url: '/pages/qrcodeimg/qrcodeimg',
        })
      },2000)
    }
  }, 1000),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.isIputValuestatus()
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