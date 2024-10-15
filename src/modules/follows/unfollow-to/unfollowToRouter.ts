import { Router } from "express";
import { unfollowToController } from "./unfollowToController";
import { verifyToken } from "../../../middlewares/verifyToken";

import { paramsWithIdSchema } from "../../../zod-schemas/paramsWithIdSchema";
import { verifyDto } from "../../../middlewares/verifyDto";

export const unfollowToRouter = Router();

unfollowToRouter.delete(
  "/:id",
  [verifyToken(), verifyDto({ params: paramsWithIdSchema })],
  unfollowToController
);
