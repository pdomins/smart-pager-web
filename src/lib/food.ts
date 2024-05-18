export const foodTypes = [
  'Hamburgueserías',
  'Cafeterías',
  'Heladerías',
  'Restaurantes',
  'Pizzerías',
  'Cervecerías',
  'Bodegones',
  'Parrillas',
  'Bares',
  'Milaneserías', // para lugares especializados en milanesas
  'Minutas',
  'Sushi',
  'Pastas',
  'Comida mexicana',
  'Tapas',
  'Comida japonesa',
  'Comida judía',
  'Comida china',
  'Comida árabe',
  'Comida armenia',
  'Comida peruana',
  'Casa de empanadas', // para lugares especializados en empanadas
  'Comida rápida',
  'Comida venezolana',
  'Comida vegana',
  'Comida vegetariana',
  'Comida saludable',
  'Comida Sin TACC', // Trigo, Avena, Cebada y Centeno
] as const

export type FoodType = (typeof foodTypes)[number]
