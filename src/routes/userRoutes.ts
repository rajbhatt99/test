import { Router } from "express";
import { userController } from "../controller/userController";

const UserRoutes = Router()
const UserController = new userController()

UserRoutes.get("/list", UserController.getUser)
UserRoutes.get("/get-user/:id", UserController.getuserid)
UserRoutes.post("/add-user", UserController.addUser)
UserRoutes.put("/update-user/:id", UserController.updateUser)  
UserRoutes.put("/update-user-password/:id", UserController.updateUserPassword)
UserRoutes.put("/delete/:id", UserController.softdelete)  


export default UserRoutes