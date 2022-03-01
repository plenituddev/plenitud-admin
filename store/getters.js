export default {
  isLoggedIn(state) {
    try {
      return state.authUser.uid !== null
    } catch {
      return false
    }
  },
  userData(state) {
    try {
      return state.userData
    } catch {
      return false
    }
  },
  usuarios(state) {
    try {
      return state.usuarios
    } catch {
      return false
    }
  },
  pagos(state) {
    try {
      return state.pagos
    } catch {
      return false
    }
  },
  convenios(state) {
    try {
      return state.convenios
    } catch {
      return false
    }
  },
  conveniosE(state) {
    try {
      return state.convenios
    } catch {
      return false
    }
  },
  navegacionUsuario(state) {
    try {
      return state.navegacionUsuario
    } catch {
      return false
    }
  },
  getUsuariosValores(state) {
    try {
      const planes = []
      const valores = [0, 0, 0]
      planes[0] = state.usuarios.filter((usuario) => {
        return usuario.planes.tipo.codigo === 'CLASICOE'
      })
      planes[0].forEach(function (usuario) {
        valores[0] += usuario.planes.tipo.valor
      })

      planes[1] = state.usuarios.filter((usuario) => {
        return usuario.planes.tipo.codigo === 'SUPERIORE'
      })
      planes[1].forEach(function (usuario) {
        valores[1] += usuario.planes.tipo.valor
      })
      planes[2] = state.usuarios.filter((usuario) => {
        return usuario.planes.tipo.codigo === 'ELITEE'
      })
      planes[2].forEach(function (usuario) {
        valores[2] += usuario.planes.tipo.valor
      })
      return valores
    } catch {
      return false
    }
  },

  getUsuariosPlanes(state) {
    try {
      const planes = [0, 0, 0]
      planes[0] = state.usuarios.filter((usuario) => {
        return usuario.planes.tipo.codigo === 'CLASICOE'
      })
      planes[1] = state.usuarios.filter((usuario) => {
        return usuario.planes.tipo.codigo === 'SUPERIORE'
      })
      planes[2] = state.usuarios.filter((usuario) => {
        return usuario.planes.tipo.codigo === 'ELITEE'
      })

      return planes
    } catch {
      return false
    }
  },
  getUsuariosPendientesPlanes(state) {
    try {
      const usuarios = state.usuarios.filter((usuario) => {
        return usuario.empresaporpagar === true && usuario.estado === 'creado'
      })
      const planes = [0, 0, 0]
      planes[0] = usuarios.filter((usuario) => {
        return usuario.planes.tipo.codigo === 'CLASICOE'
      })
      planes[1] = usuarios.filter((usuario) => {
        return usuario.planes.tipo.codigo === 'SUPERIORE'
      })
      planes[2] = usuarios.filter((usuario) => {
        return usuario.planes.tipo.codigo === 'ELITEE'
      })

      return planes
    } catch {
      return false
    }
  },
  getUsuariosPendientesValores(state) {
    try {
      const usuarios = state.usuarios.filter((usuario) => {
        return usuario.empresaporpagar === true && usuario.estado === 'creado'
      })
      const planes = []
      const valores = [0, 0, 0]
      planes[0] = usuarios.filter((usuario) => {
        return usuario.planes.tipo.codigo === 'CLASICOE'
      })
      planes[0].forEach(function (usuario) {
        valores[0] += usuario.planes.tipo.valor
      })

      planes[1] = usuarios.filter((usuario) => {
        return usuario.planes.tipo.codigo === 'SUPERIORE'
      })
      planes[1].forEach(function (usuario) {
        valores[1] += usuario.planes.tipo.valor
      })
      planes[2] = usuarios.filter((usuario) => {
        return usuario.planes.tipo.codigo === 'ELITEE'
      })
      planes[2].forEach(function (usuario) {
        valores[2] += usuario.planes.tipo.valor
      })
      return valores
    } catch {
      return false
    }
  },
  getValorPendientesPagoTotal(state) {
    try {
      const usuarios = state.usuarios.filter((usuario) => {
        return usuario.empresaporpagar === true && usuario.estado === 'creado'
      })
      let valor = 0
      usuarios.forEach(function (usuario) {
        valor += usuario.planes.tipo.valor
      })
      return valor
    } catch {
      return false
    }
  },
  getValorPendientesTotal(state) {
    try {
      const usuarios = state.usuarios.filter((usuario) => {
        return usuario.empresaporpagar === true && usuario.estado === 'creado'
      })
      let valor = 0
      usuarios.forEach(function (usuario) {
        valor += usuario.planes.tipo.valor
      })
      return valor
    } catch {
      return false
    }
  },
  getValorTotal(state) {
    try {
      let valor = 0
      state.usuarios.forEach(function (usuario) {
        valor += usuario.planes.tipo.valor
      })
      return valor
    } catch {
      return false
    }
  },

  getUsuariosLoad(state) {
    try {
      return state.navegacionUsuario.usuariosLoad
    } catch {
      return false
    }
  },
  getPagosLoad(state) {
    try {
      return state.navegacionUsuario.pagosLoad
    } catch {
      return false
    }
  },
  getUsuariosPendientes(state) {
    try {
      return state.usuarios.filter((usuario) => {
        return usuario.empresaporpagar === true && usuario.estado === 'creado'
      })
    } catch {
      return false
    }
  },

  getUsuariosPendientesIds(state) {
    try {
      const usuarios = state.usuarios.filter((usuario) => {
        return usuario.empresaporpagar === true && usuario.estado === 'creado'
      })
      return usuarios.map((usuario) => ({
        planes: usuario.planes.tipo,
        uid: usuario.uid,
        documento: usuario.documento,
      }))
    } catch {
      return false
    }
  },
  getPagoOkProx(state) {
    try {
      return {
        ok: state.pagoVigente,
        proximo: state.pagoProximo,
      }
    } catch {
      return false
    }
  },
}
