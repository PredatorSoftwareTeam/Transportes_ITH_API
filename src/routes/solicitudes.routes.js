import { Router } from "express";
import {
  createSolicitud,
  deleteSolicitud,
  getSolicitud,
  getSolicitudes,
  updateSolicitud,
  updateEstadoSolicitud
} from "../controllers/solicitudes.controller.js";

const router = Router();

// GET all Solicitud
router.get("/solicitudes", getSolicitudes); //Este si jala

// GET An Solicitud by id
router.get("/solicitudes/:id", getSolicitud); //Este sijala

// DELETE An Solicitud
router.delete("/solicitudes/:id", deleteSolicitud); //Este si jala

// INSERT An Solicitud
router.post("/solicitudes", createSolicitud);

// UPDATE an Solicitud
router.patch("/solicitudes/:id", updateSolicitud);

// UPDATE estado de solicitud
router.patch("/solicitud/:id", updateEstadoSolicitud);

export default router;