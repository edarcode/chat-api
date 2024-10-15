import { Controller } from "../../../types";
import { removeMsgService } from "./removeMsgService";
import { TokenPayload } from "../../auth/login/loginService";
import { UUID } from "crypto";

export const removeMsgController: Controller = async (_req, res, next) => {
  try {
    const { id: accountId } = res.locals?.tokenPayload as TokenPayload;
    const msgId = res.locals?.params.id as UUID;
    await removeMsgService(accountId, msgId);

    res.status(200).json({ msg: "Registro eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
