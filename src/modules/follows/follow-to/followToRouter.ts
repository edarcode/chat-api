import { Router } from "express";
import { followToController } from "./followToController";
import { verifyToken } from "../../../middlewares/verifyToken";
import { paramsWithIdSchema } from "../../../zod-schemas/paramsWithIdSchema";
import { verifyDto } from "../../../middlewares/verifyDto";

export const followToRouter = Router();

followToRouter.post(
  "/:id",
  [verifyToken(), verifyDto({ params: paramsWithIdSchema })],
  followToController
);
