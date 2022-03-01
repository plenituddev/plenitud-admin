
<template>
  <div>
    <div class="flex justify-between items-center">
      <Header titulo="Subir archivo con usuarios"></Header>
    </div>
    <transition name="p-fade">
      <div v-if="url == null" key="v1" class="links">
        <div class="flex h-96 justify-center items-center">
          <div class="w-3/4 flex items-center justify-around space-x-8">
            <div class="w-full lg:w-1/2 lg:mb-5">
              <p
                class="
                  leading-tight
                  text-1xl
                  lg:text-3xl
                  text-indigo-100
                  lg:border-r
                  border-indigo-100
                  lg:pr-11
                  mb-2
                "
              >
                Carga un archivo con los usuarios que quieres descargar. Debe
                ser un archivo de Excel, si no tienes el formato puedes
                descargarlo
                <a
                  href="https://firebasestorage.googleapis.com/v0/b/plenitud-web-v2.appspot.com/o/EMPRESAS%20Plenitud%20-%20plantilla.xlsx?alt=media&token=42653c8f-090b-4b63-be1b-4fdd76f6b3da"
                  target="_blank"
                  class="text-yellow-500 font-bold"
                  >aquí</a
                >
              </p>
            </div>
            <div class="w-full lg:w-1/2">
              <label
                class="
                  w-full
                  flex flex-col
                  items-center
                  px-4
                  py-6
                  bg-indigo-100
                  rounded-md
                  shadow-md
                  tracking-wide
                  border border-blue
                  cursor-pointer
                  hover:bg-indigo-500 hover:bg-indigo-100
                  text-indigo-500
                  ease-linear
                  transition-all
                  duration-150
                "
              >
                <i class="far fa-file-upload fa-3x font-light"></i>
                <span class="mt-2 text-base leading-normal"
                  >Seleccionar archivo</span
                >
                <input
                  ref="archivo"
                  type="file"
                  accept=".xlsx"
                  name="archivo"
                  class="hidden"
                  @change="verificarArchivo"
                />
              </label>
              <p v-if="nombre" class="text-center my-2 text-xs text-indigo-200">
                {{ nombre }}
              </p>
              <button
                :disabled="!listo"
                class="p-btn mt-4 w-full"
                @click="uploadFile()"
              >
                Cargar archivo
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <LeerExcel
          key="v2"
          :rows="rows"
          :url="url"
          @recargar="recargar"
        ></LeerExcel>
      </div>
    </transition>
  </div>
</template>

<script >
import readXlsxFile from 'read-excel-file'
import AuthMixin from '~/mixins/auth.js'
import LeerExcel from '~/components/usuarios/LeerExcel.vue'
export default {
  components: {
    LeerExcel,
  },
  mixins: [AuthMixin],
  data() {
    return {
      url: null,
      listo: false,
      nombre: null,
      rows: null,
    }
  },
  methods: {
    recargar() {
      console.info('RECARGAR')
      this.url = null
      // this.$forceUpdate()
    },
    verificarArchivo() {
      if (this.$refs.archivo.files.length > 0) {
        this.listo = true
        this.nombre = this.$refs.archivo.files[0].name
        readXlsxFile(this.$refs.archivo.files[0]).then((rows) => {
          this.rows = rows
        })
      } else {
        this.listo = false
        this.nombre = null
      }
    },
    uploadFile() {
      const file = this.$refs.archivo.files[0]
      const name = +new Date() + '-' + this.authUser.uid
      const metadata = { contentType: file.type }

      const task = this.$fire.storage
        .ref()
        .child('empresas/' + name)
        .put(file, metadata)

      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          this.$noty.success('Archivo cargado con éxito', {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
          console.log(url)
          this.url = url
        })
        .catch((error) => {
          this.$noty.success('Ocurrió un error al cargar el archivo', {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
          console.error(error)
        })
    },
    async getFileUrl() {
      const storageRef = this.$fire.storage.ref().child('message.txt')
      try {
        const url = await storageRef.getDownloadURL()
        alert(`The file can be found here: ${url}`)
      } catch (e) {
        alert(e.message)
      }
    },
  },
}
</script>
