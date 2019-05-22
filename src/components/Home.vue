<template lang="pug">
  .content-wrapper
    section
      .container
        .base-header
          .ui-title-2 Добро пожаловать в Почемучник студента!
        .admin-container(v-if="this.$store.getters.userType === 'Admin'")
          .buttons-list
            .button.button--round.button-default(@click="menuFilter = 'Новости'") Новости
            .button.button--round.button-default(@click="menuFilter = 'События'") События
            .button.button--round.button-default(@click="menuFilter = 'Вопросы'") Вопросы
            .button.button--round.button-default(@click="menuFilter = 'Теги'") Теги
            .button.button--round.button-default(@click="menuFilter = 'Пользователи'") Пользователи
            .button.button--round.button-default(@click="menuFilter = 'Преподаватели'") Преподаватели
            .button.button--round.button-default(@click="menuFilter = 'Программы'") Программы
            .button.button--round.button-default(@click="menuFilter = 'Дисциплины'") Дисциплины
          .ui-title-1 {{header}}
          //news
          .news-section(v-if="menuFilter === 'Новости'")
            .ui-title-3 Добавление новости
              .input-add-news
                input(type="text", placeholder="Заголовок новости", v-model="newsHeader_add")
                textarea(type="text", placeholder="Сама новость", v-model="newsContent_add")
                button.button.button-primary(type='submit', @click="news_addItem") Добавить новость
            .ui-title-3 Изменение новости
              .input-chg-news
                input(type="text", placeholder="Старый заголовок новости", v-model="newsOldHeader_chg")
                input(type="text", placeholder="Новый заголовок новости", v-model="newsHeader_chg")
                textarea(type="text", placeholder="Сама новость", v-model="newsContent_chg")
                button.button.button-primary(type='submit', @click="news_changeItem") Изменить новость
            .ui-title-3 Удаление новости
              .input-del-news
                input(type="text", placeholder="Заголовок новости", v-model="newsHeader_del")
                button.button.button-primary(type='submit', @click="news_removeItem") Удалить новость
          //events
          .events-section(v-if="menuFilter === 'События'")
            .ui-title-3 Добавление события
              .input-add-event
                input(type="text", placeholder="Заголовок новости", v-model="eventHeader_add")
                textarea(type="text", placeholder="Сама новость", v-model="eventContent_add")
                textarea(type="text", placeholder="Место проведения события", v-model="eventPlace_add")
                button.button.button-primary(type='submit', @click="events_addEvent") Добавить событие
            .ui-title-3 Изменение события
              .input-add-event
                input(type="text", placeholder="Старый заголовок новости", v-model="eventOldHeader_chg")
                input(type="text", placeholder="Новый заголовок новости", v-model="eventHeader_chg")
                textarea(type="text", placeholder="Сама новость", v-model="eventContent_chg")
                textarea(type="text", placeholder="Место проведения события", v-model="eventPlace_chg")
                button.button.button-primary(type='submit', @click="events_changeEvent") Изменить событие
          //questions
          .questions-section(v-if="menuFilter === 'Вопросы'")
            .ui-title-3 Добавление вопроса
              .input-add-question
                input(type="text", placeholder="Вопрос", v-model="questionHeader_add")
                input(type="text", placeholder="Тег вопроса", v-model="questionTag_add")
                textarea(type="text", placeholder="Ответ", v-model="questionContent_add")
                button.button.button-primary(type='submit', @click="questions_addQuestion") Добавить вопрос
            .ui-title-3 Изменение вопроса
              input(type="text", placeholder="Старый вопрос", v-model="questionOldHeader_chg")
              input(type="text", placeholder="Новый вопрос", v-model="questionHeader_chg")
              textarea(type="text", placeholder="Новый ответ", v-model="questionContent_chg")
              button.button.button-primary(type='submit', @click="questions_changeQuestion") Изменить вопрос
            .ui-title-3 Удаление вопроса
              input(type="text", placeholder="Вопрос", v-model="questionHeader_remove")
              button.button.button-primary(type='submit', @click="questions_removeQuestion") Удалить вопрос
            .ui-title-3 Перемещение вопроса
              .ui-text-regular Перемещает вопрос в другой тег.
              input(type="text", placeholder="Вопрос", v-model="questionHeader_rebase")
              input(type="text", placeholder="Новый тег", v-model="questionTag_rebase")
              button.button.button-primary(type='submit', @click="questions_rebaseQuestion") Переместить вопрос в другой тег
            .ui-title-3 Добавление вопроса в тег
              input(type="text", placeholder="Вопрос", v-model="questionHeader_addadd")
              input(type="text", placeholder="Новый тег", v-model="questionTag_addadd")
              button.button.button-primary(type='submit', @click="questions_addQuestionToTag") Добавить вопрос в другой тег
            .ui-title-3 Удаление вопроса из тега
              input(type="text", placeholder="Вопрос", v-model="questionHeader_deldel")
              input(type="text", placeholder="Тег", v-model="questionTag_deldel")
              button.button.button-primary(type='submit', @click="questions_removeQuestionFromTag") Удалить вопрос тега
          //tags
          .tags-section(v-if="menuFilter === 'Теги'")
            .ui-title-3 Добавление тега
              .input-add-tag
                input(type="text", placeholder="Название тега", v-model="tagMain_add")
                input(type="text", placeholder="Название родительского тега (при наличии)", v-model="tagBase_add")
                button.button.button-primary(type='submit', @click="tags_addTag") Добавить тег
            .ui-title-3 Удаление тега
              .input-del-tag
                input(type="text", placeholder="Название тега", v-model="tagMain_delete")
                button.button.button-primary(type='submit', @click="tags_removeTag") Удалить тег
            .ui-title-3 Редактирование тега
              input(type="text", placeholder="Старое название тега", v-model="tagMain_edit")
              input(type="text", placeholder="Новое название тега", v-model="tagNew_edit")
              button.button.button-primary(type='submit', @click="tags_changeTag") Редактировать тег
            .ui-title-3 Перемещение тега
              input(type="text", placeholder="Название тега", v-model="tagMain_move")
              input(type="text", placeholder="Новый родительский тег", v-model="tagBase_move")
              button.button.button-primary(type='submit', @click="tags_rebaseTag") Переместить тег
          //users
          .users-section(v-if="menuFilter === 'Пользователи'")
              .ui-title-2 Управление пользователями
                .users-new-admin__header
                  .ui-title-3 Назначение нового администратора
                    input(type="text", placeholder="Логин нового администратора", v-model="usersAdmin_add")
                    button.button.button-primary(type='submit', @click="users_addAdmin") Подтвердить
                .users-delete-admin__header
                  .ui-title-3 Лишение администратора права
                    input(type="text", placeholder="Логин существующего администратора", v-model="usersAdmin_delete")
                    button.button.button-primary(type='submit', @click="users_removeAdmin") Подтвердить
                .users-move-user-discipline__header
                  .ui-title-3 Перемещение пользователя в другую образовательную программу
                    input(type="text", placeholder="Логин пользователя", v-model="usersLogin_move")
                    input(type="text", placeholder="Новая программа", v-model="usersProg_move")
                    button.button.button-primary(type='submit', @click="users_rebaseUser") Переместить
                .users-add-user-discipline__header
                  .ui-title-3 Добавление пользователя в образовательную программу
                    input(type="text", placeholder="Логин пользователя", v-model="usersLogin_add")
                    input(type="text", placeholder="Название программы", v-model="usersProg_add")
                    button.button.button-primary(type='submit', @click="users_addUserToProgram") Добавить
                .users-delete-user-discipline__header
                  .ui-title-3 Удаление пользователя из образовательной программы
                    input(type="text", placeholder="Логин пользователя", v-model="usersLogin_delete")
                    input(type="text", placeholder="Название программы", v-model="usersProg_delete")
                    button.button.button-primary(type='submit', @click="users_removeUserFromProgram") Удалить
          //tutors
          .prepods-section(v-if="menuFilter === 'Преподаватели'")
            .ui-title-2 Управление преподавателями
              .ui-title-3 Добавление преподавателя
                input(type="text", placeholder="ФИО", v-model="tutorName_add")
                input(type="text", placeholder="Программа преподавателя", v-model="tutorProg_add")
                input(type="text", placeholder="Email", v-model="tutorEmails_add")
                input(type="text", placeholder="Номер", v-model="tutorNumber_add")
                input(type="text", placeholder="Дисциплины преподавателя", v-model="tutorDisciplines_add")
                input(type="text", placeholder="Пост преподавателя", v-model="tutorPost_add")
                input(type="text", placeholder="Адрес", v-model="tutorAdress_add")
                input(type="text", placeholder="Время нахождения на рабочем месте", v-model="tutorTime_add")
                input(type="text", placeholder="URL страницы преподавателя", v-model="tutorURL_add")
                input(type="text", placeholder="URL фото", v-model="tutor_imgURL_add")
                button.button.button-primary(type='submit', @click="tutors_addTutor") Добавить преподавателя
              .ui-title-3 Изменение преподавателя
                input(type="text", placeholder="Старое ФИО", v-model="tutorOldName_edit")
                input(type="text", placeholder="ФИО", v-model="tutorName_edit")
                input(type="text", placeholder="Email", v-model="tutorEmails_edit")
                input(type="text", placeholder="Номер", v-model="tutorNumber_edit")
                input(type="text", placeholder="Дисциплины преподавателя", v-model="tutorDisciplines_edit")
                input(type="text", placeholder="Пост преподавателя", v-model="tutorPost_edit")
                input(type="text", placeholder="Адрес", v-model="tutorAdress_edit")
                input(type="text", placeholder="Время нахождения на рабочем месте", v-model="tutorTime_edit")
                input(type="text", placeholder="URL страницы преподавателя", v-model="tutorURL_edit")
                input(type="text", placeholder="URL фото", v-model="tutor_imgURL_edit")
                button.button.button-primary(type='submit', @click="tutors_changeTutor") Изменить преподавателя
              .ui-title-3 Удаление преподавателя
                input(type="text", placeholder="ФИО", v-model="tutorName_del")
                button.button.button-primary(type='submit', @click="tutors_removeTutor") Удалить преподавателя
              .ui-title-3 Перемещение преподавателя
                .ui-text-regular Перемещает преподавателя в другую образовательную программу.
                input(type="text", placeholder="ФИО", v-model="tutorName_move")
                input(type="text", placeholder="Новая программа", v-model="tutorProg_move")
                button.button.button-primary(type='submit', @click="tutors_rebaseTutor") Переместить
              .ui-title-3 Добавление преподавателя в образовательную программу
                input(type="text", placeholder="ФИО", v-model="tutorName_addadd")
                input(type="text", placeholder="Новая программа", v-model="tutorProg_addadd")
                button.button.button-primary(type='submit', @click="tutors_addTutorToProgram") Добавить
              .ui-title-3 Удаление преподавателя из образовательной программы
                input(type="text", placeholder="ФИО", v-model="tutorName_deldel")
                input(type="text", placeholder="Название программы", v-model="tutorProg_deldel")
                button.button.button-primary(type='submit', @click="tutors_removeTutorFromProgram") Удалить преподавателя
          //programs
          .programs-section(v-if="menuFilter === 'Программы'")
              .ui-title-2 Управление образовательными программами
              .programs-add-program__header
                .ui-title-3 Добавление образовательной программы
                  input(type="text", placeholder="Название программы", v-model="programName_add")
                  input(type="text", placeholder="Название родительской программы", v-model="programParentName_add")
                  button.button.button-primary(type='submit', @click="program_add") Добавить программу
              .programs-delete-program__header
                .ui-title-3 Удаление образовательной программы
                  input(type="text", placeholder="Название программы", v-model="programName_delete")
                  button.button.button-primary(type='submit', @click="program_remove") Удалить программу
              .programs-move-program__header
                .ui-title-3 Перемещение образовательной программы
                  input(type="text", placeholder="Название программы", v-model="programName_rebase")
                  input(type="text", placeholder="Название новой родительской программы", v-model="programParentName_rebase")
                  button.button.button-primary(type='submit', @click="program_rebase") Именить родительскую программу
          //disciplines
          .disciplines-section(v-if="menuFilter === 'Дисциплины'")
              .ui-title-2 Управление дисциплинами
              .disciplines-add-discipline__header
                .ui-title-3 Добавление дисциплины
                  .ui-text-regular Добавляет новую дисциплину в указанную программу.
                  input(type="text", placeholder="Название дисциплины", v-model="disciplineName_add")
                  input(type="text", placeholder="Название программы", v-model="disciplineProgram_add")
                  input(type="text", placeholder="Тип дисциплины", v-model="disciplineType_add")
                  input(type="text", placeholder="Преподаватели дисциплины", v-model="disciplineTutors_add")
                  textarea(type="text", placeholder="Расписание дисциплины (Время преподавания: формат {начало}-{конец} с номерами соотв. модулей).", v-model="disciplineSchedule_add")
                  input(type="text", placeholder="URL дисциплины", v-model="disciplineURL_add")
                  button.button.button-primary(type='submit', @click="disciplines_addDiscipline") Добавить дисциплину
              .disciplines-change-discipline__header
                .ui-title-3 Изменение дисциплины
                  input(type="text", placeholder="Старое название дисциплины", v-model="disciplineOldName_edit")
                  input(type="text", placeholder="Новое название дисциплины", v-model="disciplineName_edit")
                  input(type="text", placeholder="Тип дисциплины", v-model="disciplineType_edit")
                  input(type="text", placeholder="Преподаватели дисциплины", v-model="disciplineTutors_edit")
                  textarea(type="text", placeholder="Расписание дисциплины (Время преподавания: формат {начало}-{конец} с номерами соотв. модулей).", v-model="disciplineSchedule_edit")
                  input(type="text", placeholder="URL дисциплины", v-model="disciplineURL_edit")
                  button.button.button-primary(type='submit', @click="disciplines_changeDiscipline") Изменить дисциплину
              .disciplines-delete-discipline__header
                .ui-title-3 Удаление дисциплины
                  input(type="text", placeholder="Название дисциплины", v-model="disciplineName_delete")
                  button.button.button-primary(type='submit', @click="disciplines_removeDiscipline") Удалить дисциплину
              .disciplines-move-discipline__header
                .ui-title-3 Перемещение дисциплины
                  .ui-text-regular Перемещает дисциплину в другую образовательную программу.
                  input(type="text", placeholder="Название дисциплины", v-model="disciplineName_move")
                  input(type="text", placeholder="Название программы", v-model="disciplineProgram_move")
                  button.button.button-primary(type='submit', @click="disciplines_rebaseDiscipline") Переместить дисциплину
              .disciplines-add-discipline-to-program__header
                .ui-title-3 Добавление дисциплины в образовательную программу
                  .ui-text-regular Добавляет существующую дисциплину в другую образовательную программу.
                  input(type="text", placeholder="Название дисциплины", v-model="disciplineName_addadd")
                  input(type="text", placeholder="Название программы", v-model="disciplineProgram_addadd")
                  button.button.button-primary(type='submit', @click="disciplines_addDisciplineToProgram") Добавить дисциплину в программу
              .disciplines-delete-discipline-from-program__header
                .ui-title-3 Удаление дисциплины из образовательной программы
                  .ui-text-regular Удаляет существующую дисциплину из образовательной программы.
                  input(type="text", placeholder="Название дисциплины", v-model="disciplineName_deldel")
                  input(type="text", placeholder="Название программы", v-model="disciplineProgram_deldel")
                  button.button.button-primary(type='submit', @click="disciplines_removeDisciplineFromProgram") Удалить дисциплину из программы
</template>

<script>
export default {
  data () {
    return {
      menuFilter: 'Новости',
      // news
      newsPublishDate: '',
      newsRating: 0,
      newsHeader_add: '',
      newsContent_add: '',
      newsPublishDate_add: '',
      newsOldHeader_chg: '',
      newsHeader_chg: '',
      newsContent_chg: '',
      newsHeader_del: '',
      // events
      eventHeader_add: '',
      eventContent_add: '',
      eventLatitude_add: 1,
      eventLongitude_add: 1,
      eventPlace_add: '',
      eventOldHeader_chg: '',
      eventHeader_chg: '',
      eventContent_chg: '',
      eventLatitude_chg: 1,
      eventLongitude_chg: 1,
      eventPlace_chg: '',
      // questions
      questionPublishDate: '',
      questionRating: 0,
      questionHeader_add: '',
      questionTag_add: '',
      questionContent_add: '',
      questionPublishDate_add: '',
      questionOldHeader_chg: '',
      questionHeader_chg: '',
      questionTag_chg: '',
      questionContent_chg: '',
      questionHeader_remove: '',
      questionHeader_rebase: '',
      questionTag_rebase: '',
      questionHeader_addadd: '',
      questionTag_addadd: '',
      questionHeader_deldel: '',
      questionTag_deldel: '',
      // tags
      tagMain_add: '',
      tagBase_add: '',
      tagMain_delete: '',
      tagMain_edit: '',
      tagNew_edit: '',
      tagMain_move: '',
      tagBase_move: '',
      // users
      usersAdmin_add: '',
      usersAdmin_delete: '',
      usersLogin_move: '',
      usersProg_move: '',
      usersLogin_add: '',
      usersProg_add: '',
      usersLogin_delete: '',
      usersProg_delete: '',
      // tutors
      tutorName_add: '',
      tutorProg_add: '',
      tutorEmails_add: '',
      tutorNumber_add: '',
      tutorDisciplines_add: '',
      tutorPost_add: '',
      tutorAdress_add: '',
      tutorTime_add: '',
      tutorURL_add: '',
      tutor_imgURL_add: '',
      tutorOldName_edit: '',
      tutorName_edit: '',
      tutorEmails_edit: '',
      tutorNumber_edit: '',
      tutorDisciplines_edit: '',
      tutorPost_edit: '',
      tutorAdress_edit: '',
      tutorTime_edit: '',
      tutorURL_edit: '',
      tutor_imgURL_edit: '',
      tutorName_del: '',
      tutorName_move: '',
      tutorProg_move: '',
      tutorName_addadd: '',
      tutorProg_addadd: '',
      tutorName_deldel: '',
      tutorProg_deldel: '',
      // programs
      programName_add: '',
      programParentName_add: '',
      programName_delete: '',
      programName_rebase: '',
      programParentName_rebase: '',
      // disciplines
      disciplineName_add: '',
      disciplineProgram_add: '',
      disciplineType_add: '',
      disciplineTutors_add: '',
      disciplineSchedule_add: '',
      disciplineURL_add: '',
      disciplineOldName_edit: '',
      disciplineName_edit: '',
      disciplineType_edit: '',
      disciplineTutors_edit: '',
      disciplineSchedule_edit: '',
      disciplineURL_edit: '',
      disciplineName_delete: '',
      disciplineName_move: '',
      disciplineProgram_move: '',
      disciplineName_addadd: '',
      disciplineProgram_addadd: '',
      disciplineName_deldel: '',
      disciplineProgram_deldel: ''
    }
  },
  computed: {
    header () {
      return this.menuFilter
    }
  },
  methods: {
    // users---------------------------------------------------------
    users_addAdmin () {
      console.log('add admin')
      if (this.usersAdmin_add === '') {
        alert('Вы не ввели логин админа')
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Add-Admin',
          Token: this.$store.getters.userInfo.token.toString(),
          Login: this.usersAdmin_add
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          this.usersAdmin_add = ''
        })
    },
    users_removeAdmin () {
      console.log('remove admin')
      if (this.usersAdmin_delete === '') {
        alert('Вы не ввели логин админа')
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Remove-Admin',
          Token: this.$store.getters.userInfo.token.toString(),
          Login: this.usersAdmin_delete
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          this.usersAdmin_delete = ''
        })
    },
    users_rebaseUser () {
      console.log('rebase user')
      if (this.usersLogin_move === '' || this.usersProg_move === '') {
        alert('Вы не ввели логин админа и его программу')
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Rebase-User',
          Token: this.$store.getters.userInfo.token.toString(),
          Login: this.usersLogin_move,
          Program: this.usersProg_move
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // Reset fields
          this.usersLogin_move = ''
          this.usersProg_move = ''
        })
    },
    users_addUserToProgram () {
      console.log('add user to program')
      if (this.usersLogin_add === '' || this.usersProg_add === '') {
        alert('Вы не ввели логин админа и его программу')
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Add-User-To-Program',
          Token: this.$store.getters.userInfo.token.toString(),
          Login: this.usersLogin_add,
          Program: this.usersProg_add
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // Reset fields
          this.usersLogin_add = ''
          this.usersProg_add = ''
        })
    },
    users_removeUserFromProgram () {
      console.log('remove user from program')
      if (this.usersLogin_delete === '' || this.usersProg_delete === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Remove-User-From-Program',
          Token: this.$store.getters.userInfo.token.toString(),
          Login: this.usersLogin_delete,
          Program: this.usersProg_delete
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // Reset fields
          this.usersLogin_delete = ''
          this.usersProg_delete = ''
        })
    },
    // tutors------------------------------------------------------------
    tutors_addTutor () {
      console.log('add tutor')
      if (this.tutorName_add === '') {
        return
      }
      let tutor_ = {
        name: this.tutorName_add,
        emails: [this.tutorEmails_add],
        phone: this.tutorNumber_add,
        disciplines: [this.tutorDisciplines_add],
        post: [this.tutorPost_add],
        adress: this.tutorAdress_add,
        attendTime: this.tutorTime_add,
        url: this.tutorURL_add,
        imgURL: this.tutor_imgURL_add
      }
      console.log(tutor_)
      this.$store.commit('add_tutor', tutor_)
      this.$http.put(this.$store.getters.mainURL, tutor_, {
        headers: {
          Action: 'Add-Tutor',
          Token: this.$store.getters.userInfo.token.toString(),
          Program: this.tutorProg_add
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // Reset fields
          this.tutorName_add = ''
          this.tutorProg_add = ''
          this.tutorEmails_add = ''
          this.tutorNumber_add = ''
          this.tutorDisciplines_add = ''
          this.tutorPost_add = ''
          this.tutorAdress_add = ''
          this.tutorTime_add = ''
          this.tutorURL_add = ''
          this.tutor_imgURL_add = ''
        })
    },
    tutors_changeTutor () {
      console.log('change tutor')
      if (this.tutorOldName_edit === '') {
        return
      }
      let tutor_ = {
        name: this.tutorName_edit,
        emails: [this.tutorEmails_edit],
        phone: this.tutorNumber_edit,
        disciplines: [this.tutorDisciplines_edit],
        post: [this.tutorPost_edit],
        adress: this.tutorAdress_edit,
        attendTime: this.tutorTime_edit,
        url: this.tutorURL_edit,
        imgURL: this.tutor_imgURL_edit
      }
      //
      console.log(tutor_)
      this.$http.put(this.$store.getters.mainURL, tutor_, {
        headers: {
          Action: 'Change-Tutor',
          Token: this.$store.getters.userInfo.token.toString(),
          Tutor: this.tutorOldName_edit.toString()
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.tutorName_edit = ''
          this.tutorEmails_edit = ''
          this.tutorNumber_edit = ''
          this.tutorDisciplines_edit = ''
          this.tutorPost_edit = ''
          this.tutorAdress_edit = ''
          this.tutorTime_edit = ''
          this.tutorURL_edit = ''
          this.tutor_imgURL_edit = ''
        })
    },
    tutors_removeTutor () {
      console.log('remove tutor')
      if (this.tutorName_del === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Remove-Tutor',
          Token: this.$store.getters.userInfo.token.toString(),
          Tutor: this.tutorName_del
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.tutorName_del = ''
        })
    },
    tutors_rebaseTutor () {
      console.log('rebase tutor')
      if (this.tutorName_move === '' && this.tutorProg_move === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Rebase-Tutor',
          Token: this.$store.getters.userInfo.token.toString(),
          Tutor: this.tutorName_move,
          Program: this.tutorProg_move
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.tutorName_move = ''
          this.tutorProg_move = ''
        })
    },
    tutors_addTutorToProgram () {
      console.log('add tutor to program')
      if (this.tutorName_addadd === '' && this.tutorProg_addadd === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Add-Tutor-To-Program',
          Token: this.$store.getters.userInfo.token.toString(),
          Tutor: this.tutorName_addadd,
          Program: this.tutorProg_addadd
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.tutorName_addadd = ''
          this.tutorProg_addadd = ''
        })
    },
    tutors_removeTutorFromProgram () {
      console.log('remove tutor from program')
      if (this.tutorName_deldel === '' && this.tutorProg_deldel === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Remove-Tutor-From-Program',
          Token: this.$store.getters.userInfo.token.toString(),
          Tutor: this.tutorName_deldel,
          Program: this.tutorProg_deldel
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.tutorName_deldel = ''
          this.tutorProg_deldel = ''
        })
    },
    // disciplines-------------------------------------------------------
    disciplines_addDiscipline () {
      console.log('add discipline')
      if (this.disciplineName_add === '' || this.disciplineProgram_add === '') {
        return
      }
      let discipline_ = {
        name: this.disciplineName_add,
        type: this.disciplineType_add,
        tutors: [this.disciplineTutors_add],
        schedule: this.disciplineSchedule_add,
        url: this.disciplineURL_add
      }
      console.log(discipline_)
      this.$http.put(this.$store.getters.mainURL, discipline_, {
        headers: {
          Action: 'Add-Discipline',
          Token: this.$store.getters.userInfo.token.toString(),
          Discipline: this.disciplineName_add,
          Program: this.disciplineProgram_add
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.disciplineName_add = ''
          this.disciplineProgram_add = ''
          this.disciplineType_add = ''
          this.disciplineTutors_add = ''
          this.disciplineSchedule_add = ''
          this.disciplineURL_add = ''
        })
    },
    disciplines_changeDiscipline () {
      console.log('change discipline')
      if (this.disciplineOldName_edit === '' || this.disciplineName_edit === '') {
        return
      }
      let discipline_ = {
        name: this.disciplineName_edit,
        type: this.disciplineType_edit,
        tutors: [this.disciplineTutors_edit],
        schedule: this.disciplineSchedule_edit,
        url: this.disciplineURL_edit
      }
      console.log(discipline_)
      this.$http.put(this.$store.getters.mainURL, discipline_, {
        headers: {
          Action: 'Change-Discipline',
          Token: this.$store.getters.userInfo.token.toString(),
          Discipline: this.disciplineName_edit
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.disciplineOldName_edit = ''
          this.disciplineName_edit = ''
          this.disciplineType_edit = ''
          this.disciplineTutors_edit = ''
          this.disciplineSchedule_edit = ''
          this.disciplineURL_edit = ''
        })
    },
    disciplines_removeDiscipline () {
      console.log('remove discipline')
      if (this.disciplineName_delete === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Remove-Discipline',
          Token: this.$store.getters.userInfo.token.toString(),
          Discipline: this.disciplineName_delete
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.disciplineName_delete = ''
        })
    },
    disciplines_rebaseDiscipline () {
      console.log('rebase discipline')
      if (this.disciplineName_move === '' || this.disciplineProgram_move === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Rebase-Discipline',
          Token: this.$store.getters.userInfo.token.toString(),
          Discipline: this.disciplineName_move,
          Program: this.disciplineProgram_move
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.disciplineName_move = ''
          this.disciplineProgram_move = ''
        })
    },
    disciplines_addDisciplineToProgram () {
      console.log('add discipline to program')
      if (this.disciplineName_addadd === '' || this.disciplineProgram_addadd === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Add-Discipline-To-Program',
          Token: this.$store.getters.userInfo.token.toString(),
          Discipline: this.disciplineName_addadd,
          Program: this.disciplineProgram_addadd
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.disciplineName_addadd = ''
          this.disciplineProgram_addadd = ''
        })
    },
    disciplines_removeDisciplineFromProgram () {
      console.log('remove discipline from program')
      if (this.disciplineName_deldel === '' || this.disciplineProgram_deldel === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Remove-Discipline-From-Program',
          Token: this.$store.getters.userInfo.token.toString(),
          Discipline: this.disciplineName_deldel,
          Program: this.disciplineProgram_deldel
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.disciplineName_deldel = ''
          this.disciplineProgram_deldel = ''
        })
    },
    // programs----------------------------------------------------------
    program_add () {
      console.log('add program')
      if (this.programParentName_add !== '' && this.programName_add !== '') {
      // если есть родительская программа
        this.$http.put(this.$store.getters.mainURL, {}, {
          headers: {
            Action: 'Add-Program',
            Token: this.$store.getters.userInfo.token.toString(),
            Program: this.programName_add,
            'Base-Program': this.programParentName_add
          }
        })
          .then(response => {
            console.log(response)
            if (response.headers.map.result[0] === 'Success') {
              console.log(response.headers.map.result[0])
            } else {
              console.log(response.headers.map.result[0])
            }
            this.programName_add = ''
            this.programParentName_add = ''
          })
      } else if (this.programParentName_add === '' && this.programName_add !== '') {
        // если родительской программы нет
        this.$http.put(this.$store.getters.mainURL, {}, {
          headers: {
            Action: 'Add-Program',
            Token: this.$store.getters.userInfo.token.toString(),
            Program: this.programName_add
          }
        })
          .then(response => {
            console.log(response)
            if (response.headers.map.result[0] === 'Success') {
              console.log(response.headers.map.result[0])
            } else {
              console.log(response.headers.map.result[0])
            }
            this.programName_add = ''
            this.programParentName_add = ''
          })
      }
    },
    program_remove () {
      console.log('remove program')
      if (this.programName_delete === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Remove-Program',
          Token: this.$store.getters.userInfo.token.toString(),
          Program: this.programName_delete
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          this.programName_delete = ''
        })
    },
    program_rebase () {
      console.log('rebase program')
      if (this.programName_rebase === '' || this.programParentName_rebase === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Rebase-Program',
          Token: this.$store.getters.userInfo.token.toString(),
          Program: this.programName_rebase,
          'Base-Program': this.programParentName_rebase
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          this.programName_rebase = ''
          this.programParentName_rebase = ''
        })
    },
    // news------------------------------------------------------------
    news_addItem () {
      console.log('add item')
      // предотвращение отправки пустого объекта
      if (this.newsHeader_add === '' || this.newsContent_add === '') {
        alert('Вы не ввели заголовок или содержимое новости')
        return
      }
      // получение текущей даты
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear()
      this.newsPublishDate_add = dd + '.' + mm + '.' + yyyy + ' ' + today.getHours() + ':' + today.getMinutes()
      // формирование объекта данных
      let news_ = {
        header: this.newsHeader_add,
        content: this.newsContent_add,
        publishDate: this.newsPublishDate_add,
        rating: 0
      }
      console.log(news_)
      this.$http.put(this.$store.getters.mainURL, news_, {
        headers: {
          Action: 'Add-Item',
          Token: this.$store.getters.userInfo.token.toString()
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            alert(response.headers.map.result[0])
          } else {
            alert(response.headers.map.result[0] + '\n' + response.bodyText)
          }
          // clean fields
          this.newsHeader_add = ''
          this.newsContent_add = ''
          this.newsPublishDate_add = ''
        })
    },
    news_changeItem () {
      console.log('change item')
      if (this.newsOldHeader_chg === '' || this.newsHeader_chg === '' || this.newsContent_chg === '') {
        return
      }
      let news_ = {
        header: this.newsHeader_chg,
        content: this.newsContent_chg,
        publishDate: this.newsPublishDate,
        rating: this.newsRating
      }
      console.log(news_)
      this.$http.put(this.$store.getters.mainURL, news_, {
        headers: {
          Action: 'Change-Item',
          Token: this.$store.getters.userInfo.token.toString(),
          Item: this.newsOldHeader_chg
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.newsOldHeader_chg = ''
          this.newsHeader_chg = ''
          this.newsContent_chg = ''
          this.newsPublishDate = ''
          this.newsRating = ''
        })
    },
    news_removeItem () {
      console.log('remove item')
      if (this.newsHeader_del === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Change-Item',
          Token: this.$store.getters.userInfo.token.toString(),
          Item: this.newsHeader_del
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.newsHeader_del = ''
        })
    },
    // events-----------------------------------------------------------
    events_addEvent () {
      console.log('add event')
      if (this.eventHeader_add === '' || this.eventContent_add === '') {
        return
      }
      let event_ = {
        header: this.eventHeader_add,
        content: this.eventContent_add,
        latitude: this.eventLatitude_add,
        longitude: this.eventLongitude_add,
        place: this.eventPlace_add
      }
      console.log(event_)
      this.$http.put(this.$store.getters.mainURL, event_, {
        headers: {
          Action: 'Add-Event',
          Token: this.$store.getters.userInfo.token.toString()
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.eventHeader_add = ''
          this.eventContent_add = ''
          this.eventLatitude_add = 0
          this.eventLongitude_add = 0
          this.eventPlace_add = ''
        })
    },
    events_changeEvent () {
      console.log('change event')
      if (this.eventOldHeader_chg === '' || this.eventHeader_chg === '' || this.eventContent_chg === '') {
        return
      }
      let event_ = {
        header: this.eventHeader_chg,
        content: this.eventContent_chg,
        latitude: this.eventLatitude_chg,
        longitude: this.eventLongitude_chg,
        place: this.eventPlace_chg
      }
      console.log(event_)
      this.$http.put(this.$store.getters.mainURL, event_, {
        headers: {
          Action: 'Change-Event',
          Token: this.$store.getters.userInfo.token.toString(),
          Event: this.eventOldHeader_chg
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.eventOldHeader_chg = ''
          this.eventHeader_chg = ''
          this.eventContent_chg = ''
          this.eventLatitude_chg = 0
          this.eventLongitude_chg = 0
          this.eventPlace_chg = ''
        })
    },
    // tags--------------------------------------------------------------
    tags_addTag () {
      console.log('add tag')
      if (this.tagBase_add !== '' && this.tagMain_add !== '') {
      // если есть родительский тег
        this.$http.put(this.$store.getters.mainURL, {}, {
          headers: {
            Action: 'Add-Tag',
            Token: this.$store.getters.userInfo.token.toString(),
            Tag: this.tagMain_add,
            'Base-Tag': this.tagBase_add
          }
        })
          .then(response => {
            console.log(response)
            if (response.headers.map.result[0] === 'Success') {
              console.log(response.headers.map.result[0])
            } else {
              console.log(response.headers.map.result[0])
            }
            // reset fields
            this.tagMain_add = ''
            this.tagBase_add = ''
          })
      } else if (this.tagBase_add === '' && this.tagMain_add !== '') {
        // если родительского тега нет
        this.$http.put(this.$store.getters.mainURL, {}, {
          headers: {
            Action: 'Add-Tag',
            Token: this.$store.getters.userInfo.token.toString(),
            Tag: this.tagMain_add
          }
        })
          .then(response => {
            console.log(response)
            if (response.headers.map.result[0] === 'Success') {
              console.log(response.headers.map.result[0])
            } else {
              console.log(response.headers.map.result[0])
            }
            // reset fields
            this.tagMain_add = ''
          })
      }
    },
    tags_removeTag () {
      console.log('remove tag')
      if (this.tagMain_delete === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Remove-Tag',
          Token: this.$store.getters.userInfo.token.toString(),
          Tag: this.tagMain_delete
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // reset fields
          this.tagMain_delete = ''
        })
    },
    tags_changeTag () {
      console.log('change tag')
      if (this.tagMain_edit === '' || this.tagNew_edit === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Change-Tag',
          Token: this.$store.getters.userInfo.token.toString(),
          Tag: this.tagMain_edit,
          'New-Tag': this.tagNew_edit
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // reset fields
          this.tagMain_edit = ''
          this.tagNew_edit = ''
        })
    },
    tags_rebaseTag () {
      console.log('rebase tag')
      if (this.tagMain_move === '' || this.tagBase_move === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Rebase-Tag',
          Token: this.$store.getters.userInfo.token.toString(),
          Tag: this.tagMain_move,
          'Base-Tag': this.tagBase_move
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // reset fields
          this.tagMain_move = ''
          this.tagBase_move = ''
        })
    },
    // questions--------------------------------------------------------
    questions_addQuestion () {
      console.log('add question')
      if (this.questionHeader_add === '' || this.questionContent_add === '' || this.questionTag_add === '') {
        return
      }
      let question_ = {
        header: this.questionHeader_add,
        content: this.questionContent_add,
        publishDate: this.questionPublishDate_add,
        rating: 0
      }
      console.log(question_)
      this.$http.put(this.$store.getters.mainURL, question_, {
        headers: {
          Action: 'Add-Question',
          Token: this.$store.getters.userInfo.token.toString(),
          Question: this.questionTag_add
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.questionHeader_add = ''
          this.questionContent_add = ''
          this.questionPublishDate_add = ''
          this.questionTag_add = ''
        })
    },
    questions_changeQuestion () {
      console.log('change question')
      if (this.questionOldHeader_chg === '' || this.questionHeader_chg === '' || this.questionContent_chg === '') {
        return
      }
      let question_ = {
        header: this.questionHeader_chg,
        content: this.questionContent_chg,
        publishDate: this.questionPublishDate,
        rating: this.questionRating
      }
      console.log(question_)
      this.$http.put(this.$store.getters.mainURL, question_, {
        headers: {
          Action: 'Change-Question',
          Token: this.$store.getters.userInfo.token.toString(),
          Question: this.questionOldHeader_chg
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.questionOldHeader_chg = ''
          this.questionHeader_chg = ''
          this.questionContent_chg = ''
          this.questionPublishDate = ''
          this.questionRating = ''
        })
    },
    questions_removeQuestion () {
      console.log('remove question')
      if (this.questionHeader_remove === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Remove-Question',
          Token: this.$store.getters.userInfo.token.toString(),
          Question: this.questionHeader_remove
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.questionHeader_remove = ''
        })
    },
    questions_rebaseQuestion () {
      console.log('rebase question')
      if (this.questionHeader_rebase === '' || this.questionTag_rebase === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Rebase-Question',
          Token: this.$store.getters.userInfo.token.toString(),
          Question: this.questionHeader_rebase,
          Tag: this.questionTag_rebase
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.questionHeader_rebase = ''
          this.questionTag_rebase = ''
        })
    },
    questions_addQuestionToTag () {
      console.log('add question to tag question')
      if (this.questionHeader_addadd === '' || this.questionTag_addadd === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Add-Question-To-Tag',
          Token: this.$store.getters.userInfo.token.toString(),
          Question: this.questionHeader_addadd,
          Tag: this.questionTag_addadd
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.questionHeader_addadd = ''
          this.questionTag_addadd = ''
        })
    },
    questions_removeQuestionFromTag () {
      console.log('remove question from tag question')
      if (this.questionHeader_deldel === '' || this.questionTag_deldel === '') {
        return
      }
      this.$http.put(this.$store.getters.mainURL, {}, {
        headers: {
          Action: 'Remove-Question-From-Tag',
          Token: this.$store.getters.userInfo.token.toString(),
          Question: this.questionHeader_deldel,
          Tag: this.questionTag_deldel
        }
      })
        .then(response => {
          console.log(response)
          if (response.headers.map.result[0] === 'Success') {
            console.log(response.headers.map.result[0])
          } else {
            console.log(response.headers.map.result[0])
          }
          // clean fields
          this.questionHeader_deldel = ''
          this.questionTag_deldel = ''
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-header
    margin-bottom 30px

.admin-container
  .ui-title-1
    margin-top 20px

.button.button--round
  margin-right 6px
  margin-bottom 3px
.ui-title-2
    margin-bottom 16px

.ui-title-3
    margin-top 24px

.ui-text-regualr
    margin-bottom 12px

.ui-tag
  &.use
    background-color: #444ce0
    color #fff
    .button-close
      &:before,
      &:after
        background-color: #fff
</style>
