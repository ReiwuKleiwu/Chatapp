<template>
  <div class="home">
    <div class="content-wrapper">
      <div class="logo-wrapper">
        <img src="~/assets/images/logo.png" />
      </div>
      <div class="form-wrapper">
        <form @submit.prevent="handleSubmit">
          <Slider v-model="avatar" />
          <div class="form-group">
            <label for="">Username</label>
            <input type="text" v-model="username" placeholder="Username" required/>
          </div>
          <div class="form-group">
            <label for="">Email</label>
            <input type="email" v-model="email" placeholder="Email" required/>
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
import Slider from '../Slider.vue'

export default {
  name: 'Register',
  components: {
    Slider,
  },
  data: () => ({
    username: '',
    password: '',
    email: '',
    avatar: '',
  }),
  methods: {
    async handleSubmit() {
      try {

        this.$toast.show('Registering...');

        await this.$axios.$post('/auth/register', {
          username: this.username,
          password: this.password,
          email: this.email,
          avatar: this.avatar.split('.')[0]
        });

        this.$toast.success('Successfully registered!')

        this.$emit('registered', 'login');

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
