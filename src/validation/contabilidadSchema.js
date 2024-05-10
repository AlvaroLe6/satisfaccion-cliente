export const validationSchema = {
    detalle (value) {
      if (value?.length >= 4 ) return true
      return 'El titulo del Libro es obligatorio o muy corto'
    },
  
} 
  
export const imageSchema = {
  imagen (value) {
      if (value) return true
      return 'La Imagen es Obligatoria'
  },
}