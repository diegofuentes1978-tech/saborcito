
const recipeTranslations = {
  'Arrabiata': 'Pasta arrabiata',
  'Chicken Handi': 'Pollo handi',
  'Chicken Alfredo Primavera': 'Pasta primavera con pollo',
  'Chocolate Gateau': 'Pastel de chocolate',
  'Beef and Mustard Pie': 'Pastel de carne y mostaza',
  'Apple & Blackberry Crumble': 'Crumble de manzana y mora',
  'Banana Pancakes': 'Panqueques de banana',
  'Spaghetti Bolognese': 'Espaguetis a la boloñesa',
  'Chicken Curry': 'Pollo al curry',
  'Lasagne': 'Lasaña',
  'Fish pie': 'Pastel de pescado',
  'French Onion Soup': 'Sopa francesa de cebolla',
  'Tiramisu': 'Tiramisú',
  'Chocolate Brownies': 'Brownies de chocolate'
}

const categoryTranslations = {
  Beef: 'Carne vacuna',
  Chicken: 'Pollo',
  Dessert: 'Postres',
  Lamb: 'Cordero',
  Miscellaneous: 'Varios',
  Pasta: 'Pastas',
  Pork: 'Cerdo',
  Seafood: 'Pescados y mariscos',
  Side: 'Guarniciones',
  Starter: 'Entradas',
  Vegan: 'Veganas',
  Vegetarian: 'Vegetarianas',
  Breakfast: 'Desayunos',
  Goat: 'Cabrito'
}

const ingredientTranslations = {
  chicken: 'Pollo',
  beef: 'Carne vacuna',
  pork: 'Cerdo',
  lamb: 'Cordero',
  fish: 'Pescado',
  salmon: 'Salmón',
  tuna: 'Atún',
  shrimp: 'Camarones',
  prawns: 'Langostinos',
  potato: 'Papa',
  potatoes: 'Papas',
  tomato: 'Tomate',
  tomatoes: 'Tomates',
  onion: 'Cebolla',
  onions: 'Cebollas',
  garlic: 'Ajo',
  carrot: 'Zanahoria',
  carrots: 'Zanahorias',
  cheese: 'Queso',
  milk: 'Leche',
  cream: 'Crema de leche',
  butter: 'Manteca',
  egg: 'Huevo',
  eggs: 'Huevos',
  flour: 'Harina',
  sugar: 'Azúcar',
  salt: 'Sal',
  pepper: 'Pimienta',
  rice: 'Arroz',
  pasta: 'Pasta',
  spaghetti: 'Espaguetis',
  lemon: 'Limón',
  parsley: 'Perejil',
  basil: 'Albahaca',
  oregano: 'Orégano',
  mushrooms: 'Champiñones',
  spinach: 'Espinaca',
  broccoli: 'Brócoli',
  avocado: 'Palta',
  bread: 'Pan',
  honey: 'Miel',
  chocolate: 'Chocolate',
  water: 'Agua'
}

const areaTranslations = {
  American: 'Estadounidense',
  British: 'Británica',
  Canadian: 'Canadiense',
  Chinese: 'China',
  French: 'Francesa',
  Greek: 'Griega',
  Indian: 'India',
  Italian: 'Italiana',
  Japanese: 'Japonesa',
  Mexican: 'Mexicana',
  Spanish: 'Española',
  Thai: 'Tailandesa',
  Turkish: 'Turca',
  Vietnamese: 'Vietnamita'
}

export function translateRecipeName(name) {
  return recipeTranslations[name] || name
}

export function translateCategory(name) {
  return categoryTranslations[name] || name
}

export function translateIngredient(name) {
  const key = name.trim().toLowerCase()
  return ingredientTranslations[key] || name
}

export function translateArea(name) {
  return areaTranslations[name] || name || 'No especificado'
}

export function translateMeasure(measure) {
  if (!measure) return ''

  const translations = [
    [/\bcups?\b/gi, 'tazas'],
    [/\btablespoons?\b|\btbsp\b/gi, 'cucharadas'],
    [/\bteaspoons?\b|\btsp\b/gi, 'cucharaditas'],
    [/\bounces?\b|\boz\b/gi, 'onzas'],
    [/\bpounds?\b|\blbs?\b|\blb\b/gi, 'libras'],
    [/\bgrams?\b/gi, 'gramos'],
    [/\bkilograms?\b/gi, 'kilogramos'],
    [/\bmilliliters?\b/gi, 'mililitros'],
    [/\bliters?\b/gi, 'litros'],
    [/\bcloves?\b/gi, 'dientes'],
    [/\bpinches?\b/gi, 'pizcas'],
    [/\bslices?\b/gi, 'rodajas'],
    [/\bpieces?\b/gi, 'unidades'],
    [/\bmedium\b/gi, 'mediano'],
    [/\blarge\b/gi, 'grande'],
    [/\bsmall\b/gi, 'pequeño'],
    [/\bto taste\b/gi, 'a gusto'],
    [/\bas needed\b/gi, 'cantidad necesaria'],
    [/\bchopped\b/gi, 'picado'],
    [/\bminced\b/gi, 'triturado']
  ]

  let result = measure

  translations.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement)
  })

  return result.trim()
}
