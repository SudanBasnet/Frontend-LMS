export const storeAuthTokens = ({ accessJWT, refreshJWT } = {}) => {
  if (!accessJWT || !refreshJWT) return false;

  sessionStorage.setItem("accessJWT", accessJWT);
  localStorage.setItem("refreshJWT", refreshJWT);
  return true;
};
