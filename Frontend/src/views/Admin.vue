<template>
  <div class="submit-wrapper">
    <h4 class="text">Admin page</h4>
   <div class="section">
      <div>
      <form class="col s8" method="post">
        <div class="input-field col s6">
          <input id="cclass" type="text" class="validate">
          <label for="text">New Customer Class</label>
        </div>
        
        <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="btn_submit"
          v-on:click="submit">
          Submit
        </button>
      </form>
    </div> 
   </div>
   <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <textarea id="messageBox" class="materialize-textarea"></textarea>
          <label for="textarea1">Important message</label>
        </div>
      </div>
      <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="btn_submit"
          v-on:click="submitMessage">
          Submit Message
        </button>
    </form>
  </div>
  </div>
</template>
<script>
  export default {
    name: 'Admin',
    components: {

    },
    methods: {
      submit: function (event) {
        event.preventDefault()
        const request=require('request')
        let backendUrl = '127.0.0.1:3000'
        if (process.env.VUE_APP_ENVIRONMENT==="production"){
        backendUrl='194.47.206.226:3000'
        }
        request.post({ url: 'http://'+backendUrl+'/admin', 
          form:{ cclass: document.getElementById("cclass").value }}, function(err, response, body) {
          let data = JSON.parse(body)
            if (err||response.statusCode!==200){
             window.M.toast({
             html: data.message,
             classes: 'deep-orange accent-4 black-text',
             displayLength: 6000
             })
            } else {
               window.M.toast({
               html: data.message,
               classes: 'green darken-1'
             })
            }
        })
      },

      submitMessage: function(event) {
        event.preventDefault()
        const request=require('request')
        const message = document.getElementById('messageBox').value
        console.log(message)

        let backendUrl = "127.0.0.1:3000";
        if (process.env.VUE_APP_ENVIRONMENT === "production") {
          backendUrl = "194.47.206.226:3000";
        }

        request.post({ url: 'http://'+backendUrl+'/message', 
          form:{ message: message }}, function(err, response, body) {
          let data = JSON.parse(body)
            if (err||response.statusCode!==200){
             window.M.toast({
             html: 'data.message',
             classes: 'deep-orange accent-4 black-text',
             displayLength: 6000
             })
            } else {
               window.M.toast({
               html: 'data.message',
               classes: 'green darken-1'
             })
            }
        })
      }
  }
  }
</script>
<style>
  .submit-wrapper {
    width: 50%;
    margin: 0 auto;
  }
</style>
