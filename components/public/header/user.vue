<template>
  <div class="m-user">
    <template v-if="userInfo">
      欢迎您，<span class="username">{{ userInfo.username }}</span>
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </template>
    <template v-else>
      <nuxt-link
        to="/login"
        class="login"
      >立即登录</nuxt-link>
      <nuxt-link
        to="/register"
        class="register"
      >注册</nuxt-link>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState('user', ['userInfo']),
}
</script>
