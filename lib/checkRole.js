const checkRole = (value) => {
  if (!value) {
    return false;
  }
  if (value === "admin" || value === "cashier") {
    return true;
  }
  return false;
};


module.exports = {
    checkRole
}