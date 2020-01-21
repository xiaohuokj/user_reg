import regeneratorRuntime from './runtime.js'
// const baseHost = "https://www.easy-mock.com"
// const baseHost = "https://39.105.55.198/yijianjiaofei"
// const baseHost = "http://192.168.1.130:8080"
const baseHost = "https://www.xiangfei.com/yijianjiaofei"
const baseUrl = {
  // gettest: baseHost + "/mock/5aded45053796b38dd26e970/comments#!method=get" // 测试接口
  getOpenid: baseHost + "/page/wxpay/xcxlogin.html", // 获取openid
  getCode: baseHost + "/mbUserPer/getCode.html", // 通过手机号获取验证码
  validaCode: baseHost + "/mbUser/validaCode.html", // 校验-验证码
  login: baseHost + "/mbUser/login.html", // 登录
  getScenicSpotList: baseHost + "/saScenic/getScenicSpotList.html", // 景区列表
  getGkOrdL: baseHost + "/MbOde/auth/getGkOrdL.html", // 订单中心
  getadOrd: baseHost + "/saScenic/auth/adOrd.html", // 景点下单
  upOrd: baseHost + "/MbOde/auth/upOrd.html", // 订单删除
  payOrder: baseHost + "/saScenic/auth/payOrder.html"
}
function request(url, postData = {}, toast = true, method = 'POST') {
  const app = getApp() 
  return new Promise( (resolve, reject) => {
    // if (url == 'validaCode' || url == 'getCode' || url == 'login' || url == 'getScenicSpotList' || url == 'getGkOrdL') {
    //   if (!app.globalData.token) {
    //     console.log('app.globalData', app.globalData)
    //     // wx.showToast({
    //     //   title: '您还未登录',
    //     //   icon: 'none'
    //     // })
    //     // resolve({ err: true, msg: '您还未登录'})
    //     return
    //   }
    // }
    let paras = {
      url: baseUrl[url] + '?t=' + new Date().getTime(),
      data: postData,
      header: {
        // "content-type": "application/json"
        "content-type": "application/x-www-form-urlencoded"
      },
      method,
      success: data => {
        if (toast) {
          wx.hideLoading()
        }
        console.log(url+'返回成功：', data.data)
        if (data.data.status == 1) {
          resolve(data.data)
        } /*else {
          reject(data.data)
          wx.showModal({
            title: '提示',
            content: data.data.message,
            showCancel: false
          })
        }*/
        if (data.data.status == -2) {
          wx.showToast({
            title: data.data.message,
            icon: 'none'
          })
        }
        if (data.data.status == 602 || data.data.message == '账号已在其他设备登录！') {
          try {
            wx.clearStorage()
            wx.redirectTo({
              url: '/pages/register/register',
            })
          }
          catch (err) {
          }
          wx.showToast({
            title: data.data.message,
            icon: 'none'
          })
        }

        /*if (!data.data.data) {
          data.data.data = {}
        }
        if (data.data.code == 2000) {
          if (data.data.count >= 0) {
            data.data.data.totalCount = data.data.count
          }
          resolve(data.data.data)
        } else {
          // reject(data.data.msg)
          wx.showModal({
            title: '提示',
            content: data.data.msg,
            showCancel: false
          })
        } */
      },
      fail: (err) => {
        if (toast) {
          wx.hideLoading()
        } 
        wx.showToast({title: '请求失败，网络错误！', icon: 'none' })
        console.error(url +'返回失败：', err)
        reject(err)
      }
    }
    console.log('请求url：', url)
    console.log('请求参数：', postData)
    if (toast) {
      wx.showLoading({ title: '加载中...' })
    }
    wx.request(paras)
  })
}
module.exports = {
  request,
  regeneratorRuntime
}
