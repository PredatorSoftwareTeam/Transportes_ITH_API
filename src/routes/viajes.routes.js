import { Router } from "express";
import {
  createViaje,
  deleteViaje,
  getViaje,
  getViajes,
  updateViaje,
} from "../controllers/viajes.controller.js";

const router = Router();

// GET all Solicitud
router.get("/viajes", getViajes); 

// GET An Solicitud by id
router.get("/viajes/:id", getViaje); 

// DELETE An Viaje
router.delete("/viajes/:id", deleteViaje); 

// INSERT An Solicitud
router.post("/viajes", createViaje);

// UPDATE an Solicitud
router.patch("/viajes/:id", updateViaje);

export default router;