import catchAsync from '../utils/catchAsync.js';

import {getAllVehicles,createVehicle, updateVehicle, deleteVehicle, getVehicleById} from '../services/vehicleService.js'

export const GetVehicles = catchAsync(async (req, res, next) => {
   
    const vehicles = await getAllVehicles();

    res.success(200,vehicles,"vehículos en inventario");
});

export const addVehicle = catchAsync(async (req, res, next) => {
    
    const newVehicle = await createVehicle(req.body);

    if(newVehicle > 0){
       
        res.success(201,newVehicle,'vehículo registrado');
    } else {
        res.error(500,newVehicle,'Problemas al registrar en la BD')
    }

    
});

export const updVehicle = catchAsync(async (req, res, next) => {
    
    const result = await updateVehicle(req.body);

    if(result > 0){
        res.success(201,result,'vehículo actualizado');
    } else {
        res.error(500,null,'Problemas al actualizar el vehículo');
    }  
})

export const delVehicle = catchAsync(async (req, res, next) => {
    
    const result = await deleteVehicle(req.body);

    if(result > 0){
        res.success(201,result,'vehículo eliminado');
    } else {
        res.error(500,null,'Problemas al eliminar el vehículo');
    }    
    
})

export const getVehicleId = catchAsync(async (req, res, next) => {
    
    
    const result = await getVehicleById(req.body);

    if(result.length > 0){
        res.success(200,result,'vehículo recuperado');
    } else {
        res.error(500,result,'Problemas al recuperar el vehículo');
    }    
    
})