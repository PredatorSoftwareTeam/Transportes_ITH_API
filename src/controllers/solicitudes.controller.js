import { pool } from "../db.js";

export const createSolicitud = async (req, res) => {
  
  try {
    const { numeroVenta, productos, nombreDestinatario, direccionDestino, fechaEntrega, idCliente } = req.body;
    const [rows] = await pool.query(
    "INSERT INTO SOLICITUDES (numeroVenta, productos, nombreDestinatario, direccionDestino, fechaEntrega, idCliente) VALUES (?, ?, ?, ?, ?, ?)",
    [ numeroVenta, productos, nombreDestinatario, direccionDestino, fechaEntrega, idCliente]
  );
  res.status(201).json({ id: rows.insertId, numeroVenta, productos, nombreDestinatario, direccionDestino, fechaEntrega, idCliente });
  } catch (error) {
      //console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
  };

export const deleteSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM SOLICITUDES WHERE idSolicitud = ?", [id]);
  
    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Solicitud not found" });
    }
  
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { numeroVenta, productos, nombreDestinatario, direccionDestino, fechaEntrega, idCliente } = req.body;

    const [result] = await pool.query(
      "UPDATE SOLICITUDES SET numeroVenta = IFNULL(?, numeroVenta), productos = IFNULL(?, productos), nombreDestinatario = IFNULL(?, nombreDestinatario), direccionDestino = IFNULL(?, direccionDestino), fechaEntrega = IFNULL(?, fechaEntrega), idCliente = IFNULL(?, idCliente) WHERE idSolicitud = ?",
      [numeroVenta, productos, nombreDestinatario, direccionDestino, fechaEntrega, idCliente, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Solicitud not found" });

    const [rows] = await pool.query("SELECT * FROM SOLICITUDES WHERE idSolicitud = ?", [
      id,
    ]);
    
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getSolicitudes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM SOLICITUDES");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM SOLICITUDES WHERE idSolicitud = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
