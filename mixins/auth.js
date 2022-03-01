import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState([
      'navegacionUsuario',
      'userData',
      'authUser',
      'usuarios',
      'pagos',
      'convenios',
      'conveniosE',
    ]),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      usuariosPlanes: 'getUsuariosPlanes',
      usuariosValores: 'getUsuariosValores',
      valorTotal: 'getValorTotal',
      usuariosPendientes: 'getUsuariosPendientes',
      usuariosPendientesPlanes: 'getUsuariosPendientesPlanes',
      usuariosPendientesValor: 'getValorPendientesPagoTotal',
      usuariosPendientesValores: 'getUsuariosPendientesValores',
      usuariosPendientesIds: 'getUsuariosPendientesIds',
      pagoOkProx: 'getPagoOkProx',
    }),
    tabs: {
      get() {
        return this.navegacionUsuario.tabs
      },
      set(value) {
        this.setTab(value)
      },
    },
    tabUsuarioCant: {
      get() {
        return this.navegacionUsuario.tabUsuarioCant
      },
      set(value) {
        this.settabUsuarioCant(value)
      },
    },
    tabUsuarioPage: {
      get() {
        return this.navegacionUsuario.tabUsuarioPage
      },
      set(value) {
        this.settabUsuarioPage(value)
      },
    },
  },

  methods: {
    ...mapMutations({
      setTab: 'SET_NAVEGACION_USUARIO_TABS',
      settabUsuarioCant: 'SET_NAVEGACION_USUARIO_CANT',
      settabUsuarioPage: 'SET_NAVEGACION_USUARIO_PAGE',
      setUserDataField: 'SET_USER_DATA_FIELD',
      setUserData: 'SET_USER_DATA',
      setUsuarios: 'SET_USUARIOS_DATA',
      setConvenios: 'SET_CONVENIOS',
      setConveniosE: 'SET_CONVENIOSE',
    }),
    ...mapActions({
      registrarUsuario: 'registrarUsuario',
      actualizarPerfil: 'actualizarPerfil',
      loginUsuario: 'loginUsuario',
      getUsuarios: 'getUsuarios',
      getUsuario: 'getUsuario',
      agregarUsuario: 'agregarUsuario',
      editarUsuario: 'editarUsuario',
      realizarPagoPSE: 'realizarPagoPSE',
      realizarPagoTC: 'realizarPagoTC',
      elimPago: 'deletePago',
      getPago: 'getPago',
      aprobarPago: 'aprobarPago',
      actualizarEstadoUsuario: 'actualizarEstadoUsuario',
      getConvenios: 'getConvenios',
      guardarConvenio: 'guardarConvenio',
      getConvenio: 'getConvenio',
      editarConvenio: 'editarConvenio',
      getConveniosE: 'getConveniosE',
      guardarConvenioE: 'guardarConvenioE',
      getConvenioE: 'getConvenioE',
      editarConvenioE: 'editarConvenioE',
      getEmpresasConvenioE: 'getEmpresasConvenioE',
      getEmpresasUsuario: 'getEmpresasUsuario',
      getEmpresasPagos: 'getEmpresasPagos',
    }),

    NumbersOnly(evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },

    // LOGOUT
    async logout() {
      try {
        await this.$fire.auth.signOut()
        location.reload()
      } catch (e) {
        alert(e)
      }
    },
  },
}
