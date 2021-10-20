<template>
  <div class ="app">
    <div class ="container">
        <button @click="logout">Logout</button>
        <form>
          <textarea name="message" type="text" id="message" cols="10" rows="5" v-model="message.content"></textarea>
          <textarea name="to" type="text" id="to" cols="10" rows="5" v-model="message.to"></textarea>
          <button @click.prevent="sendMessage">SEND MESSAGE</button>
        </form>
        <p>{{room}}</p>
        <p>{{message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'room',
  components: {
  },
  data: () => ({
    room: {}, 
    message: {
      content: '',
      to: ''
    }
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

    this.getRoomData();

    this.socket.on('rooms/leaveSuccess', () => {
      this.$toast.success('Left room successfully!');
      this.$auth.user.room_id = '';
      this.$router.push('/');
    });
    
    this.socket.on('rooms/message', (message) => {
      this.room.messages.push(message);
    });

    this.socket.on('exception', (err) => {
      if(err.message) {
        this.$toast.error(err.message);
      }
      else {
        this.$toast.error(err.emitError);
      }
    });
    
  },
  beforeDestroy() {
    this.socket.removeAllListeners();
  },
  methods: {
    async logout() {
      this.$toast.show('Logging out...');
      this.socket.emit('rooms/leave');
    },
    async getRoomData() {
      this.socket.emit('rooms/data', (room) => {
        this.room = room;
      });
    }, 
    async sendMessage() {
      this.socket.emit('rooms/message', this.message);
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
