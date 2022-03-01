<template>
  <footer class="p-footer">
    <div class="container">
      <div class="w-full px-4 text-white flex flex-col">
        <div class="flex flex-col">
          <div class="flex mt-24 mb-12 flex-row justify-between items-center">
            <div class="">
              <img src="~assets/images/logo2.png" alt="Plenitud Empresas" />
            </div>

            <a class="p-footer-link"
              >Condiciones generales de los Contratos de Protección Exequial
            </a>
            <a class="p-footer-link"
              >Políticas de tratamiento y protección de datos personales
            </a>

            <div class="p-social">
              <a
                class="px-2"
                href="https://www.facebook.com/PlenitudProteccion"
                target="_blank"
                ><i class="fab fa-facebook"></i
              ></a>
              <a
                class="px-2"
                href="https://www.instagram.com/plenitud_/"
                target="_blank"
                ><i class="fab fa-instagram"></i
              ></a>
            </div>
          </div>
          <hr class="border-p-cream2" />
          <div
            class="
              flex
              mt-8
              mb-8
              flex-row
              justify-between
              text-p-cake
              items-center
              font-light
            "
          >
            <p>
              <i class="fas fa-map-marker-alt mr-2 text-p-orang"></i
              ><b>Dirección</b> Carrera 45D # 57 – 64 Prado centro
            </p>
            <p>
              <i class="fas fa-envelope mr-2 text-p-orang"></i> <b>Email:</b>
              <a href="mailto:info@grupoplenitud.com.co"
                >info@grupoplenitud.com.co</a
              >
            </p>
            <p>
              <i class="fas fa-phone mr-2 text-p-orang"></i
              ><b>Línea nacional:</b> 57 (604) 4485500
            </p>
          </div>
          <hr class="border-p-cream2" />
          <p class="w-full text-center my-12 text-p-cake">
            Todos los derechos reservados ©
            {{ new Date().getFullYear() }} Plenitud
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="postcss">
.p-footer {
  @apply w-full py-12 flex items-center justify-center bg-p-cream1;
  a.p-footer-link {
    @apply hidden lg:block cursor-pointer text-sm font-light text-p-blue hover:text-p-cake2;
  }
  .p-social {
    @apply flex flex-row space-x-8 items-center justify-between;
    a {
      i {
        @apply text-p-orang text-2xl hover:text-p-pink2;
      }
    }
  }
}
</style>