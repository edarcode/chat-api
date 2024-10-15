import { UUID } from "crypto";
import { Controller } from "../../../types";
import { TokenPayload } from "../../auth/login/loginService";
import { getChatService } from "./getChatService";

export const getChatController: Controller = async (req, res, next) => {
  try {
    const { id: senderId } = res.locals?.tokenPayload as TokenPayload;
    const receiverId = req.params.id as UUID;
    const chat = await getChatService(senderId, receiverId);

    res.json(chat);
  } catch (error) {
    next(error);
  }
};
