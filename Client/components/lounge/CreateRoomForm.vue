<template>
 <div class="form-wrapper">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="">Room Name</label>
            <input type="text" v-model="name" placeholder="Room Name" required/>
          </div>
          <div class="form-group">
            <label for="">Description</label>
            <input type="text" v-model="description" placeholder="Description"/>
          </div>
          <div class="form-group">
            <label for="">Language</label>
            <input type="text" v-model="language" placeholder="Language" required/>
          </div>
          <div class="form-group">
            <label for="">Password</label>
            <input type="text" v-model="password" placeholder="Password"/>
          </div>
          <div class="form-group">
            <label for="">Capacity</label>
            <input type="number" v-model="capacity" placeholder="Capacity" required/>
          </div>
          <div class="form-action">
            <button type="submit">Enter</button>
          </div>
        </form>
      </div>
</template>

<script>

export default {
  name: 'CreateRoomForm',
  components: {

  },
  data: () => ({
      name: '',
      description: '',
      language: '',
      password: '',
      capacity: '',
      is_adult: true,
      is_music: true,
      is_knock: true,
      is_registered_only: true,
      is_static: false,
      tags: []
  }),
  mounted() {},
  methods: {
    async handleSubmit() {

        this.$toast.show('Creating Room...');

        this.$parent.socket.emit('rooms/create', {
            name: this.name,
            description: this.description,
            language: this.language,
            password: this.password,
            capacity: this.capacity,
            is_adult: this.is_adult,
            is_music: this.is_music,
            is_knock: this.is_knock,
            is_registered_only: this.is_registered_only,
            is_static: this.is_static,
            tags: []
        }, (resp) => {
            this.$toast.success('Room successfully created!');
        });

    }
  }
}
</script>

<style lang="scss" scoped>
  .form-wrapper {
    width: 30%;
    padding: 50px;
  }
</style>