export default function validateForm(inputs) {
  let errors = {};
  if (!inputs.forename) errors.forename = "Se debe ingresar un nombre";
  if (!inputs.surname) errors.surname = "Se debe ingresar un apellido";
  if (!inputs.nationality)
    errors.nationality = "Se debe ingresar una nacionalidad";
  //if (inputs.length === 0) errors.image = "Se debe ingresar una imagen";
  if (!inputs.dob) errors.dob = "Se debe ingresar una fecha";
  if (!inputs.description)
    errors.description = "Se debe ingresar una descripcion";
  // if (inputs.teams.length === 0)
  //   errors.teams = "Se debe seleccionar minimo un equipo";
  return errors;
}
