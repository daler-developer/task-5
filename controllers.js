const { MessageModel } = require("./models");
const usersService = require("./usersService");

module.exports.enter = (req, res, next) => {
  try {
    const name = req.body.name;

    usersService.addUser(name);

    return res.status(200).json({ entered: true });
  } catch (e) {
    return next(e);
  }
};

module.exports.leave = (req, res, next) => {
  try {
    usersService.removeUser(req.user);

    return res.status(200).json({ leaved: true });
  } catch (e) {
    return next(e);
  }
};

module.exports.getUsers = (req, res, next) => {
  try {
    const users = usersService.getAll();

    return res.status(200).json({ users });
  } catch (e) {
    return next(e);
  }
};

module.exports.sendMessage = async (req, res, next) => {
  try {
    const sender = req.user;
    const { text, receiver, title } = req.body;
    const message = await MessageModel.create({
      text,
      title,
      sender,
      receiver,
    });

    return res.status(202).json({ message });
  } catch (e) {
    return next(e);
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const name = req.user;

    const messages = await MessageModel.find({
      receiver: name,
    });

    return res.status(202).json({ messages });
  } catch (e) {
    return next(e);
  }
};
