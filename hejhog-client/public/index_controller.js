$(document).ready(function(){
  getAPI()
})

function getAPI() {
  Api.all(ApiView.render)

}

function createApiListeners() {
  $(".api-base-link").click(function(e){
    var baseId = this.id

    Api.individualApiCall(ApiView.individualApiRender, baseId)
  })
}

function createMainPathListeners(baseUrl) {
  $(".main-path").click(function(e){
    var mainPath = this.id

    // call ajax to get specific apis information rendered
    Api.callActualApi(baseUrl, mainPath, ApiView.mainPathRender)
  })
}
