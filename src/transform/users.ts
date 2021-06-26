const transformUser = (user) => {
  const userObject = user.toJSON()
  delete userObject.password
  delete userObject.accessTokens
  delete userObject.id
  return userObject
}

module.exports = {transformUser}
