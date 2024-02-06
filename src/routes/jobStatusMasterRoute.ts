import { Router } from "express";
import { jobStatusMasterController } from "../controller/jobStatusMasterController";

const jobStatusRoute = Router()
const JobStatusMasterController = new jobStatusMasterController()


jobStatusRoute.get("/list", JobStatusMasterController.getjobStatusMaster)
jobStatusRoute.post("/addtask", JobStatusMasterController.addjobStatusMaster)
jobStatusRoute.put("/updatetask/:id", JobStatusMasterController.updatejobStatusMaster)
jobStatusRoute.put("/delete/:id", JobStatusMasterController.softdelete)

export default jobStatusRoute