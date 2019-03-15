// 返回空对象
export const noop = () => { };

/**
 * 判断对象类型
 * @param [obj: any] 参数对象
 * @returns String
 */
export function isType(obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
}

/**
 * 判断是否非空
 * @param [object: any] 参数对象
 * @returns Boolean
 */
export function isNotEmpty(object) {
  const type = isType(object);
  if (type === 'array') {
    return !!object.length;
  } else if (type === 'object') {
    return !!Object.keys(object).length;
  } else if (type === 'string') {
    return !!object.length;
  } else if (type === 'boolean') {
    return object;
  } else {
    return false;
  }
}

/**
 * 取消冒泡
 * @returns void
 */
export function cancelBubble(evt?: any) {
    let e = (evt) ? evt : window.event;
    if (window.event) {   // IE
        e.cancelBubble = true;
    } else {    // 非 IE
        e.stopPropagation();
    }
}

/**用于将空字符串的数据修改为null */
export function setDataNull(data) {
  let field = {
      ...data
  };
  for (let d in field) {
      if (field.hasOwnProperty(d)) {
          if (isType(field[d]) === 'string' && field[d].trim() === '') {
              field[d] = null;
          } else if (isType(field[d]) === 'object') {
              field[d] = setDataNull(field[d]);
          }
      }
  }
  return field;
}

// 用于将null的数据修改为空字符串
export function setNullEmpty(data) {
  let field = {
    ...data
  };
  for (let d in field) {
    if (field.hasOwnProperty(d)) {
      if (isType(field[d]) === 'null') {
        field[d] = '';
      } else if (isType(field[d]) === 'object') {
        field[d] = setNullEmpty(field[d]);
      }
    }
  }
  return field;
}

//判断是否为有效值,ps: 只判断string，number，boolean
export function isInvalid(value) {
  // 排除undefined,null,空字符串
  let InvalidType = ['undefined', 'null', 'string'];
  return InvalidType.includes(isType(value)) && !isNotEmpty(value);
}

//返回有效值的值，0，false，string，number，若无效返回空字符串
export function effectiveValue(value) {
    let InvalidType = ['number', 'boolean'];
    if (isInvalid(value) && !(InvalidType.includes(isType(value)))) {
        return '';
    } else {
        return value;
    }
}

// 关闭当前页面并刷新上级页面
export function closeAndReloadOpener() {
  if (window.opener) {
    window.opener.location.reload();
  }
  window.close();
}

// 不足10补0
export function fixTen(num) {
  return ('0' + num).slice(-2);
}