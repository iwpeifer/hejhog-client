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

static mainPathRender(response){
  console.log(response)
  if (response.constructor === Array){
    Api.renderArray(response)
  } else if (response.constructor === Object){
    var results = response.results
    Api.renderArray(results, response.next)
  }
}

static renderArray(array, nextLink){
  var html = `<p><a href=${nextLink}>Next</a></p>`
  html += "<ul>"
  array.map((el) => {
    for (var key in el) {
      html += `${key}: ${el[key]}<br>`
    }
  })
  html += "</ul>"
  $("#main-body").html(html)
}

static renderObject(object){
  var html = "<ul>"
  for (var key in object) {

    html += `${key}: ${object[key]}<br>`
  }
  html += "</ul>"
  $("#main-body").html(html)
}

}
