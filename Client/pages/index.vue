<template>
<div class="app">
  <LayoutHeader />
  <main class="main">
  <div class="homePage">
    <div class="homePage--roomDetails">
      <div class="homePage--roomDetails-rooms">
        {{ totalRooms }} room<template v-if="totalRooms > 1">s</template>
      </div>
      <div class="homePage--roomDetails-users">
        {{ totalUsers }} user<template v-if="totalUsers > 1">s</template>
      </div>
    </div>
    <div class="homePage--rooms">
      <Room v-for="(room, index) in rooms" :key="index" :room="room" />
    </div>
  </div>
  </main>
  <LayoutFooter />
</div>
</template>

<script>
import Room from '../components/lounge/Room';

export default {
  name: 'Index',
  components: {
    Room
  },
  data: () => ({
    rooms: []
  }),
  computed: {
    totalRooms() {
      return this.rooms.length;
    },
    totalUsers() {
      return this.rooms.reduce((acc, e) => {
        acc += e.users.length;
        return acc;
      }, 0);
    },
  },
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

    this.getRooms();

    this.socket.on('rooms/update', (rooms) => {
      this.rooms = rooms;
    });

    this.socket.on('rooms/joinSuccess', (room_id) => {
        this.$toast.success('Joined room successfully!');
        this.$auth.user.room_id = room_id;
        this.$router.push(`/room/${room_id}`);
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

<style lang="scss">
@import "@/assets/styles/main.scss";
</style>
