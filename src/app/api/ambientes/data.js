// Simulación de base de datos en memoria con persistencia en localStorage
const ambientesIniciales = [];

// Función para obtener ambientes del localStorage o usar array vacío inicial
const getAmbientes = () => {
  if (typeof window === 'undefined') return ambientesIniciales;
  
  const stored = localStorage.getItem('ambientes');
  if (!stored) {
    localStorage.setItem('ambientes', JSON.stringify(ambientesIniciales));
    return ambientesIniciales;
  }
  return JSON.parse(stored);
};

// Función para guardar ambientes en localStorage
const saveAmbientes = (ambientes) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('ambientes', JSON.stringify(ambientes));
      console.log("Ambientes guardados:", ambientes); // Para debugging
    } catch (error) {
      console.error("Error al guardar ambientes:", error);
    }
  }
};

export let ambientes = getAmbientes();

// Función para actualizar ambientes
export const updateAmbientes = (newAmbientes) => {
  ambientes = newAmbientes;
  saveAmbientes(ambientes);
}; 