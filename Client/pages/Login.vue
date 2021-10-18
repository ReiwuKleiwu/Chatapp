<template>
 <div>
    <AppHeader @pageChange="handlePageChange" />
    <div class="container">
      <template v-if="selected === 'login'">
        <Userlogin />
      </template>

      <template v-if="selected === 'anonymous-login'">
          <AnonymousLogin />
      </template>

      <template v-if="selected === 'register'">
          <Register @registered="handlePageChange" />
      </template>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '../components/Header'
import AppFooter from '../components/Footer'
import Userlogin from "../components/login-page/Login";
import AnonymousLogin from "../components/login-page/AnonymousLogin";
import Register from "../components/login-page/Register";

export default {
  name: 'Login',
  components: {
    AppHeader,
    AppFooter,
    AnonymousLogin,
    Userlogin,
    Register
  },
  data: () => ({
    selected: 'login'
  }),
  methods: {
     handlePageChange(page) {
      this.selected = page
  }
  },

}
</script>
