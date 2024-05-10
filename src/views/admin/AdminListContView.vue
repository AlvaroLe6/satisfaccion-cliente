<script setup>

import { computed } from 'vue';
import useContabilidad from '@/composables/useContabilidad'

const {
  contabilidadFecha,
  dialog,
  dialogDelete,
  editedItem,
  editedIndex,
  editItem,
  deleteItem,
  deleteItemConfirm,
  save,
} = useContabilidad();

const tipo = ["Recibo", "Factura"];

function initialize() {
  // Tu código para inicializar o recargar los datos
}

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'Nuevo Registro' : 'Editar Registro';
});
// Métodos para abrir los diálogos
const openEditDialog = (item) => {
  editItem(item);
  dialog.value = true;
};

const openDeleteDialog = (item) => {
  deleteItem(item);
  dialogDelete.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  editedItem.value = {};
  editedIndex.value = -1;
};

const closeDeleteDialog = () => {
  dialogDelete.value = false;
  editedItem.value = {};
  editedIndex.value = -1;
};
const saveItem = () => {
  save();
  dialog.value = false;
};
const deleteItemConfirmDialog = () => {
  deleteItemConfirm();
  dialogDelete.value = false;
};

</script>

<script>

export default {
  data() {
    return {

      //Componentes de la tabla 
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          title: 'Codigo registro',
          align: 'start',
          sortable: false,
          key: 'idRegCaja',
        },
        { title: 'Monto (Bs.)', key: 'monto' },
        { title: 'Tipo', key: 'tipoPago' },
        { title: 'Fecha', key: 'fecha' },
        { title: 'Detalle', key: 'detalle' },
        { title: 'Estado', text: 'Estado', value: 'estado' },
        { title: 'Acciones', key: 'actions', sortable: false },
      ],
      //------------------------------------------------
    };
  },
};
</script>

<template>
  <v-btn color="blue" variant="flat" :to="{ name: 'nuevo-reg-contabilidad' }">Nuevo Registro</v-btn>

  <h2 class="text-center text-h3 my-5 font-weight-bold">Lista de registros</h2>

  <v-data-table v-if="contabilidadFecha.length" :headers="headers" :items="contabilidadFecha"
    :sort-by="[{ key: 'idRegCaja', order: 'asc' }]">
    
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          Lista de registros
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="initialize">
          Actualizar
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.estado="{ item }">
    <div class="mr-2">
      <v-chip
        :color="item.estado ? 'green' : 'red'"
        :text="item.estado ? 'Activo' : 'Inactivo'"
        class="text-uppercase"
        size="small"
        label
      ></v-chip>
    </div>
  </template>
   
    <template v-slot:item.actions="{ item }">
      <v-icon 
      color="blue-darken-2"
      size="small" 
      class="mr-2" 
      @click="showDetails(item)"> mdi-eye</v-icon>

      <v-icon 
      color="green-darken-2"
      size="small" 
      class="mr-2" 
      @click="openEditDialog(item)"> mdi-pencil</v-icon>

      <v-icon
      color="red-darken-2"
      size="small" 
      class="mr-2"
       @click="openDeleteDialog(item)"> mdi-delete</v-icon>

    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reiniciar
      </v-btn>
    </template>

  </v-data-table>
  <!-- Diálogo para editar registros -->
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="editedItem.monto" label="Monto (Bs.)"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="editedItem.tipoPago"  :items="tipo"  label="Tipo"></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="editedItem.fecha" label="Fecha" type="date"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="editedItem.detalle" label="Detalle" multiline></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="saveItem">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Diálogo para confirmar la eliminación de registros -->
  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">¿Estás seguro?</v-card-title>
      <v-card-text>
        Esta acción no se puede deshacer.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeDeleteDialog">Cancelar</v-btn>
        <v-btn color="red darken-1" text @click="deleteItemConfirmDialog">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
