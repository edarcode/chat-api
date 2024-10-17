import { Router } from "express";
import { getAccountRouter } from "./get-account/getAccountRouter";
import { removeAccountRouter } from "./remove-account/removeAccountRouter";
import { editAccountRouter } from "./edit-account/editAccountRouter";
import { searchAccountRouter } from "./search-account/searchAccountRouter";

export const accountsRouter = Router();

accountsRouter.use("/get-account", getAccountRouter);
accountsRouter.use("/remove-account", removeAccountRouter);
accountsRouter.use("/edit-account", editAccountRouter);
accountsRouter.use("/search-account", searchAccountRouter);
