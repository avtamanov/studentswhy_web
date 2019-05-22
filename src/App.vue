<template lang="pug">
  .wrapper
    header
      .navbar
        .container
          //user-logged
          .navbar-content(v-if="userType === 'User'")
            span.header-logo Почемучник Студента
            .button-burger(
              @click="menuShow = ! menuShow"
              :class="{ active: menuShow }"
            )
              span.line.line-1
              span.line.line-2
              span.line.line-3
            .navbar-list__wrapper(
              :class="{ active: menuShow }"
            )
              ul.navbar-list
                li.navbar-item(
                  v-for="link in menuLinks_logged"
                  :key="link.title"
                  @click="menuShow = false"
                )
                  router-link.navbar-link(:to="`${link.url}`") {{ link.title }}
                li.navbar-item(
                  @click="clickExit"
                )
                  router-link.navbar-link(
                    to="/login"
                    ) Выход
          //admin-logged
          .navbar-content(v-if="userType === 'Admin'")
            router-link.header-logo(
              to="/"
            ) Почемучник Студента
            .button-burger(
              @click="menuShow = ! menuShow"
              :class="{ active: menuShow }"
            )
              span.line.line-1
              span.line.line-2
              span.line.line-3
            .navbar-list__wrapper(
              :class="{ active: menuShow }"
            )
              ul.navbar-list
                  li.navbar-item(
                    v-for="link in menuLinks_logged"
                    :key="link.title"
                    @click="menuShow = false"
                  )
                    router-link.navbar-link(:to="`${link.url}`") {{ link.title }}
                  li.navbar-item(
                    @click="clickExit"
                  )
                    router-link.navbar-link(
                      to="/login"
                      ) Выход
          //unlogged
          .navbar-content(v-if="userType === ''")
            span.header-logo Почемучник Студента
            .button-burger(
              @click="menuShow = ! menuShow"
              :class="{ active: menuShow }"
            )
              span.line.line-1
              span.line.line-2
              span.line.line-3
            .navbar-list__wrapper(
              :class="{ active: menuShow }"
            )
              ul.navbar-list
                  li.navbar-item(
                    v-for="link in menuLinks_unlogged"
                    :key="link.title"
                    @click="menuShow = false"
                  )
                    router-link.navbar-link(:to="`${link.url}`") {{ link.title }}
                  li.navbar-item(
                    @click="clickExit"
                  )
    .content-wrapper
      router-view
</template>

<script>
export default {
  data () {
    return {
      // User-Type: {user/admin}; '' - если пользователь не вошёл
      mainURL: this.$store.getters.mainURL,
      menuShow: false,
      menuLinks_logged: [
        {title: 'Лента', url: '/news'},
        {title: 'Полезная информация', url: '/impinfo'},
        {title: 'Личный кабинет', url: '/cabinet'}
      ],
      menuLinks_unlogged: [
        {title: 'Логин', url: '/login'},
        {title: 'Регистрация', url: '/reg'}
      ]
    }
  },
  methods: {
    clickExit () {
      console.log('clickExit')
      this.menuShow = false
      console.log(this.$store.getters.userInfo)
      this.$store.commit('unlog_user')
      console.log(this.$store.getters.userInfo)
    }
  },
  computed: {
    userType () {
      return this.$store.getters.userType
    }
  }
}
</script>

<style lang="stylus">
//@import './assets/stylus/main.styl'
</style>
