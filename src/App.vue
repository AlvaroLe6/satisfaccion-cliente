<script setup>
import Footer from "@/views/Footer.vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
import UserProfile from '@/layouts/UserProfile.vue'


const auth = useAuthStore();
</script>
<template>
  <v-app>
    <v-card elevate="3" class="fill-height">
      <v-app-bar app color="#162D4B">
        <v-toolbar-title>
          <router-link :to="{ name: 'login' }">
            <img
              src="@/assets/ESCUELA DE NEGOCIOS_HORIZONTAL BLANCO.png"
              alt="80"
              height="80"
            />
          </router-link>
        </v-toolbar-title>

        <template v-slot:append>
          <div 
          class="container"
          v-if="auth.isAuth" 
          >
            <v-btn :to="{ name: 'admin-list-contabilidad' }" 
            class="button"> 
            Admin 
          </v-btn>
            
            <UserProfile />
      
          </div>
          <div v-else>
            <v-btn :to="{ name: 'login' }"> Iniciar Sesión </v-btn>
          </div>
      
        </template>
      </v-app-bar>
      <v-main style="margin-bottom: 50px">
        <v-container  fluid="true">
          <router-view />
        </v-container>
      </v-main>
    </v-card>

    <Footer />
  </v-app>
</template>
<script>
export default {
  data: () => ({
    items: [
      { title: "Cursos", route: "cursos" },
      { title: "Webinar", route: "webinar" },
    ],
  }),
  methods: {
    redirectToView(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>
<style>
.container {
    text-align: center;
}

.button {
    margin-bottom: 10px;
}
</style>