export default {
  state: {
    disciplines_stored: [
      {
        name: 'Дискретная математика',
        type: 'Основная',
        tutors: 'Авдошин Сергей Михайлович',
        schedule: '1-4',
        url: 'https://www.hse.ru/ba/se/courses/219905012.html'
      }
    ],
    tutors_stored: [
      {
        name: 'Авдошин Сергей Михайлович',
        emails: 'savdoshin@hse.ru',
        phone: '+7(495) 772-9590 ',
        disciplines: '',
        post: 'Руководитель департамента, Профессор',
        adress: 'Кочновский пр., д. 3, каб. 404',
        attendTime: 'Понедельник 9:00 - 11:50',
        url: 'https://www.hse.ru/staff/avdoshin',
        imgURL: 'https://www.hse.ru/data/2011/11/28/1271041651/1avdoshin_416.jpg'
      }
    ]
  },
  mutations: {
    add_tutor (state, payload) {
      state.tutors_stored.push(payload)
    },
    edit_user (state, payload) {
      state.user_logged.email = payload.email
      state.user_logged.password = payload.password
      state.user_logged.name = payload.name
      state.user_logged.userType = payload.userType
      state.user_logged.token = payload.token
    }
  },
  getters: {
    get_discip (state) {
      return state.disciplines_stored
    },
    get_tutors (state) {
      return state.tutors_stored
    }
  }
}
