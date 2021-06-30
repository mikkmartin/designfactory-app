export const objectToParams = (object: Object) => {
  var pairs = [],
    add = function (key, value) {
      pairs.push(key + '=' + value)
    }
  for (var name in object) {
    buildParam(name, object[name], add)
  }
  return pairs.join('&').replace(/%20/g, '+')
  function buildParam(prefix, obj, add) {
    if (Array.isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; ++i) {
        var inner = obj[i]
        var shouldIncludeIndex = typeof inner === 'object'
        var arrayIndex = shouldIncludeIndex ? '[' + i + ']' : '[]'
        buildParam(prefix + arrayIndex, inner, add)
      }
    } else if (obj && typeof obj === 'object') {
      for (var name in obj) {
        buildParam(prefix + '[' + name + ']', obj[name], add)
      }
    } else {
      add(prefix, obj)
    }
  }
}

var digitTest = /^\d+$/,
  keyBreaker = /([^\[\]]+)|(\[\])/g,
  paramTest = /([^?#]*)(#.*)?$/,
  entityRegex = /%([^0-9a-f][0-9a-f]|[0-9a-f][^0-9a-f]|[^0-9a-f][^0-9a-f])/i,
  startChars = { '#': true, '?': true },
  prep = function (str) {
    if (startChars[str.charAt(0)] === true) {
      str = str.substr(1)
    }
    str = str.replace(/\+/g, ' ')

    try {
      return decodeURIComponent(str)
    } catch (e) {
      return decodeURIComponent(
        str.replace(entityRegex, function (_, hex) {
          return '%25' + hex
        })
      )
    }
  }

function isArrayLikeName(name) {
  return digitTest.test(name) || name === '[]'
}

function idenity(value) {
  return value
}

export const urlToJson = (url, valueDeserializer = undefined) => {
  const params = url.split('?')[1]
  valueDeserializer = valueDeserializer || idenity
  var data: any = {},
    pairs,
    lastPart
  if (params && paramTest.test(params)) {
    pairs = params.split('&')
    pairs.forEach(function (pair) {
      var parts = pair.split('='),
        key = prep(parts.shift()),
        value = prep(parts.join('=')),
        current = data
      if (key) {
        parts = key.match(keyBreaker)
        for (var j = 0, l = parts.length - 1; j < l; j++) {
          var currentName = parts[j],
            nextName = parts[j + 1],
            currentIsArray = isArrayLikeName(currentName) && current instanceof Array
          if (!current[currentName]) {
            if (currentIsArray) {
              current.push(isArrayLikeName(nextName) ? [] : {})
            } else {
              // If what we are pointing to looks like an `array`
              current[currentName] = isArrayLikeName(nextName) ? [] : {}
            }
          }
          if (currentIsArray) {
            current = current[current.length - 1]
          } else {
            current = current[currentName]
          }
        }
        lastPart = parts.pop()
        if (isArrayLikeName(lastPart)) {
          current.push(valueDeserializer(value))
        } else {
          current[lastPart] = valueDeserializer(value)
        }
      }
    })
  }
  return data
}
