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

    this.socket.on('rooms/leaveSuccess', () => {
      this.$toast.success('Left room successfully!');
      this.$auth.user.room_id = '';
      this.$router.push('/');
    });

    this.socket.on('exception', (err) => {
      this.$toast.error(err.emitError);
    });
    
  },
  beforeDestroy() {
    this.socket.removeAllListeners();
  },
  methods: {
    async logout() {
      this.$toast.show('Logging out...');
      this.socket.emit('rooms/leave');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
