$(document).ready(function(){
  getAPI()
})

function getAPI() {
  Api.all(ApiView.render)

}

function createApiListeners() {
  $(".api-base-link").click(function(e){
    var index = this.id

    Api.individualApiCall(ApiView.individualApiRender, index)
  })
}
