
import sql from 'mssql';
// Recuperar ventas

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Returns a list of users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: A list of users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   name:
     *                     type: string
     */
export const getAllVehicles = async() =>{

    try {
        const vehicles = await sql.query`SELECT * FROM VEHICLES`
        return vehicles.recordset;
        } catch (error) {
            console.error('Error inserting data:', error);
            return error;
        }    
}

export const createVehicle= async(vehicle) => {
    console.log("VEhiculo",vehicle);
        try {
        // Perform the database insert
        const result = await sql.query`INSERT INTO VEHICLES(BRAND, MODEL, YEEAR, PLATE, STATEID)
                                       VALUES(${vehicle.body.brand}, ${vehicle.body.model}, ${vehicle.body.year}
                                       , ${vehicle.body.plate}, ${vehicle.body.state})`;

        return result.rowsAffected[0];
        } catch (error) {
            console.error('Error inserting data:', error);
            return error;
        }
        //const newSale = await vehicle.create(saleData);
        
}

export const updateVehicle= async(vehicle) => {
    console.log("update",vehicle)
    try {
       const result = await sql.query`UPDATE VEHICLES SET BRAND = ${vehicle.body.brand}, 
        MODEL = ${vehicle.body.model}, YEEAR = ${vehicle.body.year},
        PLATE = ${vehicle.body.plate},STATEID = ${vehicle.body.state}
        WHERE ID = ${vehicle.body.id}`;

        if(result.rowsAffected[0] > 0){
            return result.rowsAffected[0];
        } else {
            return 0;
        }

        } catch (error) {
            console.error('Error inserting data:', error);
            return error;
        }
}

export const deleteVehicle= async(vehicle) => {
    console.log("Vehicule",vehicle)
    try {
        // Perform the database insert
        const result = await sql.query`DELETE VEHICLES WHERE ID = ${vehicle.body}`;

        if(result.rowsAffected[0] > 0){
            return result.rowsAffected[0];
        } else {
            return 0;
        }
        } catch (error) {
            console.error('Error deleting data:', error);
            return error;
        }
}

export const getVehicleById= async(vehicle) => {

    try {
        // Perform the database insert
        const result = await sql.query`SELECT * FROM VEHICLES WHERE ID = ${vehicle.body}`;

        if(result.rowsAffected[0] > 0){
            return result.recordset;
        } else {
            return 0;
        }
        } catch (error) {
            console.error('Error retrieve data:', error);
            return error;
        }
}