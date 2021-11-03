<template>
  <div class="menu">
    <div class="menu--user">
      <img :src="require(`~/assets/avatars/${this.$auth.user.avatar}.png`)" :alt="this.$auth.user.username" class="menu--user-avatar" />
      <div class="menu--user-name" :style="{ color: this.$auth.user.element_color }">
        {{ this.$auth.user.username }}
      </div>
    </div>
    <button class="menu--logout">Logout</button>
    <div class="menu--section">
      <button
        class="menu--section-toggler"
        :class="{ 'menu--section-toggler_active': createRoomOpen }"
        @click="createRoomOpen = !createRoomOpen"
      >
        <div class="menu--section-toggler-chevron">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <div class="menu--section-toggler-label">create room</div>
      </button>
      <div v-if="createRoomOpen" class="menu--section-content">
        <Input :value.sync="form.name" label="Room name" />
        <Input :value.sync="form.password" label="Password" type="password" />
        <Input
          :value.sync="form.description"
          label="Room description"
          :textarea="true"
        />
        <Select
          :value="form.capacity"
          label="Capacity"
          :options="capacityOptions"
          @select="form.capacity = $event"
        />
        <Select
          :value="form.language"
          label="Language"
          :options="languageOptions"
          @select="form.language = $event"
        />
        <button class="menu--createBtn" v-on:click="handleSubmit">Create</button>
      </div>
    </div>
    <div class="menu--section">
      <button
        class="menu--section-toggler"
        :class="{ 'menu--section-toggler_active': roomFilterOpen }"
        @click="roomFilterOpen = !roomFilterOpen"
      >
        <div class="menu--section-toggler-chevron">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <div class="menu--section-toggler-label">room filter</div>
      </button>
    </div>
  </div>
</template>

<script>

import Input from '../lounge/Input'
import Select from '../lounge/Select'


export default {
  name: "LayoutMenu",
  components: {
    Input,
    Select
  },
  data() {
    return {
      createRoomOpen: false,
      roomFilterOpen: false,
      capacityOptions: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      languageOptions: ['EN', 'DE', 'NL', 'GR', 'JP'],
      form: {
        name: "",
        description: "",
        password: "",
        capacity: "1",
        language: "EN",
        is_adult: true,
        is_music: true,
        is_knock: true,
        is_registered_only: true,
        is_static: false,
        tags: []
      },
    };
  },
  methods: {
        async handleSubmit() {

        this.$toast.show('Creating Room...');

        this.$parent.$parent.socket.emit('rooms/create', {
            name: this.form.name,
            description: this.form.description,
            language: this.form.language,
            password: this.form.password,
            capacity: this.form.capacity,
            is_adult: this.form.is_adult,
            is_music: this.form.is_music,
            is_knock: this.form.is_knock,
            is_registered_only: this.form.is_registered_only,
            is_static: this.form.is_static,
            tags: this.form.tags
        }, (resp) => {
            this.$toast.success('Room successfully created!');
    });
    }
  }
};
</script>
