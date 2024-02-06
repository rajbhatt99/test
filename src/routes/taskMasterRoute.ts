import { Router } from "express";
import { taskMasterController } from "../controller/taskMasterController";

const taskMasterRoute = Router()
const TaskMaterController = new taskMasterController()


taskMasterRoute.get("/list", TaskMaterController.gettaskMaster)
taskMasterRoute.post("/addtask", TaskMaterController.addtaskMaster)
taskMasterRoute.put("/updatetask/:id", TaskMaterController.updatetaskMaster)
taskMasterRoute.put("/delete/:id", TaskMaterController.softdelete)

export default taskMasterRoute