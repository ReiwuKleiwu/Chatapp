<template>
  <div class="home">
    <div class="content-wrapper">
      <div class="logo-wrapper">
        <img src="~/assets/images/logo.png" />
      </div>
      <div class="form-wrapper">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="">Username</label>
            <input type="text" v-model="username" placeholder="Username" required/>
          </div>
          <div class="form-group">
            <label for="">Password</label>
            <input type="password" v-model="password" placeholder="Password" required/>
          </div>
          <div class="form-action">
            <button type="submit">Enter</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '../Slider'

export default {
  name: 'Userlogin',
  components: {
    Slider,
  },
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    async handleSubmit() {
      try {

        this.$toast.show('Logging in...');

        let response = await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
            avatar: 'icon_bakyura'
          }
        });
        
        if(response.data.accessToken)
          this.$toast.success('Successfully logged in!')

        this.$router.push('/');

      } catch (err) {
        if(Array.isArray(err.response.data.message)) {
          for(const message of err.response.data.message) {
          this.$toast.error(message);
        }
        }
        else {
          this.$toast.error(err.response.data.message);
        }
        
      }
    }
  }
}
</script>
