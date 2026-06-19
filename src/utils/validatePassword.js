export const validator = (password = "", confirmPassword = "") => {
  const error = [];
  password.length < 6 && error.push("At least 6 characters required");

  !/[A-Z]/.test(password) &&
    error.push("Password must contain at least UpperCase letter");

  !/[a-z]/.test(password) &&
    error.push("Password must contain at least LowerCase letter");

  !/[0-9]/.test(password) &&
    error.push("Password must contain at least Number");

  !/[!@#$%^&*()_+<>?:{}|]/.test(password) &&
    error.push(
      "Password must contain at least special Characters from !@#$%^&*()_+<>?:{}|",
    );

  password !== confirmPassword && error.push("Password Do not Match");
  return error;
};
