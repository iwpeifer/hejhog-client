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

  static individualApiCall(callbackFn, index) {
    $.ajax({
      type: 'GET',
      url: `http://localhost:3000//api/v1/base_urls/${index}`,
      contentType: 'application/json',
      dataType: 'json',
      success: function(response) {
        callbackFn(response)
      }
    })
  }

static addZoo(values) {
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
}
