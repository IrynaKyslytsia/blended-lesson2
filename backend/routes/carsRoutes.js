// Cannot GET /api/v1/cars

const CarsController = require("../controllers/CarsController")

const carsRouter = require('express').Router();

// 1. додати машину

carsRouter.post('/cars', (req, res, next) => {
    console.log("joi")
    next()
}, CarsController.add);

// 2. отримати всі машини

carsRouter.get('/cars', CarsController.getAll);

// 3. отримати одну машину

carsRouter.get('/cars/:id', CarsController.getOne);

// 4. оновити машину

carsRouter.put('/cars/:id', CarsController.updateCar);

// 5. видалити машину

carsRouter.delete('/cars/:id', CarsController.removeCar);

module.exports = carsRouter;