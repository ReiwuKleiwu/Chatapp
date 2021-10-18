<template>
  <div class ="app">
    <div class ="container">
        <button>Logout</button>
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
      }
    });
    
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
