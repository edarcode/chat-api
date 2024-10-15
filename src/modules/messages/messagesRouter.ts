import { Router } from "express";
import { saveMsgRouter } from "./save-msg/saveMsgRouter";
import { removeMsgRouter } from "./remove-msg/removeMsgRouter";
import { getChatRouter } from "./get-chat/getChatRouter";

export const messagesRouter = Router();

messagesRouter.use("/save-msg", saveMsgRouter);
messagesRouter.use("/remove-msg", removeMsgRouter);
messagesRouter.use("/get-chat", getChatRouter);
