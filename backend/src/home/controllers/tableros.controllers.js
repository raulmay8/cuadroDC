import { Tablero } from "../models/Tablero.js";

export const getTableros = async (req, res) => {
    try {
        const tableros = await Tablero.findAll()
        res.json(tableros)   
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getTablero = async (req, res) =>{
    try {
        const {id} = req.params;
        const tablero = await Tablero.findOne({
            where: {
                id,
            },
        });
        if (!tablero)
            return res.status(404).json({message: "El tablero no existe"})
        res.json(tablero)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const createTablero = async (req, res) =>{
    const {sistema, fase} = req.body
    try {
        const newTablero = await Tablero.create({
            sistema, fase
        })
        res.json(newTablero) 
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateTablero = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, fase} = req.body;

        const tablero = await Tablero.findByPk(id);
        tablero.nombre=nombre;
        tablero.fase=fase;
        await tablero.save();
        res.json(tablero)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

}

export const deleteTablero = async (req, res) =>{
    try {
        const {id} = req.params;
        await Tablero.destroy({
            where:{
                id
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
