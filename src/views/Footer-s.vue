<template>
    <v-footer
      class="text-center d-flex flex-column"
      color="#162D4B"
      >
      <div class="footer-container">
        <a href="https://esam.edu.bo/">
        <img src="@/assets/esam.png" alt="esam" class="logo" />
        </a> 
        <a href="https://www.dbussinesschool.com/">
        <img src="@/assets/dbs.png" alt="dbs" class="logo" />
        </a>
        <a href="https://esamlatam.com/">
        <img src="@/assets/latam.png" alt="latam" class="logo" />
        </a>
        <a href="https://www.cca.edu.bo/#/">
        <img src="@/assets/cca.png" alt="cca" class="logo" />
        </a>
        <a href="https://ciberkids.com.bo/#/">
        <img src="@/assets/ck.png" alt="ck" class="logo" />
        </a>
        <img src="@/assets/sud.png" alt="sub" class="logo" />
        <a href="https://castja.edu.bo/">
        <img src="@/assets/intradigital.png" alt="intradigital" class="logo" />
        </a>
        <a href="https://www.cybercorp.com.bo/#/">
        <img src="@/assets/cybercorp.png" alt="cybercorp" class="logo" />
        </a>
      <div class="social-icons">
      <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>
    </div>
      <div class="pt-0">
        <strong>Copyright ©2024 Desarrollado por ESAM LA PAZ</strong> </div>
    </v-footer>
  </template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>
<style scoped>
.v-footer {
  padding: 20px; /*Ajusta el espacio interno*/
}
.logo {
  width: 80px; /* Ajusta el tamaño del logotipo*/
  margin-right: 20px; /* Ajusta el espacio entre los logotipos y los botones de redes sociales */
}

.social-icons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>