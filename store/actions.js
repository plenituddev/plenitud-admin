export const strict = false
const axios = require('axios')
const axiosRetry = require('axios-retry')

axiosRetry(axios, {
  retries: 3, // number of retries
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`)
    return retryCount * 2000 // time interval between retries
  },
  retryCondition: (error) => {
    // if retry condition is not specified, by default idempotent requests are retried
    return error.response.status === 404
  },
})

function checkVigencia(info) {
  if (cl) console.info('🏁  | ⛹  > checkVigencia')
  // const creado = new Date(
  //   info.creado._seconds * 1000 + info.creado._nanoseconds / 1000000
  // )
  // const vigencia = new Date(
  //   info.vigencia._seconds * 1000 + info.vigencia._nanoseconds / 1000000
  // )

  const creado = info.creado.toDate()
  const vigencia = info.vigencia.toDate()
  const proximoDate = new Date(vigencia.getTime() - 8 * 24 * 60 * 60 * 1000)
  const approved = info.estado.toUpperCase() === 'APPROVED'
  const fecha = new Date()

  const ok = fecha <= vigencia && fecha >= creado && approved
  const proximo = fecha <= vigencia && fecha >= proximoDate && approved

  if (cl)
    console.info(
      '└──❕ | ⛹  >  checkVigencia',
      creado,
      fecha,
      vigencia,
      info.estado.toUpperCase(),
      approved,
      'Fecha mayor que creada ' + (fecha >= creado),
      'Fecha menor que vigencia ' + (fecha <= vigencia),
      ok,
      proximo
    )
  return { ok, proximo }
}

const api =
  process.env.NODE_ENV === 'production'
    ? 'https://us-central1-plenitud-web-v2.cloudfunctions.net/webApi/api/v1'
    : 'http://localhost:5001/plenitud-web-v2/us-central1/webApi/api/v1' // 'http://localhost:5001/plenitud-web-v2/us-central1/webApi/api/v1'

const cl = process.env.CONSOLE
export default {
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit ⛹  >  ACTION via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },

  async onAuthStateChanged({ commit, dispatch }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true)
        console.info('└──❕ | idToken', idToken)
      } catch (e) {
        console.error(e)
      }
    }
    commit('SET_AUTH_USER', { authUser })
    dispatch('getUserData')
    dispatch('getUsuarios')
    dispatch('getPagos')
  },
  registrarUsuario({ app, ctx, commit, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION registrarUsuario')
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.auth
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then((resp) => {
            delete payload.password
            return this.$fire.firestore
              .collection('empresas')
              .doc(resp.user.uid)
              .set({ ...payload, creado: new Date() })
              .then((ingreso) => {
                setTimeout(
                  () =>
                    this.$router.push({
                      path: '/empresas/usuarios',
                      query: { registro: 1 },
                    }),
                  1000
                )
                return {
                  error: false,
                  mensaje: 'La empresa se ha registrado con éxito',
                }
              })
              .catch((error) => {
                return { error: true, mensaje: error }
              })
          })
          .catch((error) => {
            return { error: true, mensaje: this.$fb_error(error.code) }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en registrarUsuario ' + e,
      }
    }
  },
  actualizarPerfil({ app, ctx, commit, state }) {
    if (cl) console.info('🏁  | ⛹  >  ACTION actualizarUsuario')
    try {
      if (this.$fire.auth !== null) {
        commit('SET_USER_DATA_FIELD', { field: 'completo', value: true })
        return this.$fire.firestore
          .collection('empresas')
          .doc(state.authUser.uid)
          .update({ ...state.userData, actualizado: new Date() })
          .then((ingreso) => {
            return {
              error: false,
              mensaje: 'La empresa se ha actualizado con éxito',
            }
          })
          .catch((error) => {
            return { error: true, mensaje: error }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en registrarUsuario ' + e,
      }
    }
  },
  agregarUsuario({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION agregarUsuario')

    try {
      if (this.$fire.auth !== null) {
        payload.password = payload.documento
        payload.password2 = payload.documento
        payload.personales.documento = payload.documento

        payload.personales.nombre_completo =
          payload.personales.nombres[0] + ' ' + payload.personales.nombres[1]

        payload.personales.apellido_completo =
          payload.personales.apellidos[0] +
          ' ' +
          payload.personales.apellidos[1]

        return axios
          .put(`${api}/empresas/usuarios`, payload)
          .then((response) => {
            if (response.data.uid) {
              if (!payload.url) dispatch('getUsuarios')
              return {
                error: false,
                mensaje: 'El usuario se ha creado con éxito',
              }
            } else {
              return {
                error: true,
                mensaje: '2 El usuario no pudo ser creado',
              }
            }
          })
          .catch((error) => {
            const responseError = error.response.data
            console.error('└── 🚨  | error', responseError)
            if (responseError.interno.ms)
              if (responseError.interno.ms.code)
                return {
                  error: true,
                  mensaje: this.$fb_error(responseError.interno.ms.code),
                }
              else
                return {
                  error: true,
                  mensaje: responseError.mensaje,
                }
            else
              return {
                error: true,
                mensaje: responseError.mensaje,
              }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en registrarUsuario ' + e,
      }
    }
  },
  editarUsuario({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION editarUsuario')

    try {
      if (this.$fire.auth !== null) {
        payload.password = payload.documento
        payload.password2 = payload.documento
        payload.personales.documento = payload.documento

        payload.personales.nombre_completo =
          payload.personales.nombres[0] + ' ' + payload.personales.nombres[1]

        payload.personales.apellido_completo =
          payload.personales.apellidos[0] +
          ' ' +
          payload.personales.apellidos[1]
        if (cl)
          console.info('└──❕ | ⛹  >  ACTION editarUsuario payload', payload)
        return axios
          .patch(`${api}/usuario/${payload.uid}`, { data_user: payload })
          .then((response) => {
            dispatch('getUsuarios')
            return {
              error: false,
              mensaje: 'El usuario se ha creado con éxito',
            }
          })
          .catch((error) => {
            const responseError = error.response.data
            console.error('└── 🚨  | error', responseError)
            return {
              error: true,
              mensaje: responseError.mensaje,
            }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en registrarUsuario ' + e,
      }
    }
  },
  loginUsuario({ app, ctx, commit, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION loginUsuario')
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.auth
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then((resp) => {
            setTimeout(
              () =>
                this.$router.push({
                  path: '/empresas/usuarios',
                  query: { login: 1 },
                }),
              1000
            )

            return {
              error: false,
              mensaje: 'Haz ingresado con  éxito',
            }
          })
          .catch(async (error) => {
            await this.$fire.auth.signOut()
            setTimeout(
              () =>
                this.$router.push({
                  path: '/e',
                  query: { error_login: 1 },
                }),
              1000
            )
            return { error: true, mensaje: this.$fb_error(error.code) }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en registrarUsuario ' + e,
      }
    }
  },
  async getUserData({ app, ctx, commit, state }) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getUserData')
    try {
      if (this.$fire.auth !== null) {
        if (cl)
          console.info(
            '----❕ | ⛹  >  ACTION getUserData uid',
            state.authUser.uid
          )
        if (state.authUser.uid) {
          const doc = await this.$fire.firestore
            .collection('empresas')
            .doc(state.authUser.uid)
            .get()
          if (doc.exists) {
            const data = {
              id: doc.id,
              ...doc.data(),
            }
            if (cl) console.info('└──❕ | ⛹  >  ACTION getUserData data', data)
            commit('SET_USER_DATA', data)
            return {
              error: false,
              doc: data,
            }
          } else {
            return {
              error: true,
              mensaje: 'La empresa no está registrada en el sistema',
            }
          }
        }
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en registrarUsuario ' + e,
      }
    }
  },

  getUsuarios({ app, ctx, commit, state }) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getUsuarios')
    try {
      if (this.$fire.auth !== null) {
        if (cl)
          console.info(
            '----❕ | ⛹  >  ACTION getUsuarios uid',
            state.authUser.uid
          )
        if (state.authUser.uid) {
          this.$fire.firestore
            .collection('usuarios')
            .where('empresaref', '==', state.authUser.uid)
            .get()
            .then((docs) => {
              if (cl)
                console.info('└──❕ | ⛹  >  ACTION getUsuarios docs', docs)
              const usuarios = []
              const planesPromises = []
              let count = 0
              docs.forEach((doc) => {
                // console.log(doc.id, ' => ', doc.data())
                const dataUser = doc.data()
                delete dataUser.empresa_ref
                const planes = this.$fire.firestore
                  .collection(`usuarios/${doc.id}/planes`)
                  .get()
                  .then((snapPlan) => {
                    const dataPlan = {
                      id: snapPlan.docs[0].id,
                      ...snapPlan.docs[0].data(),
                    }
                    usuarios.push({
                      uid: doc.id,
                      ...dataUser,
                      planes: dataPlan,
                    })

                    if (count === 0) {
                      // commit('SET_USUARIOS_LOAD', true)
                      // commit('SET_USUARIOS_DATA', usuarios)
                    }
                    count++
                  })
                planesPromises.push(planes)
              })
              Promise.all(planesPromises).then(() => {
                if (cl)
                  console.info(
                    '----❕ | ⛹  >  ACTION getUsuarios data',
                    usuarios
                  )
                commit('SET_USUARIOS_LOAD', true)
                commit('SET_USUARIOS_DATA', usuarios)
              })

              return {
                error: false,
                doc: usuarios,
              }
            })
            .catch((error) => {
              console.error(error)
              return {
                error: true,
                mensaje: 'Problema de ejecución en getUsuarios ' + error,
              }
            })
        }
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en getUsuarios ' + e,
      }
    }
  },
  getUsuario({ app, ctx, commit, state }, uid) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getUsuario')
    if (state.authUser.uid) {
      return this.$fire.firestore
        .collection('usuarios')
        .doc(uid)
        .get()
        .then((doc) => {
          if (cl) console.info('└──❕ | ⛹  >  ACTION getUsuario docs', doc)
          const usuarios = []
          const dataUser = doc.data()
          delete dataUser.empresa_ref
          return this.$fire.firestore
            .collection(`usuarios/${doc.id}/planes`)
            .get()
            .then((snapPlan) => {
              const dataPlan = {
                id: snapPlan.docs[0].id,
                ...snapPlan.docs[0].data(),
              }
              usuarios.push({
                uid: doc.id,
                ...dataUser,
                planes: dataPlan,
              })
              if (cl)
                console.info('└──❕ | ⛹  >  ACTION getUsuario data', usuarios)
              return usuarios[0]
            })
        })
        .catch((error) => {
          console.error(error)
          return {
            error: true,
            mensaje: 'Problema de ejecución en getUsuarios ' + error,
          }
        })
    }
  },
  getEmpresaN({ app, ctx, commit, state }, uid) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getEmpresaN uid', uid)

    return this.$fire.firestore
      .collection('empresas')
      .doc(uid)
      .get()
      .then((doc) => {
        if (cl)
          console.info(
            '❕ | ⛹  >  ACTION getEmpresaN docs',
            doc.id,
            doc.data()
          )
        return {
          uid: doc.id,
          ...doc.data(),
        }
      })
      .catch((error) => {
        console.error(error)
        return {
          error: true,
          mensaje: 'Problema de ejecución en getEmpresaNs ' + error,
        }
      })
  },
  getPagos({ app, ctx, commit, dispatch, state }) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getPagos')
    try {
      if (this.$fire.auth !== null) {
        if (cl)
          console.info(
            '----❕ | ⛹  >  ACTION getPagos uid',
            state.authUser.uid
          )
        if (state.authUser.uid) {
          this.$fire.firestore
            .collection('pagos')
            .where('empresaref', '==', state.authUser.uid)
            .where('estado', '!=', 'ELIMINADO')
            .get()
            .then((docs) => {
              if (cl)
                console.info('└──❕ | ⛹  >  ACTION getPagos docs', docs.length)
              const pagos = []
              docs.forEach((doc) => {
                // console.log(doc.id, ' => ', doc.data())
                const dataPagos = doc.data()
                delete dataPagos.usuario
                delete dataPagos.enviado.merchant
                const check = checkVigencia(dataPagos)
                if (check.ok) {
                  commit('SET_PAGO_VIGENTE', true)
                  dispatch('actualizarEstadoUsuario', dataPagos.usuarios)
                }
                if (check.proximo && check.ok) {
                  commit('SET_PAGO_PROXIMO', true)
                  commit(
                    'SET_PAGO_PROXIMO_VIGENCIA',
                    dataPagos.vigencia.toDate()
                  )
                }
                pagos.push({
                  uid: doc.id,
                  ok: check.ok,
                  proximo: check.proximo,
                  ...dataPagos,
                })
              })
              if (cl) console.info('└──❕ | ⛹  >  ACTION getPagos data', pagos)
              commit('SET_PAGOS_DATA', pagos)
              commit('SET_PAGOS_LOAD', true)

              return {
                error: false,
                doc: pagos,
              }
            })
            .catch((error) => {
              console.error(error)
              return {
                error: true,
                mensaje: 'Problema de ejecución en getPagos ' + error,
              }
            })
        }
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en getPagos ' + e,
      }
    }
  },
  deletePago({ app, ctx, commit, dispatch, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION deletePago')
    try {
      if (this.$fire.auth !== null) {
        if (cl)
          console.info(
            '----❕ | ⛹  >  ACTION deletePago uid',
            state.authUser.uid,
            payload
          )
        if (state.authUser.uid) {
          return this.$fire.firestore
            .collection('pagos')
            .doc(payload)
            .update({
              estado: 'ELIMINADO',
            })
            .then((est) => {
              if (cl) console.info('└──❕ | ⛹  >  ACTION deletePago est', est)
              dispatch('getPagos')
              return {
                error: false,
                mensaje: 'Pago eliminado con éxito',
                est,
              }
            })
            .catch((error) => {
              if (cl)
                console.error('🚨  | ⛹  >  ACTION deletePago data', error)
              return {
                error: true,
                mensaje: 'Problema al borrar el pago, intenta de nuevo',
              }
            })
        } else {
          return { error: true, mensaje: 'Problema de conexión con Firebase' }
        }
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en deletePago ' + e,
      }
    }
  },
  realizarPagoPSE({ app, ctx, commit, dispatch, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION realizarPagoPSE')
    try {
      return axios
        .post(`${api}/empresas/payu/pse/${state.authUser.uid}`, {
          data_pse: payload,
        })
        .then((resp) => {
          if (cl)
            console.info(
              '⛹  ACTION realizarPagoPSE data',
              resp.data.responseCode
            )
          if (resp.status === 200) {
            if (resp.data.responseCode === 'PENDING_TRANSACTION_CONFIRMATION') {
              if (cl)
                console.info(
                  '⛹  ACTION realizarPagoPSE ok',
                  resp.data.data.pago
                )

              dispatch('getUsuarios')
              dispatch('getPagos')
              return {
                error: false,
                mensaje: 'Se creó tu link de pago PSE.',
                data: {
                  pago: resp.data.data.pago,
                  id: resp.data.data.pago.id,
                  info: resp.data.data.pago.info,
                },
              }
            } else {
              if (cl)
                console.error(
                  '⛹  ACTION realizarPagoPSE data',
                  resp.data.responseCode
                )
              return {
                error: true,
                mensaje:
                  'Ocurrió un error procesando tu pago, por favor verifica los datos de tu tarjeta o elige otro medio de pago.',
              }
            }
          }
          if (resp.status === 204) {
            if (cl)
              console.error(
                '🚨  | ⛹  >  ACTION realizarPagoPSE data',
                resp.status
              )
            return {
              error: true,
              mensaje:
                'Ocurrió un error procesando tu pago, por favor verifica los datos de tu tarjeta o elige otro medio de pago.',
            }
          }
          if (resp.status === 203) {
            if (cl)
              console.error(
                '🚨  | ⛹  >  ACTION realizarPagoPSE data',
                resp.status
              )
            return {
              error: true,
              mensaje:
                'Ocurrió un error procesando tu pago, por favor verifica los datos de tu tarjeta o elige otro medio de pago.',
            }
          }
        })
        .catch((error) => {
          if (cl)
            console.error(
              '---- 🚨  | ⛹  >  ACTION realizarPagoPSE error',
              error
            )
          return {
            error: true,
            mensaje:
              'Ocurrió un error procesando tu pago, por favor verifica los datos de tu tarjeta o elige otro medio de pago.',
          }
        })
    } catch (e) {
      if (cl) console.error('└── 🚨  | ⛹  >  ACTION realizarPagoPSE error', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en getPagos ' + e,
      }
    }
  },
  realizarPagoTC({ app, ctx, commit, dispatch, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION realizarPagoTC')
    try {
      return axios
        .post(`${api}/empresas/payu/token/${state.authUser.uid}`, {
          data_pse: payload,
        })
        .then((resp) => {
          if (cl) console.info('⛹  ACTION realizarPagoTC data', resp.data)

          if (resp.data.data.token.id === 0) {
            return {
              error: true,
              mensaje:
                'Ocurrió un error procesando tu pago, por favor verifica los datos de tu tarjeta o elige otro medio de pago.',
            }
          } else if (resp.data.status === 'SUCCESS') {
            if (resp.data.data.pse.resp.estado === 'approved') {
              // dispatch('getUsuarios')
              dispatch('getPagos')
              return {
                error: false,
                mensaje: 'Tu pago fue procesado con éxito',
                data: {
                  id: resp.data.data.pse.id,
                },
              }
            } else if (resp.data.data.pse.resp.estado === 'rejected') {
              if (cl)
                console.error(
                  '└── 🚨  | ⛹  >  ACTION realizarPagoTC error',
                  resp.data.data.pse.resp.estado
                )
              return {
                error: true,
                mensaje:
                  'La transacción ha sido rechazada, por favor verifica la información del pago.',
              }
            } else {
              return {
                error: true,
                mensaje:
                  'Ocurrió un error procesando tu pago, por favor verifica los datos de tu tarjeta o elige otro medio de pago.',
              }
            }
          } else {
            if (cl)
              console.error(
                '└── 🚨  | ⛹  >  ACTION realizarPagoTC error',
                resp.data.status
              )
            return {
              error: true,
              mensaje:
                'Ocurrió un error procesando tu pago, por favor verifica los datos de tu tarjeta o elige otro medio de pago.',
            }
          }
        })
        .catch((error) => {
          if (cl)
            console.error('└── 🚨  | ⛹  >  ACTION realizarPagoTC error', error)
          return {
            error: true,
            mensaje:
              'Ocurrió un error procesando tu pago, por favor verifica los datos de tu tarjeta o elige otro medio de pago.',
          }
        })
    } catch (e) {
      if (cl) console.error('└── 🚨  | ⛹  >  ACTION realizarPagoTC error', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en getPagos ' + e,
      }
    }
  },
  getPago({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getPago')
    try {
      if (cl) console.info('└──❕ | ⛹  >  ACTION getPago id', payload)
      return this.$fire.firestore
        .collection('pagos')
        .doc(payload)
        .get()
        .then((doc) => {
          if (doc.data().empresaref) {
            if (cl)
              console.info(
                '⛹  ACTION getPago doc',
                doc.id,
                doc.data().empresaref
              )

            return dispatch('getEmpresaN', doc.data().empresaref)
              .then((resp) => {
                return {
                  error: false,
                  pago: {
                    id: doc.id,
                    data: { ...doc.data(), empresa_info: resp },
                  },
                }
              })
              .catch((error) => {
                if (cl)
                  console.error(
                    '└── 🚨  | 1 ⛹  >  ACTION getPago ERROR',
                    error
                  )
                return {
                  error: true,
                  mensaje: 'Problema dal recibir el pago ' + error,
                }
              })
          } else {
            return {
              error: true,
              mensaje: 'Problema dal recibir el pago ',
            }
          }
        })
        .catch((error) => {
          if (cl)
            console.error('└── 🚨  | 2 ⛹  >  ACTION getPago ERROR', error)
          return {
            error: true,
            mensaje: 'Problema dal recibir el pago ' + error,
          }
        })
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en getPago ' + e,
      }
    }
  },
  aprobarPago({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION aprobarPago')

    try {
      if (cl) console.info('└──❕ | ⛹  >  ACTION aprobarPago id', payload)
      return this.$fire.firestore
        .collection('pagos')
        .doc(payload)
        .update({
          estado: 'APPROVED',
        })
        .then((doc) => {
          if (cl) console.info('└──❕ | ⛹  >  ACTION aprobarPago then', doc)
          if (state.authUser.uid) {
            dispatch('getPagos')
          }
          return {
            error: false,
            mensaje: `Pago ${payload} aprobado`,
          }
        })
        .catch((error) => {
          if (cl)
            console.error('└── 🚨  | 2 ⛹  >  ACTION aprobarPago ERROR', error)
          return {
            error: true,
            mensaje: 'Problema dal recibir el pago ' + error,
          }
        })
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en aprobarPago ' + e,
      }
    }
  },
  actualizarEstadoUsuario({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION actualizarEstadoUsuario')
    try {
      if (cl)
        console.info(
          '└──❕ | ⛹  >  ACTION actualizarEstadoUsuario id',
          payload
        )
      payload.forEach((usuario) => {
        if (cl)
          console.info(
            '└──❕ | ⛹  >  ACTION actualizarEstadoUsuario usuario',
            usuario
          )
        this.$fire.firestore
          .collection(`usuarios`)
          .doc(usuario.uid)
          .update({
            empresaporpagar: false,
          })
          .then((est) => {
            if (cl)
              console.info(
                '----❕ | ⛹  >  ACTION actualizarEstadoUsuario finish LISTO',
                usuario.uid
              )
          })
      })
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en actualizarEstadoUsuario ' + e,
      }
    }
  },

  checkVuexStore(ctx) {
    // if (this.$fire.auth === null) {
    //   throw 'Vuex Store example not working - this.$fire.auth cannot be accessed.'
    // }
    // alert(
    //   'Success. Nuxt-fire Objects can be accessed in store ⛹  >  ACTIONs via this.$fire___'
    // )
  },
  getConvenios({ app, ctx, commit, state }) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getConvenios')
    try {
      if (cl) console.info('----❕ | ⛹  >  ACTION getConvenios init')

      return this.$fire.firestore
        .collection('convenios')
        .orderBy('creado', 'desc')
        .get()
        .then((docs) => {
          if (cl)
            console.info(
              '└──❕ | ⛹  >  ACTION getConvenios docs',
              docs.docs.map((con) => {
                return con.id
              })
            )
          const convenios = []
          docs.forEach((doc) => {
            const convenio = doc.data()
            delete convenio.empresa_ref
            convenios.push({
              id: doc.id,
              ...convenio,
            })
          })
          if (cl)
            console.info(
              '└──❕ | ⛹  >  ACTION getConvenios convenios',
              convenios
            )
          commit('SET_CONVENIOS', convenios)
          return {
            error: false,
            docs: convenios,
          }
        })
        .catch((error) => {
          console.error('└── 🚨  | error', error)
          return {
            error: true,
            mensaje: 'Problema de ejecución en getConvenios ' + error,
          }
        })
    } catch (e) {
      console.error('└── 🚨  | error', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en getConvenios ' + e,
      }
    }
  },
  getConvenio({ app, ctx, commit, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getConvenio')
    try {
      if (cl) console.info('----❕ | ⛹  >  ACTION getConvenio init')

      return this.$fire.firestore
        .collection('convenios')
        .doc(payload)
        .get()
        .then((doc) => {
          if (cl) console.info('└──❕ | ⛹  >  ACTION getConvenio docs', doc.id)
          if (doc.exists) {
            return {
              id: doc.id,
              ...doc.data(),
            }
          } else {
            return {
              error: true,
              mensaje: 'Convenio no encontrado',
            }
          }
        })
        .catch((error) => {
          console.error('└── 🚨  | error', error)
          return {
            error: true,
            mensaje: 'Problema de ejecución en getConvenio ' + error,
          }
        })
    } catch (e) {
      console.error('└── 🚨  | error', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en getConvenio ' + e,
      }
    }
  },
  guardarConvenio({ app, ctx, commit, dispatch, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION guardarConvenio')
    try {
      return axios
        .post(`${api}/convenio`, payload)
        .then((resp) => {
          if (cl) console.info('⛹  ACTION guardarConvenio data', resp.data)

          if (resp.data.bitly) {
            dispatch('getConvenios')
            return {
              error: false,
              mensaje: 'El convenio fue creado con éxito',
              data: resp.data,
            }
          } else {
            if (cl)
              console.error(
                '└── 🚨  | ⛹  >  ACTION guardarConvenio error',
                resp.data.status
              )
            return {
              error: true,
              mensaje:
                'Ocurrió un error creando el convenio, intantelo más tarde',
            }
          }
        })
        .catch((error) => {
          if (cl)
            console.error(
              '└── 🚨  | ⛹  >  ACTION guardarConvenio error',
              error
            )
          return {
            error: true,
            mensaje:
              'Ocurrió un error creando el convenio, intantelo más tarde',
          }
        })
    } catch (e) {
      if (cl) console.error('└── 🚨  | ⛹  >  ACTION guardarConvenio error', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en getPagos ' + e,
      }
    }
  },
  editarConvenio({ app, ctx, commit, dispatch, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION editarConvenio')
    try {
      return axios
        .patch(`${api}/convenio`, payload)
        .then((resp) => {
          if (cl) console.info('⛹  ACTION editarConvenio data', resp.data)

          if (resp.data.bitly) {
            dispatch('getConvenios')
            return {
              error: false,
              mensaje: 'El convenio fue actualizado con éxito',
              data: resp.data,
            }
          } else {
            if (cl)
              console.error(
                '└── 🚨  | ⛹  >  ACTION editarConvenio error',
                resp.data.status
              )
            return {
              error: true,
              mensaje:
                'Ocurrió un error actualizando el convenio, intantelo más tarde',
            }
          }
        })
        .catch((error) => {
          if (cl)
            console.error('└── 🚨  | ⛹  >  ACTION editarConvenio error', error)
          return {
            error: true,
            mensaje:
              'Ocurrió un error actualizando el convenio, intantelo más tarde',
          }
        })
    } catch (e) {
      if (cl) console.error('└── 🚨  | ⛹  >  ACTION editarConvenio error', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en editarConvenio ' + e,
      }
    }
  },
  // EMPRESAS
  getConveniosE({ app, ctx, commit, state }) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getConveniosE')
    try {
      if (cl) console.info('----❕ | ⛹  >  ACTION getConveniosE init')

      return this.$fire.firestore
        .collection('convenios_empresas')
        .orderBy('creado', 'desc')
        .get()
        .then((docs) => {
          if (cl)
            console.info(
              '└──❕ | ⛹  >  ACTION getConveniosE docs',
              docs.docs.map((con) => {
                return con.id
              })
            )
          const convenios = []
          docs.forEach((doc) => {
            const convenio = doc.data()
            delete convenio.empresa_ref
            convenios.push({
              id: doc.id,
              ...convenio,
            })
          })
          if (cl)
            console.info(
              '└──❕ | ⛹  >  ACTION getConveniosE convenios',
              convenios
            )
          commit('SET_CONVENIOSE', convenios)
          return {
            error: false,
            docs: convenios,
          }
        })
        .catch((error) => {
          console.error('└── 🚨  | error', error)
          return {
            error: true,
            mensaje: 'Problema de ejecución en getConveniosE ' + error,
          }
        })
    } catch (e) {
      console.error('└── 🚨  | error', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en getConveniosE ' + e,
      }
    }
  },
  getConvenioE({ app, ctx, commit, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getConvenioE')
    try {
      if (cl) console.info('----❕ | ⛹  >  ACTION getConvenioE init')

      return this.$fire.firestore
        .collection('convenios_empresas')
        .doc(payload)
        .get()
        .then((doc) => {
          if (cl)
            console.info('└──❕ | ⛹  >  ACTION getConvenioE docs', doc.id)
          if (doc.exists) {
            return {
              id: doc.id,
              ...doc.data(),
            }
          } else {
            return {
              error: true,
              mensaje: 'Convenio no encontrado',
            }
          }
        })
        .catch((error) => {
          console.error('└── 🚨  | error', error)
          return {
            error: true,
            mensaje: 'Problema de ejecución en getConvenioE ' + error,
          }
        })
    } catch (e) {
      console.error('└── 🚨  | error', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en getConvenioE ' + e,
      }
    }
  },
  guardarConvenioE({ app, ctx, commit, dispatch, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION guardarConvenioE')
    try {
      return axios
        .post(`${api}/convenio_empresa`, payload)
        .then((resp) => {
          if (cl) console.info('⛹  ACTION guardarConvenioE data', resp.data)

          if (resp.data.bitly) {
            dispatch('getConveniosE')
            return {
              error: false,
              mensaje: 'El convenio fue creado con éxito',
              data: resp.data,
            }
          } else {
            if (cl)
              console.error(
                '└── 🚨  | ⛹  >  ACTION guardarConvenioE error',
                resp.data.status
              )
            return {
              error: true,
              mensaje:
                'Ocurrió un error creando el convenio, intantelo más tarde',
            }
          }
        })
        .catch((error) => {
          if (cl)
            console.error(
              '└── 🚨  | ⛹  >  ACTION guardarConvenioE error',
              error
            )
          return {
            error: true,
            mensaje:
              'Ocurrió un error creando el convenio, intantelo más tarde',
          }
        })
    } catch (e) {
      if (cl) console.error('└── 🚨  | ⛹  >  ACTION guardarConvenioE error', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en getPagos ' + e,
      }
    }
  },
  editarConvenioE({ app, ctx, commit, dispatch, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION editarConvenioE')
    try {
      return axios
        .patch(`${api}/convenio_empresa`, payload)
        .then((resp) => {
          if (cl) console.info('⛹  ACTION editarConvenioE data', resp.data)

          if (resp.data.bitly) {
            dispatch('getConveniosE')
            return {
              error: false,
              mensaje: 'El convenio fue actualizado con éxito',
              data: resp.data,
            }
          } else {
            if (cl)
              console.error(
                '└── 🚨  | ⛹  >  ACTION editarConvenioE error',
                resp.data.status
              )
            return {
              error: true,
              mensaje:
                'Ocurrió un error actualizando el convenio, intantelo más tarde',
            }
          }
        })
        .catch((error) => {
          if (cl)
            console.error(
              '└── 🚨  | ⛹  >  ACTION editarConvenioE error',
              error
            )
          return {
            error: true,
            mensaje:
              'Ocurrió un error actualizando el convenio, intantelo más tarde',
          }
        })
    } catch (e) {
      if (cl) console.error('└── 🚨  | ⛹  >  ACTION editarConvenioE error', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en editarConvenioE ' + e,
      }
    }
  },
  getEmpresasConvenioE(
    { app, ctx, commit, state, usuarios, dispatch },
    payload
  ) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getEmpresasConvenioE')
    try {
      if (cl) console.info('----❕ | ⛹  >  ACTION getEmpresasConvenioE init')

      return this.$fire.firestore
        .collection('empresas')
        .where('convenio', '==', payload)
        .get()
        .then((docs) => {
          if (cl)
            console.info(
              '└──❕ | ⛹  >  ACTION getEmpresasConvenioE docs',
              docs
            )
          const empresas = []
          if (!docs.empty) {
            docs.forEach(async (doc) => {
              empresas.push({
                id: doc.id,
                ...doc.data(),
                ...(await dispatch('getEmpresasUsuario', doc.id)),
                ...(await dispatch('getEmpresasPagos', doc.id)),
              })
            })
            return {
              error: false,
              info: empresas,
            }
          } else {
            return {
              error: true,
              mensaje: 'No hay empresas registradas con este código',
            }
          }
        })
        .catch((error) => {
          console.error(error)
          return {
            error: true,
            mensaje: 'Problema de ejecución en getUsuarios ' + error,
          }
        })
    } catch (e) {
      console.error('└── 🚨  | error', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en getConvenioE ' + e,
      }
    }
  },
  getEmpresasUsuario({ app, ctx, commit, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getEmpresasUsuario')
    try {
      if (cl) console.info('----❕ | ⛹  >  ACTION getEmpresasUsuario init')

      return this.$fire.firestore
        .collection('usuarios')
        .where('empresaref', '==', payload)
        .get()
        .then((docs) => {
          if (cl)
            console.info('└──❕ | ⛹  >  ACTION getEmpresasUsuario docs', docs)
          const usuarios = []
          if (!docs.empty) {
            docs.forEach((doc) => {
              delete doc.data().empresa_ref
              usuarios.push({ id: doc.id, ...doc.data() })
            })
            return {
              usuarios,
            }
          } else {
            return usuarios
          }
        })
        .catch((error) => {
          console.error(error)
          return {
            error: true,
            mensaje: 'Problema de ejecución en getUsuarios ' + error,
          }
        })
    } catch (e) {
      console.error('└── 🚨  | error', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en getConvenioE ' + e,
      }
    }
  },
  getEmpresasPagos({ app, ctx, commit, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getEmpresasUsuario')
    try {
      if (cl) console.info('----❕ | ⛹  >  ACTION getEmpresasUsuario init')

      return this.$fire.firestore
        .collection('pagos')
        .where('empresaref', '==', payload)
        .get()
        .then((docs) => {
          if (cl)
            console.info('└──❕ | ⛹  >  ACTION getEmpresasUsuario docs', docs)

          const pagos = []
          if (!docs.empty) {
            docs.forEach((doc) => {
              delete doc.data().usuario
              delete doc.data().empresa_ref
              pagos.push({ id: doc.id, ...doc.data() })
            })
            return {
              pagos,
            }
          } else {
            return pagos
          }
        })
        .catch((error) => {
          console.error(error)
          return {
            error: true,
            mensaje: 'Problema de ejecución en getUsuarios ' + error,
          }
        })
    } catch (e) {
      console.error('└── 🚨  | error', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en getConvenioE ' + e,
      }
    }
  },
}
