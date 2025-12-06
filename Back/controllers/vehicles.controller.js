import catchAsync from '../utils/catchAsync.js';

import {getAllVehicles,createVehicle, updateVehicle, deleteVehicle, getVehicleById} from '../services/vehicleService.js'

export const GetVehicles = catchAsync(async (req, res, next) => {
   
    const vehicles = await getAllVehicles();

    // Usar el customResponse
    res.success(200,vehicles,"Vehiculos en inventario");
});

export const addVehicle = catchAsync(async (req, res, next) => {
    
    const newVehicle = await createVehicle(req.body);

    if(newVehicle > 0){
        // CustomResponse
        res.success(201,newVehicle,'Vehiculo registrado');
    } else {
        res.error(500,newVehicle,'Problemas al registrar en la BD')
    }

    
});

export const updVehicle = catchAsync(async (req, res, next) => {
    
    const result = await updateVehicle(req.body);

    if(result > 0){
        res.success(201,result,'Vehiculo actualizado');
    } else {
        res.error(500,null,'Problemas al actualizar el vehiculo');
    }  
})

export const delVehicle = catchAsync(async (req, res, next) => {
    
    const result = await deleteVehicle(req.body);

    if(result > 0){
        res.success(201,result,'Vehiculo eliminado');
    } else {
        res.error(500,null,'Problemas al eliminar el vehiculo');
    }    
    
})

export const getVehicleId = catchAsync(async (req, res, next) => {
    
    console.log("FROM DAAAAAA",req.body);
    const result = await getVehicleById(req.body);

    if(result.length > 0){
        res.success(200,result,'Vehiculo recuperado');
    } else {
        res.error(500,result,'Problemas al recuperar el vehiculo');
    }    
    
})