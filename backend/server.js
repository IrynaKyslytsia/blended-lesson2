const express = require("express");
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");
const configPath = path.join(__dirname, "..", "config", ".env");
require("colors");
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

require("dotenv").config({ path: configPath });

const connectDB = require("../config/connectDB");

const userModel = require('./models/userModel');

// console.log("Hello".yellow.underline);
// console.log("Hello".red.bold);

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use('/api/v1', require('./routes/carsRoutes'));

// реєстрація - збереження користувача в БД

app.post('/register', asyncHandler(async (req, res)=> {

// отримуємо та валідуємо дані від користувача

const {email, password} = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error('provide all required fields')
    };

// шукаємо користувача в БД

const candidate = await userModel.findOne({email})

// якщо юзер існує, то пишемо повідомлення або викидаємо помилку

if (candidate) {
    res. status(400);
    throw new Error('User already exists')
};

// якщо не знайшли, то хешуємо пароль

const hashPassword = bcrypt.hashSync('password', 5);

// зберігаємо користувача в базу

const user = await userModel.create({...req.body, password: hashPassword});
    res.status(201).json({
      code: 201,
      data: user,
      message: "Sucsess"
    })
  }))

  // аутентифікація - перевірка наданих користувачем даних зі збережиними в БД

// авторизація - перевірка прав доступу

// логаут - вихід користувача із системи

app.use(errorHandler);

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server on port: ${process.env.PORT}`.bold.green.italic);
});
