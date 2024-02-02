import { Router } from "express";
import { userLogin} from "../controller/authController";

const authRoute = Router()
const UserLogin = new userLogin()


authRoute.post("/login", UserLogin.userLogin)

export default authRoute