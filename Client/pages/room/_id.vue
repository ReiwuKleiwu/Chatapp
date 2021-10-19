<template>
  <div class ="app">
    <div class ="container">
        <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'room',
  components: {
  },
  data: () => ({
  }),
  mounted() {
    const token = localStorage.getItem('auth._token.local');

    this.socket = this.$nuxtSocket({
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: token
          }
        }
      },
       persist: 'chatSocket'
    });
    
  },
  methods: {
    async logout() {
      this.$toast.show('Logging out...');
      console.log(this.$root);
      this.socket.emit('rooms/logout', (resp) => {
        console.log('Success!');
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
