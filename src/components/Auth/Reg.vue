<template lang="pug">
.content-wrapper
  section
    .container
      .auth
        .auth__banner
          .img-holder
            img(src='./../../assets/Pochemuchnik.png')
        .auth__form
          span.ui-title-2 Регистрация
          form(@submit.prevent='onSubmit')
            .form-item(:class='{ errorInput: $v.name.$error }')
              input(type='text', placeholder='Фамилия Имя', v-model='name', :class='{ error: $v.name.$error }', @change='$v.name.$touch()')
              .error(v-if='!$v.name.required') Фамилия Имя - обязательное поле.
              .error(v-if='!$v.name.minLength') Фамилия и Имя слишком короткие.
            .form-item
              .email_form
                input(type='text', placeholder='enter your login', style='width:70%', v-model='email')
                select(v-model='email_ending', style='width:29%')
                  option(selected='', value='@edu.hse.ru') @edu.hse.ru
                  option(value='@hse.ru') @hse.ru
            .form-item(:class='{ errorInput: $v.password.$error }')
              input(type='password', placeholder='Введите пароль', v-model='password', :class='{ error: $v.password.$error }', @change='$v.password.$touch()')
              .error(v-if='!$v.password.required') Пароль - обязательное поле.
              .error(v-if='!$v.password.minLength')
                | Пароль должен состоять минимум из {{ $v.password.$params.minLength.min }} символов.
            .form-item(:class='{ errorInput: $v.repeatPassword.$error }')
              input(type='password', placeholder='Подтвердите ваш пароль', v-model='repeatPassword', :class='{ error: $v.repeatPassword.$error }', @change='$v.repeatPassword.$touch()')
              .error(v-if='!$v.repeatPassword.sameAsPassword') Пароли должны совпадать
            .buttons-list
              button.button.button-primary(type='submit', :disabled="submitStatus === 'PENDING'") Регистрация
              .buttons-list__info
                p.typo__p(v-if="submitStatus === 'OK'") Регистрация прошла успешно!
                p.typo__p(v-if="submitStatus === 'SERVER'") {{ serverAnswer }}
                p.typo__p(v-if="submitStatus === 'ERROR'") Заполните форму корректно.
                p.typo__p(v-if="submitStatus === 'PENDING'") Отправка на сервер...
              .buttons-list__router
                .ui-regular-text  Уже есть аккаунт?
                router-link(to='/login')  Тогда тебе сюда.

</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import router from './../../router'
export default {
  data () {
    return {
      name: '',
      email: '',
      email_ending: '@edu.hse.ru',
      password: '',
      repeatPassword: '',
      submitStatus: null,
      //
      serverAnswer: ''
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(2)
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        console.log('onSubmit')
        this.submitStatus = 'PENDING'
        //
        let token_ = ''
        this.$http.post(this.$store.getters.mainURL, {}, {
          headers: {
            Action: 'Register',
            Login: this.email,
            Password: this.password,
            Name: this.name
          }
        })
          .then(response => {
            console.log(response)
            token_ = response.bodyText
            if (token_[0] === 't') {
              this.submitStatus = 'OK'
              token_ = token_.substring(6)
              let user_ = {
                email: this.email,
                password: this.password,
                name: this.name,
                userType: 'User',
                token: token_
              }
              this.$store.commit('edit_user', user_)
              router.push('/news')
            } else {
              this.serverAnswer = token_
              this.submitStatus = 'SERVER'
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
.email_form
  display flex
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
