const UserModel = require('./userModel');

const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  UNABLE_TO_ADD: 'Unable to add',
  USER_NOT_FOUND: 'User not found',
};

const addUser = async (req, res, next) => {
  try {
    const { nom, prenom, mail, numero, password, pdp, docVerif } = req.body;
    const User = new UserModel({
      nom,
      prenom,
      mail,
      numero,
      password,
      pdp,
      docVerif,
    });
    await User.save();
    res.status(201).json({ User });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.UNABLE_TO_ADD });
  }
};


  module.exports = { addUser, showUsers, deleteUser, updateUser, findUser };
    