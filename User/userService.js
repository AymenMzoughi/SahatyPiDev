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

const showUsers = async (req, res) => {
  try {
    const docs = await UserModel.find({});
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deleteUser = async (req, res, next) => {
    try {
      const userToDelete = await UserModel.findById(req.params.id, 'nom');
      if (!userToDelete) {
        return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      await UserModel.findByIdAndDelete(req.params.id);
      const docs = await UserModel.find({});
      res.status(200).json({ message: `User ${userToDelete.nom} is deleted!`, docs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

const updateUser = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
        new: true, // pour renvoyer le document mis à jour plutôt que l'ancien document
      });
      if (!updatedUser) {
        return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
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
    