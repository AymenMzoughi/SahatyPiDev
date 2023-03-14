const UserModel = require('./userModel');

const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  UNABLE_TO_ADD: 'Unable to add',
  USER_NOT_FOUND: 'User not found',
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


  module.exports = { addUser, showUsers, deleteUser, updateUser, findUser };
    