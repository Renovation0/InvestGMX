import request from '@/utils/request'


/**
 *get version
 wgt url
 *
 * @export
 * @returns
 */
 export function getmail(data = {}) {
  return request({
    url: '/api/Index/getmail',
    method: 'post',
    data: data
  })
}
/**
 *get version
 wgt url
 *
 * @export
 * @returns
 */
export function checkVersion(data = {}) {
  return request({
    url: '/api/login/versionUp',
    method: 'post',
    data: data
  })
}

/**
 * home info
 * @export
 * @returns
 */
export function getHomeInfo(data = {}) {
  return request({
    url: '/api/Index/index',
    method: 'post',
    data: data
  })
}

/**
home noticeList
 * @export
 * @returns
 */
export function homeSwiperNotice(data = {}) {
  return request({
    url: '/api/index/indexNoticeList',
    method: 'post',
    data: data
  })
}


/**
领取奖励列表
 * @export
 * @returns
 */
export function homeSwiperNotice_new(data = {}) {
  return request({
    url: '/api/index/indexNoticeListnew',
    method: 'post',
    data: data
  })
}

/**
 *notice detail
 *
 * @export
 * @returns
 */
 export function getNoticeDetail(data = {}) {
  return request({
    url: '/api/Index/noticeinfo',
    method: 'post',
    data: data
  })
}

/**
 *notice detail
 *
 * @export
 * @returns
 */
 export function getMailDetail(data = {}) {
  return request({
    url: '/api/Index/mailinfo',
    method: 'post',
    data: data
  })
}

/**
new notice
 * @export
 * @returns
 */
export function getNewNotice(data = {}) {
  return request({
    url: '/api/index/indexNotice',
    method: 'post',
    data: data
  })
}


/**
buy
 * @export
 * @returns
 */
export function putBuy(data = {}) {
  return request({
    url: '/api/index/buy_now',
    method: 'post',
    data: data
  })
}
