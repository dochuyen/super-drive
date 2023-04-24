const changeEmail = (email) => {
  return {
    type: "EMAIL_USER",
    payload: email,
  };
};
export default changeEmail
