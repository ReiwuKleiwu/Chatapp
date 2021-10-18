<template>
  <header class="app-header">
    <div class="header-logo-wrapper">
      <h1>デュラララチャット！！</h1>
      <span>Durarara Chat!!</span>
    </div>
    <ul class="menu">
      <li active-class="active" @click="$emit('pageChange', 'anonymous-login')">Anonymous Login</li>
      <li active-class="active" @click="$emit('pageChange', 'login')">Login</li>
      <li active-class="active" @click="$emit('pageChange', 'register')">Register</li>
    </ul>
  </header>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  .app-header {
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0px 40px;
  }
  .header-logo-wrapper {
    text-align: center;
    a{
      color: #FFF;
    }
    h1 {
      font-family: 'Meiryo Bold';
      font-size: 1.2rem;
      margin-bottom:3px;
    }
    span {
      font-size:0.5rem;
      letter-spacing: 5px;
      color: #A8A8A8;
    }
  }
  .menu {
    display: flex;
    justify-content: center;
    margin-left: auto;

    li {
      margin-right: 20px;
      cursor: pointer;
      font-size: 1.1rem;
      color: #A8A8A8;

      &:hover, &.active.NuxtLink-exact-active {
        color: #FFF;
      }
      &:last-child {
        margin-right: 0px;
      }
    }
  }

  @media screen and (max-width: 425px) {
    .app-header {
      flex-direction: column;
      justify-content: center;
      padding: 40px;

      .header-logo-wrapper {
        margin-bottom: 25px;
      }

      .menu {
        margin-left: 0;
        li {
          font-size: 1rem;
        }
      }
    }
  }
</style>