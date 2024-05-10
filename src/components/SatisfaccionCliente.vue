<script setup>
import { useForm } from "vee-validate";
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";

const db = useFirestore();
const router = useRouter();
const { handleSubmit, form } = useForm();
const fecha = ref(new Date().toISOString());

const dialog = ref(false);
const rating = ref(3);
const faces = ref([
"/src/assets/emociones/1.png", // Muy triste  1
  "/src/assets/emociones/2.png", // Triste      2
  "/src/assets/emociones/3.png", // Neutral     3
  "/src/assets/emociones/4.png", // Feliz       4
  "/src/assets/emociones/5.png", // Muy feliz   5
]);

function getFace(index) {
  return faces.value[index - 1];
}
  function resetSatisfaccion() {
  rating.value = 0; // Restablece la calificación a un valor inicial, por ejemplo 0
  dialog.value = false; // Cierra el diálogo
}

watch(rating, (newRating) => {
  if (newRating) {
    saveRating();
  }
});

async function saveRating() {
  let originalId = "COD-SC-";
  let contador = 1;



  const queryID = await getDocs(collection(db, "satisfaccion_cliente"));
  queryID.forEach((doc) => {
    const id = doc.id;
    const partes = id.split("-");
    const secuencia = partes[partes.length - 1]; // Obtiene el último elemento del array
    if (secuencia && !isNaN(secuencia)) {
      const numSecuencia = parseInt(secuencia);
      if (numSecuencia >= contador) {
        contador = numSecuencia + 1;
      }
    }
  });

  const generateNewId = () => {
    return `${originalId}${contador}`;
  };

  let generatedId = generateNewId();

  try {
    await setDoc(doc(db, "satisfaccion_cliente", generatedId), {
      rating: rating.value,
      idSatisfaccionC: generatedId,
      fechaReg: fecha.value,
    });
    dialog.value = true;
    console.log("Respuesta Guardada correctamente: ");
    // Redirige al usuario a la lista de registros
    //router.push({ name: "admin-list-contabilidad" });
  } catch (error) {
    console.error("Error al guardar: ", error);
  }
}
</script>

<template>
<v-container>
  <v-card class="mx-auto" >
    <v-card-title class="text-center-exp text-h6 text-md-h5 text-lg-h4">
      ¿Cómo fue tu experiencia hoy en tu visita a Esam?
    </v-card-title>

    <div class="text-center">
      <v-rating
        v-model="rating"
        color="amber darken-3"
        background-color="grey lighten-1"
        length="5"
        dense
      >
        <template v-slot:item="{ index }">
          <img :src="getFace(index + 1)" :key="index" height="50" />
        </template>
      </v-rating>
    </div>
  </v-card>
  
  <v-fade-transition hide-on-leave>
    <div class="dialog-container">
    <v-card v-if="dialog" class="mx-auto" elevation="16" max-width="300">
      <template v-slot:append>
        <v-btn icon @click="resetSatisfaccion">
          <v-icon>$close</v-icon>
        </v-btn>
      </template>

      <v-divider></v-divider>

      <div class="py-6 text-center">
        <v-icon class="mb-1" color="success" icon="mdi-check-circle-outline" size="128"></v-icon>
        <div class="text-h6 font-weight-bold">Gracias por su respuesta</div>
      </div>

      <v-divider></v-divider>

      <div class="pa-4 text-end">
        <v-btn color="medium-emphasis" min-width="92" outlined rounded @click="resetSatisfaccion">
          Cerrar
        </v-btn>
      </div>
    </v-card>
  </div>
  </v-fade-transition>
  
</v-container>

</template>
  <style>
.text-center-exp
{ 
  white-space: normal;
  overflow-wrap: break-word;  
  font-size: 4vw;
  max-font-size: 20px; 
  min-font-size: 12px; 
  text-align: center;
  font-weight: bold;
  color: #00CBCC;
 }
 .dialog-container {
  position: relative;
  height: 100vh; 

}

.dialog-card {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 300px; /* Ajusta el ancho máximo si es necesario */
  width: 90%; /* Hace que el ancho sea más flexible y adaptativo */
  z-index: 1000;
}

</style>
