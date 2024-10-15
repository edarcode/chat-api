import { Router } from "express";
import { verifyToken } from "../../../middlewares/verifyToken";
import { paramsWithIdSchema } from "../../../zod-schemas/paramsWithIdSchema";
import { saveMsgSchema } from "./saveMsgSchema";
import { saveMsgController } from "./saveMsgController";
import { verifyDto } from "../../../middlewares/verifyDto";

export const saveMsgRouter = Router();

saveMsgRouter.post(
  "/:id",
  [
    verifyToken(),
    verifyDto({ params: paramsWithIdSchema, body: saveMsgSchema }),
  ],
  saveMsgController
);
