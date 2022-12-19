import { pool } from "../db.js";


export const createViaje = async (req, res) => {
  //try {
    const { estadoEntrega, idPersonal, numeroGuia } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO VIAJES_PROGRAMADOS (estadoEntrega, idPersonal, numeroGuia) VALUES (?, ?, ?)",
      [estadoEntrega, idPersonal, numeroGuia]
    );
    res.status(201).json({ id: rows.insertId, estadoEntrega, idPersonal, numeroGuia });
      
 //   } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
 //   }
    
  };


export const deleteViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM VIAJES_PROGRAMADOS WHERE idViaje = ?", [id]);
  
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
    const { estadoEntrega } = req.body;

    const [result] = await pool.query(
      "UPDATE VIAJES_PROGRAMADOS SET estadoEntrega = IFNULL(?, estadoEntrega) WHERE idViaje = ?",
      [estadoEntrega, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "not found solicitud" });

    const [rows] = await pool.query("SELECT * FROM VIAJES_PROGRAMADOS WHERE idSolicitud = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const getViajes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT VIAJES_PROGRAMADOS.idViaje, VIAJES_PROGRAMADOS.estadoEntrega, VIAJES_PROGRAMADOS.idPersonal, VIAJES_PROGRAMADOS.numeroGuia, PERSONAL.nombre, SOLICITUDES.direccionDestino , CLIENTES.direccionAlmacen FROM VIAJES_PROGRAMADOS INNER JOIN PERSONAL ON VIAJES_PROGRAMADOS.idPersonal = PERSONAL.idPersonal INNER JOIN SOLICITUDES ON VIAJES_PROGRAMADOS.numeroGuia = SOLICITUDES.idSolicitud INNER JOIN CLIENTES ON SOLICITUDES.idCliente = CLIENTES.idCliente WHERE VIAJES_PROGRAMADOS.estadoEntrega = 'En Camino' || VIAJES_PROGRAMADOS.estadoEntrega = 'En Recoleccion' || VIAJES_PROGRAMADOS.estadoEntrega = 'En Almacen' || VIAJES_PROGRAMADOS.estadoEntrega = 'En Camino'");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT VIAJES_PROGRAMADOS.idViaje, VIAJES_PROGRAMADOS.estadoEntrega, VIAJES_PROGRAMADOS.idPersonal, VIAJES_PROGRAMADOS.numeroGuia, PERSONAL.nombre, SOLICITUDES.direccionDestino , CLIENTES.direccionAlmacen FROM VIAJES_PROGRAMADOS INNER JOIN PERSONAL ON VIAJES_PROGRAMADOS.idPersonal = PERSONAL.idPersonal INNER JOIN SOLICITUDES ON VIAJES_PROGRAMADOS.numeroGuia = SOLICITUDES.idSolicitud INNER JOIN CLIENTES ON SOLICITUDES.idCliente = CLIENTES.idCliente WHERE idViaje = ?", [
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