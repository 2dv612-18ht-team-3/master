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
          <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
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
  methods: {
    toggleCard: function() {
      document.getElementById('infoCard').classList.toggle('hidden')
    },

    checkLogin: function() {
      const user = JSON.parse(localStorage.getItem('user'))
      console.log(user)
      return user === null
    }
  },
  mounted() {
    setInterval(() => {
      const loggedIn = this.checkLogin()
      if (!loggedIn) {
        const el = document.getElementById('infoMessageContainer').classList.remove('hidden')
      } else {
        const el = document.getElementById('infoMessageContainer').classList.add('hidden')
      }
    }, 1000)
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
  width: 500px;
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
