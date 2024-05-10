<template>
          <v-card class="mx-auto" width="1100px">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4 text-center">¿Cómo fue tu experiencia hoy en tu visita a Esam?</v-card-title>

    <div class="text-center">
      <v-rating
        v-model="rating"
        color="orange lighten-1" 
        background-color="grey lighten-1"
        length="5"
      >
        <template v-slot:item="{ index }">
          <img :src="getFace(index + 1)" :key="index" height="50">
        </template>
      </v-rating>
    </div>
</v-card>
  </template>
  
  <script>
  export default {
    data: () => ({
      rating: 3,
      faces: [
        '/src/assets/emociones/triste.png', // Ruta a la imagen de muy triste
        '/src/assets/emociones/triste1.png',       // Ruta a la imagen de triste
        '/src/assets/emociones/departamento.png',   // Ruta a la imagen de neutral
        '/src/assets/emociones/sonrisa1.png',     // Ruta a la imagen de feliz
        '/src/assets/emociones/sonrisa.png' // Ruta a la imagen de muy feliz
      ]
    }),
    methods: {
      getFace(index) {
        return this.faces[index - 1];
      }
    }
  }
  </script>
  
  <style>
  /* Aquí puedes agregar estilos adicionales si lo necesitas */
  </style>
  
  


  '/src/assets/emociones/sonrisa.png'