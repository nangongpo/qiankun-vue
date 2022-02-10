export const homeMenuData = {
  title: '首页',
  moduleName: 'main',
  name: 'home',
  path: '/home',
  icon: 'el-icon-menu',
  meta: {}
}
// 查找数组末级节点
export const getLastLevelNode = (list) => {
  let result = []
  if (!Array.isArray(list) || !list.length > 0) return false
  for (let index = 0; index < list.length; index++) {
    const item = list[index]
    if (item.children && item.children.length > 0) {
      result = [...result, ...getLastLevelNode(item.children)]
    } else {
      result.push(item)
    }
  }
  return result
}

// 将骆驼命名规则的字符串转换成使用短横线命名法的字符串, 并且全小写
export function kebabCase(str) {
  const hyphenateRE = /([^-])([A-Z])/g
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}

// 将短横线命名法的字符串转换成使用骆驼命名规则的字符串
export function camelCase(name) {
  return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(/^moz([A-Z])/, 'Moz$1')
}

/**
 * @param {string} str value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  if (!str) return str
  str = typeof (str) === 'string' ? str : String(str)
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * 检验数据类型
 * @param {any} data
 * @param {string} type
 * @returns {string|boolean}
 */

export function checkType(data, type) {
  const _type = Object.prototype.toString.call(data).slice(1, -1).split(' ')[1].toLowerCase()
  if (type) {
    return _type === type.toLowerCase()
  }
  return _type
}

/**
 * 文本添加换行符
 * @param {string} value
 * @param {number} length
 */
export function textWrap(value, length) {
  let str = ''
  const valueLength = value.length
  var rows = Math.ceil(valueLength / length) // 需要换行的行数
  if (rows > 1) {
    for (let i = 0; i < rows; i++) {
      let temp = ''
      const start = i * length
      const end = start + length
      temp = value.substring(start, end) + '\n'
      str += temp
    }
    return str
  } else {
    return value
  }
}

/**
 * 去抖动
 * @param {*} func 
 * @param {*} wait 
 * @param {*} immediate 
 * @returns {function}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    const last = +new Date() - timestamp

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
