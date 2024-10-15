import { Router } from "express";
import { removeMsgController } from "./removeMsgController";
import { verifyToken } from "../../../middlewares/verifyToken";
import { verifyDto } from "../../../middlewares/verifyDto";
import { paramsWithIdSchema } from "../../../zod-schemas/paramsWithIdSchema";

export const removeMsgRouter = Router();

removeMsgRouter.delete(
  "/:id",
  [verifyToken(), verifyDto({ params: paramsWithIdSchema })],
  removeMsgController
);
