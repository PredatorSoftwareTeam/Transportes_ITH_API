import { pool } from "../db.js";


export const createViaje = async (req, res) => {
  try {
    const { estadoEntrega, idPersonal, numeroGuia } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO Viajes_programados (estadoEntrega, idPersonal, numeroGuia) VALUES (?, ?, ?)",
      [estadoEntrega, idPersonal, numeroGuia]
    );
    res.status(201).json({ id: rows.insertId, estadoEntrega, idPersonal, numeroGuia });
      
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
    
  };


export const deleteViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM Viajes_programados WHERE idViaje = ?", [id]);
  
    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Viaje not found" });
    }
  
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const updateViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const { estadoEntrega, idPersonal, numeroGuia } = req.body;

    const [result] = await pool.query(
      "UPDATE viajes_programados SET estadoEntrega = IFNULL(?, estadoEntrega), idPersonal = IFNULL(?, idPersonal), numeroGuia = IFNULL(?, idSolicitud) WHERE idViaje = ?",
      [estadoEntrega, idPersonal, numeroGuia, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "not found solicitud" });

    const [rows] = await pool.query("SELECT * FROM viajes_programados WHERE idSolicitud = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const getViajes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Viajes_programados");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM Viajes_programados WHERE idViaje = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Viaje not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};