// 从目标对象排除指定属性
export function getExcludeAttrs(keys, target) {
  const obj = {}
  for (const key in target) {
    if (!keys.includes(key)) obj[key] = target[key]
  }
  return obj
}

export function getFlatArray(columns) {
  return columns.reduce((result, v) => {
    return result.concat(Array.isArray(v.children) && v.children.length > 0 ? getFlatArray(v.children) : v)
  }, [])
}

export function getParentByClassName(element, className) {
  let returnParentElement = null
  function getpNode(element, className) {
    const pClassList = element.parentNode.getAttribute('class')
    const pNode = element.parentNode
    if (!pClassList) {
      getpNode(pNode, className)
    } else if (pClassList && !pClassList.includes(className)) {
      getpNode(pNode, className)
    } else if (pClassList && pClassList.includes(className)) {
      returnParentElement = pNode
    }
  }
  getpNode(element, className)
  return returnParentElement
}
