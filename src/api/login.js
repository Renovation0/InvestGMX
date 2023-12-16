import request from '@/utils/request'

/**
 *login
 * @export
 * @param {*} data
 * @returns
 */
export function userLogin(data = {}) {
  return request({
    url: '/api/Login/sign_in',
    method: 'post',
    data: data
  })
}

/**
 *login
 * @export
 * @param {*} data
 * @returns
 */
 export function userLogin_new(data = {}) {
  return request({
    url: '/api/Login/sign_in_new',
    method: 'post',
    data: data
  })
}

/**
 *register
 * @export
 * @param {*} data
 * @returns
 */
export function userRegister(data = {}) {
  return request({
    url: '/api/Login/register',
    method: 'post',
    data: data
  })
}

/**
 *outlogin
 mobile,
 password
 code
 * @export
 * @param {*} data
 * @returns
 */
export function logout(data) {
  return request({
    url: '/api/Login/login_out',
    method: 'post',
    data: data
  })
}

/**
 *forget
 *
 * @export
 * @param {*} data
 * @returns
 */
export function resetPassword(data = {}) {
  return request({
    url: '/api/login/forget_pass',
    method: 'post',
    data: data
  })
}
/**
 *sms
 *
 * @export
 * @param {*} data
 * @returns
 */
export function userCodeRegister(data = {}) {
  return request({
    url: '/api/login/sendRegister',
    method: 'post',
    data: data
  })
}

/**
 *get download url
 * @export
 * @param {*} data
 * @returns
 */
 export function addressDownload(data={}) {
  return request({
    url: '/api/login/getdownload',
    method: 'post',
    data: data
  })
}
