const checkRole = (value) => {
  if (!value) {
    return false;
  }
  if (value === "Admin" || value === "Cashier") {
    return true;
  }
  return false;
};


module.exports = {
    checkRole
}