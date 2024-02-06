import { Router } from "express";
import { taskController } from "../controller/taskControlleer";

const taskRoute = Router()
const TaskController = new taskController()


taskRoute.get("/list", TaskController.gettask)
taskRoute.post("/addtask", TaskController.addtask)
taskRoute.put("/updatetask/:id", TaskController.updatetask)
taskRoute.put("/delete/:id", TaskController.softdelete)

export default taskRoute