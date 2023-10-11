const regexLetters = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;

export default function validateForm(inputs) {
  let errors = {};
  if (!inputs.name) errors.name = "Se debe ingresar un nombre";
  if (!regexLetters.test(inputs.name))
    errors.name = "El nombre solo puede contener letras";
  if (!inputs.surname) errors.surname = "Se debe ingresar un apellido";
  if (!regexLetters.test(inputs.surname))
    errors.surname = "El apellido solo puede contener letras";
  if (!inputs.nationality)
    errors.nationality = "Se debe ingresar una nacionalidad";
  if (!regexLetters.test(inputs.nationality))
    errors.nationality = "La nacionalidad no puede contener numeros";
  if (inputs.image.length === 0) errors.image = "Se debe ingresar una imagen";
  if (!inputs.birthdate) errors.birthdate = "Se debe ingresar una fecha";
  if (!inputs.description)
    errors.description = "Se debe ingresar una descripcion";
  if (inputs.teams.length === 0)
    errors.teams = "Se debe seleccionar minimo un equipo";
  return errors;
}
