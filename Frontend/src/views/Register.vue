<template>
  <div class="register-wrapper">
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="first_name" type="text" class="validate">
            <label for="first_name">First Name</label>
          </div>
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate">
            <label for="last_name">Last Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="email" class="validate">
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="password1" type="password" class="validate">
            <label for="password1">Password</label>
          </div>
          <div class="input-field col s6">
            <input id="password2" type="password" class="validate">
            <label for="password2">Confirm Password</label>
          </div>
        </div>
  <div class="input-field col s12">
    <select id="cClass">
      <option value="" disabled selected>Choose your profile</option>
    </select>
    <label>Customer profile selection</label>
  </div>
        <button
          class="btn
          waves-effect waves-light"
          type="submit"
          name="action"
          v-on:click="registerUser">
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import router from '../router'
const request = require('request')
import { backendUrl } from '../backendURL.js'
export default {
  mounted(){
  request.post({uri: backendUrl+'/admin/typedata', form: {}}, function(err,response,body){
  let data=JSON.parse(body)
  data.forEach(function(item){
   let opt = document.createElement('option')
   opt.value=item.customerClass
   opt.textContent=item.customerClass
   document.getElementById('cClass').appendChild(opt)
  })

  M.FormSelect.init(document.getElementById('cClass'))
  })

  },
  name: 'Register',
  components: {

  },
  methods: {
    registerUser: function (event) {
      event.preventDefault()

      if (document.getElementById('password1').value!==document.getElementById('password2').value){
        window.M.toast({
        html: 'Incorrect password confirmation, verify spelling',
        classes: 'deep-orange accent-4 black-text',
        displayLength: 6000
       })
        } else {
      let instance = document.getElementById('cClass')  
      console.log(instance.options[instance.selectedIndex].value)  
      request.post({ uri: backendUrl+'/user/signup',
        form: {
          password: document.getElementById('password1').value,
          email: document.getElementById('email').value,
          firstname: document.getElementById('first_name').value,
          lastname: document.getElementById('last_name').value,
          role: instance.options[instance.selectedIndex].value } },
          function(err, response, body){
            let data=JSON.parse(body)
            if (err||response.statusCode!==200){
             window.M.toast({
             html: data.error.errmsg,
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
    }
    }
  }
}

</script>

<style scoped>
.register-wrapper {
  width: 60%;
  margin: 0 auto;
}

/* ----------- Galaxy S6: Portrait and Landscape ----------- */
@media screen and (max-width: 360px)
and (device-height: 640px)
and (-webkit-device-pixel-ratio: 3) {
  .row label  {
    font-size: 11.5px;
  }
}

/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */

/* Portrait and Landscape */
@media only screen
and (min-device-width: 320px)
and (max-device-width: 568px)
and (-webkit-min-device-pixel-ratio: 2) {
  .row label  {
    font-size: 11.5px;
  }
}

/* ----------- iPhone 6, 6S, 7 and 8: Portrait and Landscape ----------- */
@media only screen and (min-device-width: 375px)
and (max-device-width: 667px)
and (-webkit-min-device-pixel-ratio: 2) {
  .row label  {
    font-size: 11.5px;
  }
}
</style>
