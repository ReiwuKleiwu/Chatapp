<template>
  <div class ="app">
    <div class ="container">
      <CreateRoomForm/>
      <SingleRoom v-for="(room, index) in rooms" :key="index" :room="room">{{room}}</SingleRoom>
      <!-- <h1 v-for="(room, index) in rooms" :key="index" :room="room">{{room}}</h1> -->
      <h1>{{this.$auth.user}}</h1>
    </div>
  </div>
</template>

<script>

import SingleRoom from '../components/lounge/SingleRoom'
import CreateRoomForm from '../components/lounge/CreateRoomForm'

export default {
  name: 'Index',
  components: {
    SingleRoom,
    CreateRoomForm
  },
  data: () => ({
    rooms: []
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

    this.getRooms();

    this.socket.on('rooms/update', (rooms) => {
      console.log(rooms);
      this.rooms = rooms;
    });

    this.socket.on('rooms/joinSuccess', (room_id) => {
        this.$toast.success('Joined room successfully!');
        this.$auth.user.room_id = room_id;
        this.$router.push(`/room/${room_id}`);
    });

  },
  methods: {
    getRooms () {
    return new Promise((resolve) => {
      this.socket.emit('rooms/get', (rooms) => {
        this.rooms = rooms;
        resolve();
      })
    })
  }
  }
}
</script>

<style lang="scss" scoped>

</style>
