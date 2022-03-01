import initialState from './state'

const cl = process.env.CONSOLE
export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
    }
  },
  SET_USER_DATA: (state, dataUser) => {
    if (cl) console.info('❕ | 📥  MUTATIONS SET_USER_DATA dataUser', dataUser)
    delete dataUser.password
    state.userData = { ...dataUser }
  },
  SET_USER_DATA_FIELD: (state, payload) => {
    if (cl)
      console.info(
        '📥  MUTATIONS SET_USER_DATA_FIELD ',
        state.userData[payload.field],
        payload.field,
        payload.value
      )
    if (state.userData[payload.field])
      state.userData[payload.field] = payload.value
    else state.userData[payload.field] = payload.value
  },

  SET_USUARIOS_DATA: (state, usuarios) => {
    if (cl)
      console.info('❕ | 📥  MUTATIONS SET_USUARIOS_DATA dataUser', usuarios)
    state.usuarios = usuarios // [...usuarios]
  },

  SET_PAGOS_DATA: (state, pagos) => {
    if (cl) console.info('❕ | 📥  MUTATIONS SET_PAGOS_DATA dataPagos', pagos)
    state.pagos = pagos // [...pagos]
  },
  SET_CONVENIOS: (state, convenios) => {
    if (cl)
      console.info('❕ | 📥  MUTATIONS SET_CONVENIOS dataConvenios', convenios)
    try {
      state.convenios = convenios
    } catch (e) {
      console.error('└── 🚨  | MUTATIONS SET_CONVENIOS dataConvenios', e)
    }
  },
  SET_CONVENIOSE: (state, convenios) => {
    if (cl)
      console.info('❕ | 📥  MUTATIONS SET_CONVENIOS dataConvenios', convenios)
    try {
      state.conveniosE = convenios
    } catch (e) {
      console.error('└── 🚨  | MUTATIONS SET_CONVENIOS dataConvenios', e)
    }
  },

  // STATES NAV
  SET_NAVEGACION_USUARIO_TABS: (state, tabs) => {
    if (cl)
      console.info('❕ | 📥  MUTATIONS SET_NAVEGACION_USUARIO_TABS tabs', tabs)
    state.navegacionUsuario.tabs = tabs
  },
  SET_NAVEGACION_USUARIO_CANT: (state, tabUsuarioCant) => {
    if (cl)
      console.info(
        '📥  MUTATIONS SET_NAVEGACION_USUARIO_CANT tabUsuarioCant',
        tabUsuarioCant
      )
    state.navegacionUsuario.tabUsuarioCant = tabUsuarioCant
  },
  SET_NAVEGACION_USUARIO_PAGE: (state, tabUsuarioPage) => {
    if (cl)
      console.info(
        '📥  MUTATIONS SET_NAVEGACION_USUARIO_PAGE tabUsuarioPage',
        tabUsuarioPage
      )
    state.navegacionUsuario.tabUsuarioPage = tabUsuarioPage
  },
  SET_USUARIOS_LOAD: (state, usuariosLoad) => {
    if (cl)
      console.info(
        '❕ | 📥  MUTATIONS SET_USUARIOS_LOAD usuariosLoad',
        usuariosLoad
      )
    state.navegacionUsuario.usuariosLoad = usuariosLoad
  },
  SET_PAGOS_LOAD: (state, pagosLoad) => {
    if (cl)
      console.info('❕ | 📥  MUTATIONS SET_PAGOS_LOAD pagosLoad', pagosLoad)
    state.navegacionUsuario.pagosLoad = pagosLoad
  },
  SET_PAGO_VIGENTE: (state, est) => {
    if (cl) console.info('❕ | 📥  MUTATIONS SET_PAGO_VIGENTE est', est)
    state.pagoVigente = est
  },
  SET_PAGO_PROXIMO: (state, est) => {
    if (cl) console.info('❕ | 📥  MUTATIONS SET_PAGO_PROXIMO est', est)
    state.pagoProximo = est
  },
  SET_PAGO_PROXIMO_VIGENCIA: (state, est) => {
    if (cl)
      console.info('❕ | 📥  MUTATIONS SET_PAGO_PROXIMO_VIGENCIA est', est)
    state.pagoProximoVigencia = est
  },
}
