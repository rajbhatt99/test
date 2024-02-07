import { Router } from "express";
import { taskMasterController } from "../controller/taskMasterController";

const TaskMasterRoute = Router()
const TaskMaterController = new taskMasterController()


TaskMasterRoute.get("/list", TaskMaterController.gettaskMaster)
TaskMasterRoute.post("/addtask", TaskMaterController.addtaskMaster)
TaskMasterRoute.put("/updatetask/:id", TaskMaterController.updatetaskMaster)
TaskMasterRoute.put("/delete/:id", TaskMaterController.softdelete)

export default TaskMasterRoute