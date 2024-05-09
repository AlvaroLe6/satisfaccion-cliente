<script setup>

import { RouterView } from "vue-router";
import FooterS from '@/views/Footer-s.vue';

</script>

<template>
  <v-app>
    
      <v-app-bar app color="#162D4B" class="app-bar" >

      </v-app-bar>
      <v-main style="margin-bottom: 50px">
        <v-container  fluid="true">
          <router-view />
        </v-container>
      </v-main> 
    <FooterS />
   
  </v-app>
</template>

<script>
export default {

  data: () => ({

  }),
  methods: {
    redirectToView(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

