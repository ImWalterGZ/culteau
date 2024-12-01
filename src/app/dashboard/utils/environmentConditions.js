export const getIdealConditions = (environmentType) => {
  const conditions = {
    Templado: {
      temperature: {
        min: 20,
        max: 25,
        unit: "°C",
        description: "Temperatura óptima para crecimiento moderado",
      },
      humidity: {
        min: 40,
        max: 60,
        unit: "%",
        description: "Humedad ideal para evitar hongos y mantener hidratación",
      },
      moisture: {
        min: 50,
        max: 70,
        unit: "%",
        description: "Suelo húmedo pero no saturado",
      },
      ph: {
        min: 6.0,
        max: 7.0,
        unit: "",
        description: "pH ligeramente ácido a neutro",
      },
    },
    Tropical: {
      temperature: {
        min: 25,
        max: 32,
        unit: "°C",
        description: "Temperatura alta para crecimiento rápido",
      },
      humidity: {
        min: 60,
        max: 80,
        unit: "%",
        description: "Alta humedad para simular ambiente tropical",
      },
      moisture: {
        min: 60,
        max: 80,
        unit: "%",
        description: "Suelo constantemente húmedo",
      },
      ph: {
        min: 5.5,
        max: 6.5,
        unit: "",
        description: "pH ácido para nutrientes tropicales",
      },
    },
    Árido: {
      temperature: {
        min: 18,
        max: 35,
        unit: "°C",
        description: "Amplio rango de temperatura para adaptación",
      },
      humidity: {
        min: 20,
        max: 40,
        unit: "%",
        description: "Baja humedad para plantas xerófitas",
      },
      moisture: {
        min: 20,
        max: 40,
        unit: "%",
        description: "Suelo más seco para prevenir pudrición",
      },
      ph: {
        min: 6.5,
        max: 7.5,
        unit: "",
        description: "pH neutro a ligeramente alcalino",
      },
    },
  };

  return conditions[environmentType] || conditions.Templado;
};
