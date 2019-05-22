<template lang="pug">
    .content-wrapper
        section
            .container
              .auth
                .auth__banner
                  .img-holder
                    img(src='./../../assets/Pochemuchnik.png')
                .auth__form
                  span.ui-title-2 Логин
                  form(@submit.prevent="onSubmit")
                      .form-item
                        input(
                          type="text"
                          placeholder="Логин"
                          v-model="email"
                          style='width:70%'
                        )
                        select(v-model='email_ending', style='width:29%')
                          option(selected='', value='@edu.hse.ru') @edu.hse.ru
                          option(value='@hse.ru') @hse.ru
                      .form-item(:class="{ errorInput: $v.password.$error }")
                        input(
                          type="password"
                          placeholder="Пароль"
                          v-model="password"
                          :class="{ error: $v.password.$error }"
                          @change="$v.password.$touch()"
                        )
                        .error(v-if="!$v.password.required") Пароль - обязательное поле.
                        .error(v-if="!$v.password.minLength")
                         | Пароль должен состоять минимум из {{ $v.password.$params.minLength.min }} символов.
                      .buttons-list
                        button.button.button-primary(
                          type="submit"
                          :disabled="submitStatus === 'PENDING'"
                        ) Вход
                        .buttons-list__info
                            p.typo__p(v-if="submitStatus === 'OK'") OK!
                            p.typo__p(v-if="submitStatus === 'SERVER'") {{serverAnswer}}
                            p.typo__p(v-if="submitStatus === 'ERROR'") Заполните форму корректно.
                            p.typo__p(v-if="submitStatus === 'PENDING'") Отправка на сервер...
                        .buttons-list__router
                            .ui-regular-text  Нет аккаунта?
                            router-link(to="/reg")  Тогда тебе сюда.
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import router from './../../router'
export default {
  data () {
    return {
      email: '',
      email_ending: '@edu.hse.ru',
      password: '',
      submitStatus: null,
      //
      serverAnswer: ''
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        console.log('onLogin')
        this.submitStatus = 'PENDING'
        //
        // let token_ = ''
        this.$http.post(this.$store.getters.mainURL, {}, {
          headers: {
            Action: 'Log-In',
            Login: this.email,
            Password: this.password
          }
        })
          .then(response => {
            console.log(response)
            if (response.headers.map.result[0] === 'Success') {
              let strs_ = response.bodyText.split('&')
              console.log(strs_)
              let user_ = {
                email: this.email,
                password: this.password,
                name: strs_[1].substring(5),
                userType: response.headers.map['user-type'][0],
                token: strs_[2].substring(6)
              }
              this.$store.commit('edit_user', user_)
              router.push('/news')
            } else {
              this.submitStatus = 'SERVER'
              this.serverAnswer = response.bodyText
            }
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.auth
  display flex
.auth__banner
.auth__form
  width 50%

.form-item
  .error
    display none
    margin-bottom 8px
    font-size 13.4px
    color #fc5c65
  &.errorInput
    .error
      display block
input
  &.error
    border-color #fc5c65

.buttons-list
  text-align right
  margin-bottom 20px
  .buttons-list__info
    text-align center
a
  color #444ce0

.auth__form
  margin-left 20px
</style>
