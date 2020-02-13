export default {
  state: {
    mainURL: 'http://192.168.1.238:80/',
    user_logged: {
      email: 'sudoLogin',
      password: 'sudoPassword',
      name: 'SuperAdmin',
      userType: 'Admin',
      token: 451735726
    }
  },
  mutations: {
    unlog_user (state) {
      state.user_logged.email = ''
      state.user_logged.password = ''
      state.user_logged.name = ''
      state.user_logged.userType = ''
      state.user_logged.token = 0
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
    userType (state) {
      return state.user_logged.userType
    },
    userInfo (state) {
      return state.user_logged
    },
    mainURL (state) {
      return state.mainURL
    }
  }
}
