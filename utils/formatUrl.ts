export const transformString = (input: string): string => {
  // Elimina tildes y diacríticos
  let stringWithoutAccents = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Reemplaza los espacios con guiones y elimina caracteres no alfanuméricos
  let finalString = stringWithoutAccents
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();

  return finalString;
};
