class ApiView {

  static render(response) {
    var html = "<div class=\"results\">"

  $.each(response, function(index, api) {
    var individual = `<a id=${api.id} class="api-base-link" href="#"> ${api.site_name}</a>`
    html += individual
  })

  html += "</div>"
  $("#existing-api-links").html(html)
  createApiListeners()
  }

  static individualApiRender(response) {
    // fix navbar
    ApiView.buildNavBar(response)
    // populate main-body with keys on 2nd level . arrays/objects are clickable while strings are stated

  }

  static buildNavBar(response) {
    let navBarPaths = response.main_paths

    let headers = navBarPaths.map(function(path) {
      return path["main_branch"]
    })


  }
}
