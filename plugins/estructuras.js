import moment from 'moment'

export default ({ context, app }, inject) => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const minDate = new Date(today)
  minDate.setYear(minDate.getFullYear() - 65)
  const maxDate = new Date(today)
  maxDate.setYear(maxDate.getFullYear() - 18)
  const maxDateS = moment(maxDate).format('YYYY-MM-DD')

  inject('p_structure', (type) => {
    const typ = {
      userData: {
        email:
          process.env.NODE_ENV !== 'production'
            ? `test${Math.random()}@melborp.co`
            : '',
        nombre: process.env.NODE_ENV !== 'production' ? `Test empresa` : '',
        empresa: process.env.NODE_ENV !== 'production' ? `Empresa` : '',
        password: process.env.NODE_ENV !== 'production' ? `Problem4321` : '',
        celular: process.env.NODE_ENV !== 'production' ? `3007856334` : '',
        nit: process.env.NODE_ENV !== 'production' ? `878798789798` : '',
        razon_social: '',
        completo: false,
        actualizado: false,
        pais: 'CO',
        empresa_direccion: '',
        direccion: {
          direccion: '',
          dir_completa: '',
          dir_corta: '',
          info: '',
          latitude: '',
          longitude: '',
          postal: '',
          departamento: '',
          municipio: '',
        },

        empresa_telefono: '',
        empresa_celular: '',
        empresa_email: '',

        contacto_telefono: '',
        contacto_email: '',
        contacto_nombre: '',

        terminos: '',
        condiciones: '',
      },
      usuarioForm: {
        empresaref: null,
        empresa: true,
        empresaporpagar: true,
        fbuy: false,
        asesor: false,
        payu: true,
        pais: 'CO',
        estado: 'creado',
        codigo: null,
        codigo_tipo: null,
        codigo_ok: false,
        codigo_data: null,
        planes: null,
        actualizado: true,
        beneficiarios_act: false,
        documento:
          process.env.NODE_ENV === 'production'
            ? ''
            : '71271251' + Math.floor(Math.random() * 8000),
        personales: {
          nombres:
            process.env.NODE_ENV === 'production'
              ? ['', '']
              : ['Juan', 'Manuel'],
          apellidos:
            process.env.NODE_ENV === 'production'
              ? ['', '']
              : ['Osorio', 'Cano'],
          nombre_completo:
            process.env.NODE_ENV === 'production' ? '' : 'Juan Manuel',
          apellido_completo:
            process.env.NODE_ENV === 'production' ? '' : 'Osorio',
          tipo: 'CC',
          sexo: null,
          documento: null,

          fecha: maxDateS,
        },
        contacto: {
          email:
            process.env.NODE_ENV === 'production'
              ? ''
              : 'juanma.osoc' + Math.random() + '@gmail.com',
          departamento: null,
          municipio: null,
          direccion: '',
          celular: process.env.NODE_ENV === 'production' ? '' : '3007856334',
        },
        password: process.env.NODE_ENV === 'production' ? '' : 'Problem4321',
        password2: process.env.NODE_ENV === 'production' ? '' : 'Problem4321',
        checked: ['terminos', 'politicas'],
      },
      planes: {
        clasico: {
          beneficiarios: 6,
          mascotas: {
            mascotas: 0,
            seleccionado: -1,
          },
          salud: {
            planes: 'Consulta médica',
            seleccionado: 0,
          },
          seguros: {
            planes: 'Seguro de Accidente',
            seleccionado: 0,
          },
          tipo: {
            tipo: 'PLENITUD CLÁSICO',
            empresas: true,
            codigo: 'CLASICOE',
            vigencia: 1,
            valor: 21500,
            repratacion_cam: false,
            repratacion_nam: false,
            regalo: false,
            regalo_doc: null,
          },
        },
        superior: {
          beneficiarios: 6,
          mascotas: {
            mascotas: 0,
            seleccionado: -1,
          },
          salud: {
            planes: 'Consulta + Visita programada',
            seleccionado: 1,
          },
          seguros: {
            planes: 'Seguro de Accidente',
            seleccionado: 0,
          },
          tipo: {
            tipo: 'PLENITUD SUPERIOR',
            empresas: true,
            codigo: 'SUPERIORE',
            vigencia: 1,
            valor: 39500,
            repratacion_cam: false,
            repratacion_nam: false,
            regalo: false,
            regalo_doc: null,
          },
        },
        elite: {
          beneficiarios: 6,
          mascotas: {
            mascotas: 2,
            plan: 'Plan Élite de mascotas',
            seleccionado: 1,
          },
          salud: {
            planes: 'Consulta + Visita programada 24/7',
            seleccionado: 2,
          },
          seguros: {
            planes: 'Seguro de Vida + Seguro de Accidente',
            seleccionado: 1,
          },
          tipo: {
            tipo: 'PLENITUD ÉLITE',
            empresas: true,
            codigo: 'ELITEE',
            vigencia: 1,
            valor: 88000,
            repratacion_cam: false,
            repratacion_nam: false,
            regalo: false,
            regalo_doc: null,
          },
        },
      },
      pagos: {
        creado: new Date(),
        empresaref: null,
        estado: 'CREADA',
        tipo: null,
        usuarios: null,
        vigencia: null,
        pagosp: null,
        enviado: null,
      },
      form_pse: {
        codigo: null,
        banco: null,
        nombre_titular:
          process.env.NODE_ENV === 'production' ? null : 'Juan Manuel Osorio',
        tipo_cliente: null,
        tipo_documento: null,
        documento: process.env.NODE_ENV === 'production' ? null : '71271251',
        telefono: process.env.NODE_ENV === 'production' ? null : '3007856334',
        email:
          process.env.NODE_ENV === 'production'
            ? null
            : 'juanma.osoc@gmail.com',
      },
      form_tc: {
        codigo: null,
        tarjeta: {
          cedula: process.env.NODE_ENV === 'production' ? null : '71271251',
          cardNumber:
            process.env.NODE_ENV === 'production' ? null : '4111111111111111',
          cardExpiry: process.env.NODE_ENV === 'production' ? null : '12/30',
          cardNombre:
            process.env.NODE_ENV === 'production' ? null : 'MBP GROUP SAS',
          cardCvv: process.env.NODE_ENV === 'production' ? null : '123',
          tipo: null,
          nombres: process.env.NODE_ENV === 'production' ? null : 'Juan Manuel',
          apellidos:
            process.env.NODE_ENV === 'production' ? null : 'Osorio Cano',
          celular: process.env.NODE_ENV === 'production' ? null : '3007856334',
          email:
            process.env.NODE_ENV === 'production'
              ? null
              : 'juanma.osoc@gmail.com',
        },
      },
      convenio: {
        id: '',
        creado: new Date(),
        nombre: '',
        empresa: '',
        activo: true,
        usado: false,
        bitly: '',
        logo: '',
        pais: 'CO',
        tipo: 2, // Tipo 0 se regal el primer mes ,         Tipo 1 de regala el segundo mes ,         Tipo 2 paga normal
        planes: {
          clasico: {
            activo: false,
            beneficiarios: 6,
            mascotas: {
              mascotas: 0,
              seleccionado: -1,
            },
            salud: {
              planes: 'Consulta médica',
              seleccionado: 0,
            },
            seguros: {
              planes: 'Seguro de Accidente',
              seleccionado: 0,
            },
            tipo: {
              tipo: 'PLENITUD CLÁSICO',
              codigo: 'CLASICOP',
              vigencia: 1,
              valor: 21500,
              repratacion_cam: false,
              repratacion_nam: false,
              regalo: false,
              regalo_doc: null,
            },
          },
          mascotas: {
            activo: false,
            beneficiarios: 1,
            mascotas: {
              mascotas: 1,
              seleccionado: -1,
            },
            salud: {
              planes: 'Consulta médica',
              seleccionado: 0,
            },
            seguros: {
              planes: 'Seguro de Accidente',
              seleccionado: 0,
            },
            tipo: {
              tipo: 'PLENITUD CLÁSICO',
              codigo: 'CLASICOP',
              vigencia: 1,
              valor: 18500,
              repratacion_cam: false,
              repratacion_nam: false,
              regalo: false,
              regalo_doc: null,
            },
          },
          superior: {
            activo: false,
            beneficiarios: 6,
            mascotas: {
              mascotas: 0,
              seleccionado: -1,
            },
            salud: {
              planes: 'Consulta + Visita programada',
              seleccionado: 1,
            },
            seguros: {
              planes: 'Seguro de Accidente',
              seleccionado: 0,
            },
            tipo: {
              tipo: 'PLENITUD SUPERIOR',
              codigo: 'SUPERIORP',
              vigencia: 1,
              valor: 39500,
              repratacion_cam: true,
              repratacion_nam: false,
              regalo: false,
              regalo_doc: null,
            },
          },
          elite: {
            activo: false,
            beneficiarios: 6,
            mascotas: {
              mascotas: 2,
              plan: 'Plan Élite de mascotas',
              seleccionado: 1,
            },
            salud: {
              planes: 'Consulta + Visita programada 24/7',
              seleccionado: 2,
            },
            seguros: {
              planes: 'Seguro de Vida + Seguro de Accidente',
              seleccionado: 1,
            },
            tipo: {
              tipo: 'PLENITUD ÉLITE',
              codigo: 'ELITEP',
              vigencia: 1,
              valor: 88000,
              repratacion_cam: true,
              repratacion_nam: true,
              regalo: false,
              regalo_doc: null,
            },
          },
        },
      },
      convenioE: {
        id: '',
        creado: new Date(),
        nombre: '',
        empresa: '',
        activo: true,
        unico: false,
        usado: false,
        bitly: '',
        pais: 'CO',
        tipo: 2, // Tipo 0 se regal el primer mes ,         Tipo 1 de regala el segundo mes ,         Tipo 2 paga normal
        planes: {
          clasico: {
            activo: false,
            beneficiarios: 6,
            mascotas: {
              mascotas: 0,
              seleccionado: -1,
            },
            salud: {
              planes: 'Consulta médica',
              seleccionado: 0,
            },
            seguros: {
              planes: 'Seguro de Accidente',
              seleccionado: 0,
            },
            tipo: {
              tipo: 'PLENITUD CLÁSICO',
              codigo: 'CLASICOP',
              vigencia: 1,
              valor: 21500,
              repratacion_cam: false,
              repratacion_nam: false,
              regalo: false,
              regalo_doc: null,
            },
          },
          mascotas: {
            activo: false,
            beneficiarios: 1,
            mascotas: {
              mascotas: 1,
              seleccionado: -1,
            },
            salud: {
              planes: 'Consulta médica',
              seleccionado: 0,
            },
            seguros: {
              planes: 'Seguro de Accidente',
              seleccionado: 0,
            },
            tipo: {
              tipo: 'PLENITUD CLÁSICO',
              codigo: 'CLASICOP',
              vigencia: 1,
              valor: 18500,
              repratacion_cam: false,
              repratacion_nam: false,
              regalo: false,
              regalo_doc: null,
            },
          },
          superior: {
            activo: false,
            beneficiarios: 6,
            mascotas: {
              mascotas: 0,
              seleccionado: -1,
            },
            salud: {
              planes: 'Consulta + Visita programada',
              seleccionado: 1,
            },
            seguros: {
              planes: 'Seguro de Accidente',
              seleccionado: 0,
            },
            tipo: {
              tipo: 'PLENITUD SUPERIOR',
              codigo: 'SUPERIORP',
              vigencia: 1,
              valor: 39500,
              repratacion_cam: true,
              repratacion_nam: false,
              regalo: false,
              regalo_doc: null,
            },
          },
          elite: {
            activo: false,
            beneficiarios: 6,
            mascotas: {
              mascotas: 2,
              plan: 'Plan Élite de mascotas',
              seleccionado: 1,
            },
            salud: {
              planes: 'Consulta + Visita programada 24/7',
              seleccionado: 2,
            },
            seguros: {
              planes: 'Seguro de Vida + Seguro de Accidente',
              seleccionado: 1,
            },
            tipo: {
              tipo: 'PLENITUD ÉLITE',
              codigo: 'ELITEP',
              vigencia: 1,
              valor: 88000,
              repratacion_cam: true,
              repratacion_nam: true,
              regalo: false,
              regalo_doc: null,
            },
          },
        },
      },
    }
    return typ[type]
  })
}
