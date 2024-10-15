import { UUID } from "crypto";
import { Controller } from "../../../types";

import { followToService } from "./followToService";
import { TokenPayload } from "../../auth/login/loginService";

export const followToController: Controller = async (_req, res, next) => {
  try {
    const { id: follerId } = res.locals?.tokenPayload as TokenPayload;
    const followedId = res.locals?.params?.id as UUID;
    await followToService(follerId, followedId);

    res.status(201).json({ msg: "Registro agregado correctamente" });
  } catch (error) {
    next(error);
  }
};
