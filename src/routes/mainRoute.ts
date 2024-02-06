import { Router } from "express";
import UserRoutes from "./userRoutes";
import { verifyJwt } from "../middleware/verifyJwt";
import  authRoute  from "../routes/authRoute";
import  designationRoute  from "../routes/designationRoute";
import  taskStatusRoute  from "../routes/taskStatusRoute";
import jobTypeRoute  from "../routes/jobTypeRoute";
import taskRoute  from "../routes/taskRoute";
import taskMaterRoute  from "../routes/taskMasterRoute";
import jobRoute  from "../routes/jobRoute";
import jobStatusMasterRoute from "../routes/jobStatusMasterRoute";

const mainRoutes = Router()

mainRoutes.use('/user', verifyJwt, UserRoutes)
mainRoutes.use('/auth', authRoute)
mainRoutes.use('/designation', designationRoute)
mainRoutes.use('/taskStatus', taskStatusRoute)
mainRoutes.use('/jobType', jobTypeRoute)
mainRoutes.use('/task', taskRoute)
mainRoutes.use('/taskMaster', taskMaterRoute)
mainRoutes.use('/job', jobRoute)
mainRoutes.use('/jobStatusMasterRoute', jobStatusMasterRoute)

export default mainRoutes 