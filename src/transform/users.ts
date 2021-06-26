const transformUser = (user: any) => {
  const userObject = user.toJSON()
  delete userObject.password
  delete userObject.id
  return userObject
}

module.exports = {transformUser}
