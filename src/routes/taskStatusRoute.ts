import { Router } from "express";
import { taskStatusController } from "../controller/taskStatusController";

const taskStatusRoute = Router()
const TaskStatusController = new taskStatusController()


taskStatusRoute.get("/list", TaskStatusController.gettaskStatus)
taskStatusRoute.post("/addtaskStatus", TaskStatusController.addtaskStatus)
taskStatusRoute.put("/updatetaskStatus/:id", TaskStatusController.updatetaskStatus)
taskStatusRoute.put("/delete/:id", TaskStatusController.softdelete)

export default taskStatusRoute