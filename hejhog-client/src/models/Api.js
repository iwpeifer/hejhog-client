class Api {

  constructor(site_name, base_url) {
    this.site_name = site_name
    this.base_url = base_url
  }

  static all(callbackFn) {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000//api/v1/base_urls',
      contentType: 'application/json',
      dataType: 'json',
      success: function(response) {
        callbackFn(response)
      }
    })
  }

  static individualApiCall(callbackFn, baseId) {
    $.ajax({
      type: 'GET',
      url: `http://localhost:3000//api/v1/base_urls/${baseId}`,
      contentType: 'application/json',
      dataType: 'json',
      success: function(response) {
        callbackFn(response)
      }
    })
  }

  static callActualApi(baseUrl, mainPath, callbackFn) {
    $.ajax({
      type: 'GET',
      url: `${baseUrl}${mainPath}`,
      contentType: 'application/json',
      dataType: 'json',
      success: function(response) {
        callbackFn(response)
      }
    })
  }

  static addApi(values) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/api/v1/zoos',
      contentType: 'application/json',
      dataType: 'json',
      data: values,
      success: function(response) {
        ZooView.addZoosToDom(response)
        Zoo.all(Zoo.refreshMap)
      }
    })
  }

  static checkType(el, name) {
    var html = ""

    if (typeof el === 'string' && el.startsWith("https://")) {
      html += `<li><a href="#" class="sub-link" data-url=${el}>${name}</a></li>`
    } else if ((Object.prototype.toString.call(el) === '[object Object]') && (Object.keys(el).length > 1)) {

      if (el["url"] != undefined) {
        var url = el["url"]
        html += `<li><a href="#" class="sub-link" data-url=${url}>${name}</a></li>`
      } else {
        Api.renderObject(el)
      }

    } else if ((Object.prototype.toString.call(el) === '[object Object]') && (Object.keys(el).length === 1)) {

      if (el["url"] != undefined) {
        html += `<li><a href="#" class="sub-link" data-url=${el["url"]}>${name}</a></li>`
      } else {
        html += `<li>${Object.keys(el).join()}${Object.values(el).join()}</li>`
      }

    } else if ((Object.prototype.toString.call(el) === '[object Object]') && (Object.keys(el).length === 0)) {
      // render nothing
    } else {
      html += `<li>${el}</li>`
    }

    return html
  }

  static mainPathRender(response) {
    if (response.constructor === Array) {
      Api.renderArray(response)
    } else if (response.constructor === Object) {
      var results
      if (response.results != undefined) {
        results = response.results
        Api.renderArray(results, response.next)
      } else {
          Api.renderObject(response)
      }
    }
  }

  static renderArray(array, nextLink) {
    var html = `<p><a href=${nextLink}>Next</a></p>`
    html += "<ul>"

    array.forEach((el) => {
      var name = Api.getName(el)
      html += Api.checkType(el, name)
    })

    html += "</ul>"

    $("#existing-api-links").html(html)
    createSubLinksListeners()
  }

  static renderObject(response) {
    var html = "<ul>"

      for(var key in response) {

        if ((Object.prototype.toString.call(response[key]) === '[object Array]')) {

          html += `${key}: <ul>`

          response[key].forEach(function(el) {
            var name = Api.getName(el)
            console.log(name)
            html += Api.checkType(el, name)
          })

          html += "</ul>"
        } else {
          html += `<li>${key}: ${response[key]}</li>`
        }
      }

    html += "/<ul>"

    $("#main-body").html(html)
    createSubLinksListeners()
  }

  static callSubLinks(target_url, callbackFn) {
    $.ajax({
      type: 'GET',
      url: `${target_url}`,
      contentType: 'application/json',
      dataType: 'json',
      success: function(response) {
        callbackFn(response)
      }
    })
  }

  static getName(response) {
    var name = ""

    if (response.hasOwnProperty("name") && response["name"] !== ""){
      name = response["name"]
    } else if (typeof response === 'string' && response.startsWith("https://")) {
       name = Api.callSubLinks(response, Api.getName)
    } else {
      var arr = Object.values(response)
      if (arr[0].startsWith("http")){
        arr.shift()
      }
      if (arr[0] === ""){
        var longest = arr.reduce(function(a, b) {
          return a.length > b.length ? a : b
        })
        name = longest
      } else {
        name = arr[0]
      }
    }
    console.log("retrieving", name)
    return name
  }
}
