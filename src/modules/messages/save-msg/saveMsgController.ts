import { Controller } from "../../../types";
import { TokenPayload } from "../../auth/login/loginService";
import { SaveMsg } from "./saveMsgSchema";
import { saveMsgService } from "./saveMsgService";
import { UUID } from "crypto";

export const saveMsgController: Controller = async (req, res, next) => {
  try {
    const { id: senderId } = res.locals?.tokenPayload as TokenPayload;
    const receiverId = res.locals?.params?.id as UUID;
    const msg = res.locals?.body as SaveMsg;

    await saveMsgService(senderId, receiverId, msg);
    res.status(201).json({ msg: "Mesaje guardado correctamente." });
  } catch (error) {
    next(error);
  }
};
