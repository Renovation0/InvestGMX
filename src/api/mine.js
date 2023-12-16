import request from '@/utils/request'

/**
 *mine
 *
 * @export
 * @returns
 */
export function getMine(data = {}) {
  return request({
    url: '/api/Personal/myIndex',
    method: 'post',
    data: data
  })
}

/**
 *mine
 *
 * @export
 * @returns
 */
 export function getmail(data = {}) {
  return request({
    url: '/api/Personal/mail',
    method: 'post',
    data: data
  })
}

/**
 *task data
 *
 * @export
 * @returns
 */
export function getTaskInfo(data = {}) {
  return request({
    url: '/api/Personal/taskList',
    method: 'post',
    data: data
  })
}
/**
 *task award
 *
 * @export
 * @returns
 */
export function putTaskAward(data = {}) {
  return request({
    url: '/api/Personal/getTask',
    method: 'post',
    data: data
  })
}

/**
 *querybank
 *
 * @export
 * @returns
 */
 export function querybank(data = {}) {
  return request({
    url: '/api/Personal/querybankinfo',
    method: 'post',
    data: data
  })
}

/**
 *newteam
 *
 * @export
 * @returns
 */
 export function getTeamnew(data = {}) {
  return request({
    url: '/api/Personal/team_new',
    method: 'post',
    data: data
  })
}
/**
 *team
 *
 * @export
 * @returns
 */
export function getTeam(data = {}) {
  return request({
    url: '/api/Personal/team',
    method: 'post',
    data: data
  })
}

/**
 *invite data
 *
 * @export
 * @returns
 */
export function getInviteInfo(data = {}) {
  return request({
    url: '/api/Personal/levelList',
    method: 'post',
    data: data
  })
}

/**
 *recharge
 *
 * @export
 * @returns
 */
export function getRechargeInfo(data = {}) {
  return request({
    url: '/api/Personal/rechangeRender',
    method: 'post',
    data: data
  })
}

/**
 *recharge
 *
 * @export
 * @returns
 */
export function putRecharge(data = {}) {
  return request({
    url: '/api/Personal/rechange',
    method: 'post',
    data: data
  })
}

/**
 *withdraw
 *
 * @export
 * @returns
 */
export function getWithdrawInfo(data = {}) {
  return request({
    url: '/api/Personal/withdrawalRender',
    method: 'post',
    data: data
  })
}

/**
 *withdraw
 *
 * @export
 * @returns
 */
export function putWithdraw(data = {}) {
  return request({
    url: '/api/Personal/Withdrawal',
    method: 'post',
    data: data
  })
}

/**
 *bankList
 *
 * @export
 * @returns
 */
export function getBankList(data = {}) {
  return request({
    url: '/api/Personal/paymentList',
    method: 'post',
    data: data
  })
}

/**
 *add bank
 *
 * @export
 * @returns
 */
export function putAddBank(data = {}) {
  return request({
    url: '/api/Personal/paymentMethod',
    method: 'post',
    data: data
  })
}

/**
 *bank detail
 *
 * @export
 * @returns
 */
 export function bankDetail(data = {}) {
  return request({
    url: '/api/Personal/paymentDetail',
    method: 'post',
    data: data
  })
}

/**
 *del bank
 *
 * @export
 * @returns
 */
 export function delBank(data = {}) {
  return request({
    url: '/api/Personal/paymentDel',
    method: 'post',
    data: data
  })
}

/**
 *account log
 *
 * @export
 * @returns
 */
export function getAccountLog(data = {}) {
  return request({
    url: '/api/Personal/accountLog',
    method: 'post',
    data: data
  })
}

/**
 *roder
 *
 * @export
 * @returns
 */
export function getOrderList(data = {}) {
  return request({
    url: '/api/Personal/revenueRecordList',
    method: 'post',
    data: data
  })
}


/**
 *earning log
 *
 * @export
 * @returns
 */
export function getEarningLog(data = {}) {
  return request({
    url: '/api/Personal/recordList',
    method: 'post',
    data: data
  })
}

/**
 *edit language
 * @export
 * @param {*} data
 * @returns
 */
 export function putEditLanguage(data = {}) {
  return request({
    url: '/api/Personal/change_lange',
    method: 'post',
    data: data
  })
}