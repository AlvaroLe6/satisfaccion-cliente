
import {ref,onMounted } from 'vue'
import { doc, collection, onSnapshot,  updateDoc, Timestamp } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";
import { db } from '@/config/firebase';

export default  function useContabilidad(){

    const database = useFirestore()
    const contabilidadCollection = useCollection(collection(db, 'contabilidad_rc'));
    const dialog = ref(false);
    const dialogDelete = ref(false);
    const editedItem = ref(null);
    const editedIndex = ref(-1);

// Propiedad computada para formatear las fechas
const contabilidadFecha = ref([]);

onMounted(() => {
  const limpComponente = onSnapshot(
    collection(db, 'contabilidad_rc'),
    (querySnapshot) => {
      const docs = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const dataWithId = { ...data, id: doc.id }; // Agrega el id al objeto de datos.

        if (data.fecha?.toDate) {
          return { ...dataWithId, fecha: data.fecha.toDate().toLocaleDateString('es-ES') };
        }
        return dataWithId;
      });
      contabilidadFecha.value = docs;
    },
    (error) => {
      console.error("Error al obtener documentos: ", error);
    }
  );

  // Función de limpieza para desuscribirse del listener cuando el componente se desmonte
  return () => {
    limpComponente();
  };
});

const editItem = (item) => {
  // Encuentra el índice del ítem en el array contabilidadFecha usando su id único.
  const index = contabilidadFecha.value.findIndex((doc) => doc.id === item.id);
  if (index === -1) {
    console.error('Ítem para editar no encontrado en el array.');
    return;
  }
  // Actualiza el editedIndex con el índice encontrado.
  editedIndex.value = index;

  const fechaConvertida = item.fecha ? convertirFecha(item.fecha) : '';
  editedItem.value = { ...item, fecha: fechaConvertida };

  dialog.value = true;

};
// Función convertirá la fecha al formato 'YYYY-MM-DD'
function convertirFecha(fechaCadena) {
  // Verifica si la fecha es una cadena y tiene el formato esperado 'D/M/YYYY'
  if (typeof fechaCadena === 'string' && fechaCadena.includes('/')) {
    // Divide la cadena por el separador '/'
    const partes = fechaCadena.split('/');
    // Asegura si tiene tres partes necesarias para la fecha
    if (partes.length === 3) {
      const [day, month, year] = partes.map(Number); // Convierte las partes en números
      // Devuelve la fecha en el formato 'YYYY-MM-DD'
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
  }
  console.error('El formato de la fecha no es válido:', fechaCadena);
  return '';
}
  

const deleteItem = (item) => {
  editedIndex.value = contabilidadFecha.value.indexOf(item);
  editedItem.value = { ...item };
  dialogDelete.value = true;
};

const deleteItemConfirm = async () => {
  if (editedIndex.value > -1) {
    try {
      // Actualiza el campo 'estado'
      const itemRef = doc(db, 'contabilidad_rc', contabilidadFecha.value[editedIndex.value].id);
      await updateDoc(itemRef, { estado: false });

      // Opcionalmente, actualiza el estado localmente para reflejar el cambio inmediatamente en la UI.
      contabilidadFecha.value[editedIndex.value].estado = false;

      // Cierra el diálogo de confirmación.
      dialogDelete.value = false;

    } catch (error) {
      console.error("Error al cambiar el estado del documento:", error);
    }
  } else {
    // Si por alguna razón el índice es inválido, muestra un error.
    console.error("Índice editado no válido. No se puede cambiar el estado.");
  }
};

const save = async () => {
  if (editedIndex.value > -1) {
    // Convertir la fecha de string 'YYYY-MM-DD' a objeto Date
    const dateParts = editedItem.value.fecha.split('-').map(Number);
    const dateObject = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    // Convertir objeto Date a Timestamp de Firestore
    const fechaTimestamp = Timestamp.fromDate(dateObject);

    // Prepara el objeto a actualizar con el Timestamp
    const updatedData = {
      ...editedItem.value,
      fecha: fechaTimestamp
    };

    // Actualiza el documento en Firestore con el objeto Timestamp
    try {
      const itemRef = doc(db, 'contabilidad_rc', contabilidadFecha.value[editedIndex.value].id);
      await updateDoc(itemRef, updatedData);
      console.log("Documento actualizado con éxito");
      dialog.value = false;
    } catch (error) {
      console.error("Error actualizando el documento:", error);
    }
  }
};

    return{  
      contabilidadCollection,
      contabilidadFecha,
      dialog,
      dialogDelete,
      editedItem,
      editedIndex,
      editItem,
      deleteItem,
      deleteItemConfirm,
      save

    }
    
}