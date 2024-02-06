import { Router } from "express";
import { jobTypeController } from "../controller/jobTypeController";

const jobTypeRoute = Router()
const JobTypeController = new jobTypeController()


jobTypeRoute.get("/list", JobTypeController.getjobType)
jobTypeRoute.post("/addjobType", JobTypeController.addjobType)
jobTypeRoute.put("/updatejobType/:id", JobTypeController.updatejobType)
jobTypeRoute.put("/delete/:id", JobTypeController.softdelete)

export default jobTypeRoute