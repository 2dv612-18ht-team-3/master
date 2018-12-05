<template>
  <div>
    <div class="action-btn infomessage-button hidden" id="infoMessageContainer">
      <a class="btn-floating btn-large blue" v-on:click="toggleCard">
        <i class="large material-icons pulse">priority_high</i>
      </a>
    </div>
    <div class="infomessage-card hidden" id="infoCard">
      <div class="card blue">
        <div class="card-content white-text">
          <span class="card-title">Important message!</span>
          <p id="messagePara">{{ message }}</p>
        </div>
        <div class="card-action">
          <button
            class="btn"
            type="submit"
            name="action"
            v-on:click="dismissMessage">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Add "floating action button" as icon in the top right corner
// TODO: Create a basic card with an accept button

export default {
  name: 'InfoMessage',
  data() {
    return {
      message: ''
    }
  },
  methods: {
    toggleCard: function() {
      document.getElementById('infoCard').classList.toggle('hidden')
    },

    toggleCardContainer: function() {
      document.getElementById('infoMessageContainer').classList.toggle('hidden')
    },

    checkLogin: function() {
      const user = JSON.parse(localStorage.getItem('user'))
      return user !== null
    },

    dismissMessage: function(event) {
      event.preventDefault()
      const request=require('request')
      let backendUrl = "127.0.0.1:3000";
      if (process.env.VUE_APP_ENVIRONMENT === "production") {
        backendUrl = "194.47.206.226:3000";
      }

      const user = JSON.parse(localStorage.getItem('user'))

      request.post({ url: 'http://'+backendUrl+'/message/viewed', 
        form:{ email: user.email }}, function(err, response, body) {
        let data = JSON.parse(body)
          if (err||response.statusCode!==200){
            window.M.toast({
            html: 'data.message',
            classes: 'deep-orange accent-4 black-text',
            displayLength: 6000
            })
          }
      })

      console.log('Dismissing message...')
      this.toggleCard()
      this.toggleCardContainer()
    },

    getMessage: function() {
      const request=require('request')
      let backendUrl = "127.0.0.1:3000";
      if (process.env.VUE_APP_ENVIRONMENT === "production") {
        backendUrl = "194.47.206.226:3000";
      }
      
      const user = JSON.parse(localStorage.getItem('user'))
      let message
      request.get({ uri: 'http://'+backendUrl+'/message'}, function(err, res, body) {
        message = JSON.parse(body)
        
        if (user !== null) {
          if (message.viewed_by.includes(user.email) === false) {
            const adminMessage = message.message
            
            const loggedIn = user !== null
            const toggle = document.getElementById('infoMessageContainer').classList.contains('hidden')
            if (loggedIn && adminMessage !== '' && toggle) {
              console.log(adminMessage)
              document.getElementById('infoMessageContainer').classList.toggle('hidden')
              document.getElementById('messagePara').textContent = adminMessage
            }
          } 
        } else {
          if (document.getElementById('infoMessageContainer').classList.contains('hidden') === false) {
            document.getElementById('infoMessageContainer').classList.add('hidden')
          }

          if (document.getElementById('infoCard').classList.contains('hidden') === false) {
            document.getElementById('infoCard').classList.add('hidden')
          }
        }
        
      })
      
    }
  },
  mounted() {
    this.getMessage()

    setInterval(this.getMessage, 1000)
  }
}
</script>

<style>
.infomessage-button {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 99;
}

.infomessage-card {
  width: 80%;
  max-width: 500px;
  position: absolute;
  right: 60px;
  top: 50px;
  z-index: 99;
}

.hidden {
  visibility: hidden;
}

@keyframes pulse {
  0% {font-size: 24x;}
  50% {font-size: 36px;}
  100% {font-size: 24px;}
}
.pulse {
  animation: pulse 3s infinite ease-in-out;
}
</style>
