import { Router } from "express";
import UserRoutes from "./userRoutes";
import { verifyJwt } from "../middleware/verifyJwt";
import  authRoute  from "../routes/authRoute";

const mainRoutes = Router()

mainRoutes.use('/user', verifyJwt, UserRoutes)
mainRoutes.use('/auth', authRoute)

export default mainRoutes 