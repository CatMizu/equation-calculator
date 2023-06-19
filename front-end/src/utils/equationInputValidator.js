const validateEquationInput = (equation, solveFor, parameters) => {
  if (!equation.includes(solveFor)) {
    alert("The solveFor value must exist within the equation");
    return false;
  }

  if (!/^[a-zA-Z]{1}$/.test(solveFor)) {
    alert("The solveFor value be a single letter");
    return false;
  }

  if (solveFor in parameters) {
    alert("The solveFor value cannot be a parameter");
    return false;
  }

  return Object.keys(parameters).every((key) => {
    if (!/^[a-zA-Z]{1}$/.test(key) || !equation.includes(key)) {
      alert(
        `The parameter ${key} must be a single letter and exist within the equation`
      );
      return false;
    }
    return true;
  });
};

export default validateEquationInput;
