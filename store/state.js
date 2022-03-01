export default () => ({
  authUser: null,
  userData: null,
  convenios: [],
  conveniosE: [],

  usuarios: [],
  pagos: [],
  pagoVigente: false,
  pagoProximo: false,
  pagoProximoVigencia: null,
  navegacionUsuario: {
    usuariosLoad: false,
    pagosLoad: false,
    tabs: 0,
    tabUsuarioCant: 10,
    tabUsuarioPage: 0,
  },
})
