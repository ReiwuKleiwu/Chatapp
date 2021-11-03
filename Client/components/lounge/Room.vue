<template>
  <div class="room">
    <div class="room--top">
      <div class="room--left">
        <div class="room--host">
          <img
            :src="require(`~/assets/avatars/${room.host.avatar}.png`)"
            :alt="room.host.username"
            class="room--host-avatar"
          />
          <div class="room--host-name" :style="{ color }">
            {{ room.host.username }}
          </div>
          <div class="room--host-host">Host</div>
        </div>
        <img
          :src="require(`@/assets/flags/${room.language}.png`)"
          :alt="room.language"
          :title="room.language"
          class="room--flag"
        />
        <div class="room--options">
          <svg
            v-if="room.is_music"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            :stroke="color"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            viewBox="0 0 24 24"
          >
            <path :stroke="color" d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" :fill="color" />
            <circle cx="18" cy="16" r="3" :fill="color" />
          </svg>
          <svg
            v-if="room.is_locked"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            :stroke="color"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <rect
              width="18"
              height="11"
              x="3"
              y="11"
              :fill="color"
              rx="2"
              ry="2"
            />
            <path stroke-width="3" d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <div v-if="room.is_adult" :style="{ color }">18<sup>+</sup></div>
        </div>
      </div>
      <div class="room--right">
        <div class="room--right-top">
          <h2 class="room--name">
            {{ room.name }}
          </h2>
          <div class="room--capacity" :style="{ color }">
            <div class="room--capacity-bar">
              <span
                class="room--capacity-bar-inner"
                :style="{
                  backgroundColor: color,
                  width: capacityLeft,
                }"
              ></span>
            </div>
            <div class="room--capacity-value">
              <span>{{ room.users.length }}</span>
              <span>/</span>
              <span>{{ room.capacity }}</span>
            </div>
            <div class="room--capacity-bar">
              <span
                class="room--capacity-bar-inner"
                :style="{ backgroundColor: color, width: capacityRight }"
              ></span>
            </div>
          </div>
        </div>
        <ul class="room--users">
          <li
            v-for="(user, index) in room.users"
            :key="index"
            class="room--user"
            v-tooltip.bottom-center="user.username"
          >
            <img
              :src="require(`~/assets/avatars/${user.avatar}.png`)"
              :alt="user.username"
              class="room--user-avatar"
            />
            <div class="room--user-name">
              {{ user.username }}
            </div>
          </li>
        </ul>
        <div class="room--taAc">
          <ul class="room--tags">
            <li
              v-for="(tag, index) in room.tags"
              :key="index"
              :style="{ color }"
            >
              #{{ tag }}
            </li>
          </ul>
          <div class="room--actions">
            <button v-if="room.users.length >= room.capacity">Knock</button>
            <button v-else @click="handleRoomEnter">Enter</button>
          </div>
        </div>
      </div>
    </div>
    <div class="room--description">
      <button
        class="room--description-toggler"
        :class="{ 'room--description-toggler_active': showDescription }"
        :aria-label="showDescription ? 'Hide description' : 'Show description'"
        @click="showDescription = !showDescription"
      >
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
      </button>
      <p v-if="showDescription" class="room--description-value">
        {{ room.description }}
      </p>
    </div>
    <transition name="fade">
      <div v-if="passwordModal.show" class="room--lockedModal">
        <div
          class="room--lockedModal-overlay"
          tabindex="0"
          @click="passwordModal.show = false"
        />
        <div class="room--lockedModal-inner">
          <Input :value.sync="passwordModal.value" label="Room password" />
          <button>Enter</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Room",
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDescription: false,
      passwordModal: {
        show: false,
        value: "",
      },
    };
  },
  computed: {
    color() {
      return this.room.host.element_color;
    },
    capacityLeft() {
      const halfCapacity = Math.floor(this.room.capacity / 2);
      const halfUsers = Math.floor(this.room.users.length);
      return `${(halfUsers / halfCapacity) * 100}%`;
    },
    capacityRight() {
      const halfCapacity = Math.floor(this.room.capacity / 2);
      const calc =
        this.room.users.length / 2 -
        (halfCapacity - this.room.users.length / 2);
      return `${(calc / halfCapacity) * 100}%`;
    },
  },
  methods: {
    handleRoomEnter() {
      if (this.room.is_locked) {
        this.passwordModal.show = true;
      }
      this.$toast.show('Joining room...');
      this.$parent.socket.emit('rooms/join', this.room.room_id);
    },
  },
};
</script>
