import Messages from "../Models/MessagesModel";
import { MyResponseType, RoutesMiddlewareType } from "../types/CommonTypes";
import { MessagesData } from "../types/MessagesControllerTypes";

export const CreateMessage: RoutesMiddlewareType = (req, res, next) => {
  const sender = req.user.id;
  const { receiver, content } = req.body;

  Messages.create({ sender, receiver, content })
    .then(() => {
      let data: MyResponseType<null> = {
        message: "Message sent successfully",
        success: true,
      };

      res.status(201).json({ ...data });
      next();
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

export const MessagesList: RoutesMiddlewareType = (req, res, next) => {
  const sender = req.user.id;
  const selectedUserId = req.params.selectedUserId;

  Messages.find({
    $or: [
      { sender: sender, receiver: selectedUserId },
      { sender: selectedUserId, receiver: sender },
    ],
  }).then((results: MessagesData[]) => {
    let data: MyResponseType<MessagesData[]> = {
      message: "Message list",
      success: true,
      response: results,
    };

    res.send(data).status(200);
  });
};
