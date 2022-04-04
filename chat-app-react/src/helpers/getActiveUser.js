export const getActiveUser = (users) => {
  const activeUser = users.find((user) => user.isActive === true);

  return activeUser;
};
