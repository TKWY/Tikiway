const login = (req, res) => {
  console.log('ok')
};

const logout = (req, res) => {
  req.logout()
}

module.exports = {
  login,
  logout
};