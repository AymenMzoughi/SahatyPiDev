const UserModel = require('./userModel');

const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  UNABLE_TO_ADD: 'Unable to add',
  USER_NOT_FOUND: 'User not found',
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

  
  module.exports = { addUser, showUsers, deleteUser, updateUser, findUser };
    