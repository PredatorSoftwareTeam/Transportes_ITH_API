import express from "express";
import morgan from "morgan";
import cors from "cors";

//import employeesRoutes from "./routes/employees.routes.js";
import solicitudesRoutes from "./routes/solicitudes.routes.js"
import viajesRoutes from "./routes/viajes.routes.js"
import indexRoutes from "./routes/index.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/", indexRoutes);
//app.use("/api", employeesRoutes);
app.use("/api", solicitudesRoutes);
app.use("/api", viajesRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
