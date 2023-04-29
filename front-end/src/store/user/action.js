const changeUserName = (username) => {
  return {
    type: "USER_NAME",
    payload: username,
  };
};
export default changeUserName;