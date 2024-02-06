import { Router } from "express";
import { jobController } from "../controller/jobController";

const jobRoute = Router()
const JobController = new jobController()


jobRoute.get("/list", JobController.getjob)
jobRoute.post("/addjob", JobController.addjob)
jobRoute.put("/updatejob/:id", JobController.updatejob)
jobRoute.put("/delete/:id", JobController.softdelete)

export default jobRoute