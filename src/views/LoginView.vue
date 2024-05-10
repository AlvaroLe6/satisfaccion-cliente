<script setup >
import LoginForm from "@/components/LoginForm.vue";
</script>
<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
          <v-card
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 withbg mx-auto"
            max-width="500"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4">
                <img
                  src="@/assets/ESCUELA DE NEGOCIOS_Mesa de trabajo 1.png"
                  alt="80"
                  height="80"
                />
              </div>
              <div class="text-body-1 text-muted text-center mb-3">
                Iniciar Sesión
              </div>
              <LoginForm />
              <h6
                class="text-h6 text-muted font-weight-medium d-flex justify-center align-center mt-3"
              >
                ¿Nuevo en Esam?
                <RouterLink
                  to="/register"
                  class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2"
                >
                  Crea una cuenta</RouterLink
                >
              </h6>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style>
div.authentication .text-body-1 {
  font-size: 24px;
  font-weight: bold;
}
</style>