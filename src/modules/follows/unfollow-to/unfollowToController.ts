import { UUID } from "crypto";
import { Controller } from "../../../types";
import { TokenPayload } from "../../auth/login/loginService";
import { unfollowToService } from "./unfollowToService";

export const unfollowToController: Controller = async (req, res, next) => {
  try {
    const { id: followerId } = res.locals?.tokenPayload as TokenPayload;
    const followedId = res.locals?.params?.id as UUID;
    await unfollowToService(followerId, followedId);
    res.status(200).json({ msg: "Registro eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
