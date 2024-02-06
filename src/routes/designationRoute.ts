import { Router } from "express";
import { designationController } from "../controller/designationController";

const designationRoute = Router()
const DesignationController = new designationController()


designationRoute.get("/list", DesignationController.getdesignation)
designationRoute.put("/updaetdesignation/:id", DesignationController.updatedesignation)
designationRoute.post("/adddesignation", DesignationController.adddesignation)
designationRoute.put("/delete/:id", DesignationController.softdelete)

export default designationRoute