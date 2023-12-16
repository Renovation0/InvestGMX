export default {
  get(key) {
    return localStorage.getItem(key)
  },
  set(key, token) {
    return localStorage.setItem(key, token)
  },
  remove(key) {
    return localStorage.removeItem(key)
  },
  getLocalStorageAndTime (key, exp = 86400000) {
    // 获取数据
    let data = localStorage.getItem(key)
    if (!data) return null
    let dataObj = JSON.parse(data)
    // 与过期时间比较
    if (new Date().getTime() - dataObj.time > exp) {
      // 过期删除返回null
      localStorage.removeItem(key)
      console.log('信息已过期')
      return null
    } else {
      return dataObj.data
    }
  },
  setLocalStorageAndTime (key, value) {
    localStorage.setItem(key, JSON.stringify({ data: value, time: new Date().getTime() }))
  }
}
