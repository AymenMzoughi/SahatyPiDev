const UserModel = require('./userModel');

const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  UNABLE_TO_ADD: 'Unable to add',
  USER_NOT_FOUND: 'User not found',
};








  const findUser = async (req, res) => {
    try {
      const { searchValue } = req.query;
      const users = await UserModel.find({ $or: [
        { nom: new RegExp(searchValue, 'i') },
        { prenom: new RegExp(searchValue, 'i') },
        { mail: new RegExp(searchValue, 'i') },
        { numero: new RegExp(searchValue, 'i') },
      ]});
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };
  
  module.exports = { addUser, showUsers, deleteUser, updateUser, findUser };
    