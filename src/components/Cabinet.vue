<template lang="pug">
    .content-wrapper
        section
            .container
                h1.ui-title-1 Личный кабинет
                .user
                  .user-info__header
                    .ui-title-3 Информация о пользователе
                  .user-info__table
                    table(width='400', border='0', cellpadding='5', cellspacing='0')
                      tbody
                        tr
                          td Логин (e-mail):
                          td.ui-text-regular {{ cab_userInfo.email }}
                        tr
                          td Пароль:
                          td.ui-text-regular {{ cab_userInfo.password }}
                        tr
                          td ФИО:
                          td.ui-text-regular {{ cab_userInfo.name }}
                        tr
                          td Тип (права) пользователя:
                          td.ui-text-regular {{ cab_userInfo.userType }}
                  .user-change-data__header
                    .ui-title-3 Изменить данные
                  .user-change-data__body
                    .ui-title-small Если вы не хотите менять некоторые свои старые данные, впишите их без изменений.
                    .ui-title-smaller Скопируйте их из "Информация о пользователе" выше.
                    input(type="text", placeholder="Введите новый Email", v-model="userEmail_chg")
                    input(type="text", placeholder="Введите новый пароль", v-model="userPassword_chg")
                    input(type="text", placeholder="Введите новые ФИО", v-model="userName_chg")
                    button.button.button-primary(type='submit', @click="selfChange") Изменить данные
                  .user-self-delete__header
                    .ui-title-3 Удалить свой аккаунт
                  .user-self-delete__button
                    .user-self-delete__button-text
                      .ui-text-regular При нажатии на кнопку ваш аккаунт бедт удалён из системы. Вы будуте переправлены на странуцу входа.
                    button.button.button-primary(
                            type="submit"
                            @click="selfDelete"
                          ) Удалить
</template>

<script>
import router from './../router'
export default {
  data () {
    return {
      userEmail_chg: '',
      userPassword_chg: '',
      userName_chg: ''
    }
  },
  computed: {
    cab_userInfo () {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    selfDelete () {
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Remove-User',
          Token: this.$store.getters.userInfo.token.toString()
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            router.push('/login')
          }
        })
    },
    selfChange () {
      console.log('selfChange')
      console.log(this.$store.getters.userInfo)
      //
      const changedUser = {
        email: this.userEmail_chg,
        password: this.userPassword_chg,
        name: this.userName_chg,
        token: this.$store.getters.userInfo.token
      }
      console.log(changedUser)
      //
      this.$http.post(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Change-Personal-Data',
          Token: this.$store.getters.userInfo.token.toString(),
          'New-Login': this.userEmail_chg,
          'New-Password': this.userPassword_chg,
          'New-Name': this.userName_chg
        }
      })
        .then(response => {
          console.log('user just changed')
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            let user_ = {
              email: this.userEmail_chg,
              password: this.userPassword_chg,
              name: this.userName_chg,
              userType: response.headers.map['user-type'][0],
              token: response.bodyText.substring(6)
            }
            this.$store.commit('edit_user', user_)
            // fields reset
            this.userEmail_chg = ''
            this.userPassword_chg = ''
            this.userName_chg = ''
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-change-data__header
  margin-top 20px
.user-self-delete__header
  margin-top 20px
.user-self-delete__button-text
  margin-bottom 8px
</style>
