<script setup>
import { useForm, useField } from "vee-validate";
import { collection, setDoc ,getDocs ,doc} from "firebase/firestore";
import { useFirestore } from "vuefire";
import { useRouter } from "vue-router";
import { validationSchema, imageSchema } from "@/validation/contabilidadSchema.js";
import useImage from "@/composables/useImage";
import { ref } from 'vue';




const fechaFin = ref(new Date().toISOString().substr(0, 10));
const db = useFirestore();
const router = useRouter();
const textoCancelar = "Cancelar";
const textoSeleccionar = "Seleccionar";

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  },
});

const { url, uploadImage, image } = useImage();

const monto = useField("monto");
const detalle = useField("detalle");
const tipoPago = useField("tipoPago");
const tipo = ["Recibo", "Factura"];
const imagen = useField("imagen");

const submit = handleSubmit(async (values) => {

  const { imagen, ...contabilidad_rc } = values
  
  let originalId = "COD-CC-"; 
  let contador = 1; 

  const queryID = await getDocs(collection(db, "contabilidad_rc"));
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
  const docRef = await setDoc(doc(collection(db, 'contabilidad_rc'),generatedId), {
    ...contabilidad_rc,
    image: url.value,
    idRegCaja: generatedId,
    fecha: fechaFin.value,
    estado: true, 
  });
  console.log("Documento guardado correctamente.");

// Redirige al usuario a la lista de registros
router.push({ name: "admin-list-contabilidad" });

} catch (error) {
  console.error('Error al guardar el documento en Firestore:', error);
}
});

</script>
    

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Nuevo registro 
    </v-card-title>

    <v-card-subtitle class="text-h5 py-5">
      Agrega un nuevo registro llenando el siguiente formulario
    </v-card-subtitle>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title class="d-flex">
        </v-card-title>
        <VDivider />

        <v-card-title>
          <!-- Formulario -->
          <VForm class="mt-6">
            <v-row>
              <!-- Monto -->
              <v-col
                md="6"
                cols="12"
              >
                <v-text-field
                v-model="monto.value.value"
                label="Monto"
                variant="outlined"
                persistent-hint
                ></v-text-field>
              </v-col>

              <!-- Fecha -->
              <v-col
                md="6"
                cols="12"
              >
              <VueDatePicker
              v-model="fechaFin"
              locale="es"
              :teleport="true"
              :enable-time-picker="false"
              placeholder="Fecha de fin"
              :year-range="[2021, 2060]"
              :cancel-text="textoCancelar"
              :select-text="textoSeleccionar"
            >
            </VueDatePicker>
              </v-col>
              <!-- Detalle -->
              <v-col
                cols="12"
                md="6"
              >
              
                <v-text-field
                v-model="detalle.value.value"
                 label="Detalle"
                 variant="outlined"
                persistent-hint
                ></v-text-field>

              </v-col>
              <!-- Tipo  -->
              <v-col
                cols="12"
                md="6"
              >
              <v-select
                  v-model="tipoPago.value.value"
                  label="Tipo"
                  :items="tipo" 
                  outlined
                  variant="outlined"
                  persistent-hint
                  ></v-select>

              </v-col> 
              <!-- Columna de la imagen -->
        <v-col cols="12" md="4">
          <v-file-input
            variant="outlined"
            persistent-hint
            accept="image/jpeg"
            label="Portada"
            prepend-icon="mdi-camera"
            class="mb-5"
            v-model="imagen.value.value"
            :error-messages="imagen.errorMessage.value"
            @change="uploadImage"
          />
          <div v-if="image" class="my-5">
            <p class="font-weight-bold">Imagen</p>
            <img class="w-50" :src="image" />
          </div>
        </v-col>          

              <!-- Acciones del Formulario -->
              <v-col
                cols="12"
                class="d-flex flex-wrap gap-4"
              >

                <VBtn  @click="submit">Guardar</VBtn>

                <VBtn
                  color="secondary"
                  variant="outlined"
                  type="reset"
                  @click.prevent=""
                >
                  Borrar  
                </VBtn>
              </v-col>
            </v-row>
          </VForm>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</v-card>
</template>


