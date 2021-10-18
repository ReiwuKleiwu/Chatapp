<template>
    <div class="user-item">
        <div class="icon">
          <img :src="require(`~/assets/avatars/${user.avatar}.png`)">
        </div>

        <div class="username">{{user.username}}</div>
    </div>
</template>

<script>

export default {
  name: 'UserItem',
  props: ['user'],
  components: {

  },
  data: () => ({
 
  }),
  mounted() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.user-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    .icon {
        img {
            border: 2px solid white;
            border-radius: 15px;
            height: 70px;

            @media (max-width: 1100px) {
                border: 0;
                border-radius: 0;
            }
        }
    }

    .username {
        color: #7ec5f9;
    }

    &.small {
        display: inline-block;
        margin: 5px 10px;

        .icon {
            display: inline-block;
            
            img {
                height: 50px;
                border-width: 1px;
                border-radius: 13px;
            }
        }

        .username {
            display: block;
            color: white;
        }
    }
}
</style>