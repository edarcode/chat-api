import { Controller } from "../../../types";
import { TokenPayload } from "../../auth/login/loginService";
import { SearchAccount } from "./searchAccountSchema";
import { searchAccountService } from "./searchAccountService";

export const searchAccountController: Controller = async (_req, res, next) => {
  try {
    const { email } = res.locals?.params as SearchAccount;
    const { id: accountId } = res.locals?.tokenPayload as TokenPayload;
    const account = await searchAccountService(accountId, email);
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};
