const checkRole = (value) => {
  if (!value) {
    return false;
  }
  if (value === "Admin" || value === "Worker") {
    return true;
  }
  return false;
};


module.exports = {
    checkRole
}