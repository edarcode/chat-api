import { Router } from "express";
import { followToRouter } from "./follow-to/followToRouter";
import { unfollowToRouter } from "./unfollow-to/unfollowToRouter";

export const followsRouter = Router();

followsRouter.use("/follow-to", followToRouter);
followsRouter.use("/unfollow-to", unfollowToRouter);
