import axios from 'axios'
import $config from '../utils/config'
import cookies from '../utils/cookies'
// 在线图片转base64
function urlToBase64(imgurl) {
  const p = new Promise(function(resolve, reject) {
    window.url = window.URL || window.webkitURL
    const xhr = new XMLHttpRequest()
    xhr.open('get', imgurl, true)
    xhr.responseType = 'blob'
    xhr.onload = function() {
      if (this.status === 200) {
        var blob = this.response
        const oFileReader = new FileReader()
        oFileReader.onloadend = function(e) {
          resolve(e.target)
        }
        oFileReader.readAsDataURL(blob)
      }
    }
    xhr.send()
  })
  return p
}

// 图片压缩--a:file 文件对象 b: name(detail) 当前点击的区域名称
function picture(a, b = { name: '' }) {
  var p = new Promise(function(resolve, reject) {
    if (/\/(?:jpeg|png)/i.test(a.file.type) && a.file.size > 100000) {
      // 根据图片的大小指定不同的压缩系数
      let c = 0.5
      const imgSize = (a.file.size / 1024 / 1024).toFixed(2)
      if (imgSize > 0 && imgSize <= 2) {
        c = 0.4
      } else if (imgSize > 2 && imgSize <= 5) {
        c = 0.3
      } else if (imgSize > 5) {
        c = 0.2
      }
      // 创建Canvas对象(画布)
      const canvas = document.createElement('canvas')
      // 获取对应的CanvasRenderingContext2D对象(画笔)
      const context = canvas.getContext('2d')
      // 创建新的图片对象
      const img = new Image()
      // 指定图片的DataURL(图片的base64编码数据)
      img.src = a.content
      // 监听浏览器加载图片完成，然后进行进行绘制
      img.onload = () => {
        // 指定canvas画布大小，该大小为最后生成图片的大小
        const _width = img.width
        const _heigt = img.height
        canvas.width = _width * c
        canvas.height = _heigt * c
        /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，img.width，img.height是将图片按给定的像素进行缩小。
        如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/
        context.drawImage(img, 0, 0, _width * c, _heigt * c)
        // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.5为默认压缩质量
        a.content = canvas.toDataURL(a.file.type, c)
        const _toFile = base64ToFile(a.content, a.file.name)
        uploadImage(_toFile).then(res => {
          resolve({
            code: res.code,
            content: a.content,
            url: res.data,
            src: res.data_src,
            file: a.file,
            toFile: a.file,
            name: b.name
          })
        })
      }
    } else {
      uploadImage(a.file).then(res => {
        resolve({
          code: res.code,
          content: a.content,
          url: res.data,
          src: res.data_src,
          file: a.file,
          toFile: a.file,
          name: b.name
        })
      })
    }
  })
  return p
}

// 把压缩后的base64 转file文件对象
function base64ToFile(dataurl, filename) {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {
    type: mime
  })
}

// 上传图片到服务器
function uploadImage(file) {
  const p = new Promise(function(resolve, reject) {
    // const baseurl = 'http://zmkm.zallove.wang'
    const param = new FormData() // 创建form对象
    param.append('file', file) // 通过append向form对象添加数据
    param.append('token', cookies.get('token') || false)
    const config = {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'multipart/form-data'
      }
    } // 添加请求头
    axios.post($config.BASEURL + '/api/upload/upload', param, config)
      .then(response => {
        resolve({
          code: response.data.code,
          data: response.data.url
          // data_src: response.data.data.src
        })
      }).catch(ErrorEvent => {
        reject(ErrorEvent)
      })
  })
  return p
}

// 获取app/浏览器/设备的运行环境
function getSyncDevice() {
  const app = navigator.userAgent
  let deviceuid = false
  document.addEventListener('plusready', function() {
    plus.navigator.setUserAgent('webapp')
    deviceuid = plus.device.uuid
  })
  const p = new Promise(function(resolve, reject) {
    const obj = {
      app: app,
      navigator: navigator,
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
      deviceuid: deviceuid
    }
    resolve(obj)
  })
  return p
}

// 倒计时
function transformTime(seconds) {
  if (seconds !== 0) {
    const hour = Math.floor(seconds / Math.pow(60, 2))
    // 计算剩余秒数
    const j = seconds % Math.pow(60, 2)
    // 计算剩余分钟
    const minute = Math.floor(j / 60)
    // 剩余秒数
    const second = j % 60
    return { hour, minute, second }
  } else {
    return { hour: 0, minute: 0, second: 0 }
  }
}

function eidtFormat(time) {
	time = time.replace(/-/g, '/')
	const date = new Date(time)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const second = date.getSeconds()
  return {
    date: (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day),
    time: (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min)
  }
}

// 生成随机字符串
function generateRandomAlphaNum(len) {
  let rdmString = ''
  for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
  return rdmString.substr(0, len)
}

export default {
  urlToBase64,
  getSyncDevice,
  picture,
  base64ToFile,
  transformTime,
  eidtFormat,
  generateRandomAlphaNum
}
