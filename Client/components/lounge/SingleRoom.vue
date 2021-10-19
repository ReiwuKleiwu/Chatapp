<template>
    <div class="single-room">
        <div class="left" v-if="room.host">
            <UserItem :user="room.host" />
            <div class="host">Host</div>

            <!-- <div class="tags"> -->
                <!-- <div class="language"><img :src="`/images/flags/${$i18n.locales.find(locale => locale.code === room.language).code}.png`" width="20px"></div> -->
            <!-- </div> -->
        </div>

        <div class="right">
            <div class="title">
                <h3>{{room.name}}</h3>

                <div class="user-count-bars">
                    <div :class="`left-progress capacity-${Math.ceil((room.users.length / room.capacity) * 10)}`"></div>
                    <div class="user-count">{{room.users.length}} / {{room.capacity}}</div>
                    <div :class="`right-progress capacity-${Math.ceil((room.users.length / room.capacity) * 10)}`"></div>
                </div>
            </div>

            <p class="description">{{room.description}}</p>

            <div class="users">
                <UserItem v-for="user in room.users" :key="user._id" :user="user" class="small" />
            </div>
            
            <div class="buttons">
                <button class="button" @click="joinRoom" v-if="room.users.length < room.capacity">Enter</button>
                <button class="button" v-if="room.users.length >= room.capacity && room.is_knock">Knock</button>
            </div>
        </div>
    </div>
</template>


<script>

import UserItem from './UserItem';

export default {
  name: 'SingleRoom',
  props: ['room'],
  components: {
      UserItem
  },
  data: () => ({
 
  }),
  mounted() {},
  methods: {
      async joinRoom() {
          this.$toast.show('Joining room...');
          this.$root.socket.emit('rooms/join', this.room.room_id);
      }
  }
}
</script>

<style lang="scss" scoped>
.single-room {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    margin: auto;
    margin-bottom: auto;
    position: relative;
    margin-bottom: 30px;
    border: 2px solid #A8A8A8;
    border-radius: 20px;
    padding: 15px;
    width: 100%;

    @media (max-width: 1100px) {
        margin: 0;
        padding: 10px 5px;
        border: 0;

        border-bottom: 1px solid #333;
        border-radius: 0;
    }

    .left {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-right: 30px;
        padding: 0 25px 0 10px;
        position: relative;

        .host {
            font-size: 12px;
        }

        .tags {
            margin-top: 15px;
        }
        
        
        &:after {
            content: '';
            width: 1px;
            height: 100px;
            background-color: #333;
            display: block;
            position: absolute;
            right: 0;
        }
    }

    .right {
        flex-grow: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .title {
        display: flex;
        justify-content: space-between;

        h3 {
            margin: 0;
            padding: 0;
            color: white;
            font-size: 22px;
            font-weight: 100;
        }

        .user-count-bars {
            display: flex;
            align-items: center;

            .right-progress, .left-progress {
                position: relative;
                width: 70px;
                height: 10px;
                border-radius: 10px;
                background: #494949;
                margin: 5px;

                @media (max-width: 1100px) {
                    display: none;
                }

                &::before {
                    content: '';
                    position: absolute;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background: #fda500;
                }

            }

            @for $i from 1 through 10 {
                .left-progress.capacity-#{$i}:before {
                    @if ($i <= 5) {
                        width: ($i * 10%) * 2;
                    } @else {
                        width: 100%;
                    }
                }
            }

            @for $i from 1 through 10 {
                .right-progress.capacity-#{$i}:before {
                    @if ($i > 5) {
                        width: ($i * 10% * 2) - 100%;
                    } @else {
                        width: 0%;
                    }
                }
            }
        }
    }

    .description {
        color: #A8A8A8;
        @media (max-width: 1100px) {
            display: none;
        }
    }

    .users {
        width: auto;

        .user-item {

            @media (max-width: 1100px) {
                margin: 10px 5px;
                font-size: 11px;

                .icon img {
                    height: 30px;
                    border: 0;
                    border-radius: 0;
                }
            }

        }
    }



    .buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: auto;
    }
}
</style>