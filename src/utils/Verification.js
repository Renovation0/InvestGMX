// 18位身份证号码
function isIdCard(str) {
  const ver = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  return ver.test(str)
}

// 输入中文姓名
function isRealName(str) {
  const ver = /[\u4e00-\u9fa5]/gm
  return ver.test(str)
}

// 验证密码只能是英文和数字
function isValidPass(str) {
  const ver = /^[a-z0-9]+$/i
  return ver.test(str)
}

// 验证密码必须包含字母+数字，至少8个字符，最多18个字符
function isValidPassGroup(str) {
  const ver = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/
  return ver.test(str)
}

// 验证手机号码
function isTel(str) {
  const ver = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[35678]|18[0-9]|14[57]|199)[0-9]{8}$/
  return ver.test(str)
}

// 验证邮箱
function isEmail(str) {
  const ver = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  return ver.test(str)
}

// 验证日期
function isDate(str) {
  const ver = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/
  return ver.test(str)
}

// 是否是小数
function isDecimal(str) {
  const ver = /^\d+\.\d+$/
  return ver.test(str)
}

// 是否是数字
function isNumber(str) {
  const ver = /^\d+$/
  return ver.test(str)
}

// 是否是html标签
function isHtml(str) {
  const ver = /<(.*)>.*<\/\1>|<(.*) \/>/
  return ver.test(str)
}

// 是否由数字和字母组成
function isNumLetter(str) {
  const ver = /^[A-Za-z0-9]+$/
  return ver.test(str)
}
// 是否小写字母组成
function isMinLetter(str) {
  const ver = /^[a-z]+$/
  return ver.test(str)
}

// 收款账号
function isrealContact(str) {
  const ver = /^[A-Za-z0-9@.]+$/
  return ver.test(str)
}

// 银行卡号
function isBacknumber(str) {
  const ver = /^([1-9]{1})(\d{15}|\d{18})$/
  return ver.test(str)
}

// 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
function isStrongPass(str) {
  const ver = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
  return ver.test(str)
}
// 只包含中文和数字
function isChineseNum(str) {
  const ver = /^(([\u4E00-\u9FA5])|(\d))+$/
  return ver.test(str)
}

var tool = {
  isIdCard,
  isRealName,
  isValidPass,
  isBacknumber,
  isValidPassGroup,
  isTel,
  isEmail,
  isDate,
  isDecimal,
  isHtml,
  isNumLetter,
  isMinLetter,
  isStrongPass,
  isChineseNum,
  isrealContact,
  isNumber

}
export default tool
