import express from 'express';
import usersRouter from './routes/users.router.js'
import __dirname from './utils.js' 
import viewsRouter from './routes/views.router.js'
import Handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import userModel from './models/user.js';
import mongoose from 'mongoose';
import studentModel from './models/students.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`)) 
app.use(cookieParser("COK1353CR3T4"))

app.engine('handlebars', Handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars')

app.use('/', viewsRouter) ;
app.use('/api/users',usersRouter )

const connection = mongoose.connect("mongodb+srv://joshuaamengual9305:123@cluster0.lhbyhu4.mongodb.net/MiPrimerBaseDeDatos?retryWrites=true&w=majority")

app.get('/',async(req,res)=>{
    const users= await userModel.find()
    res.send({users})

})

app.get('/setSignedCookie',(req,res)=>{
    res.cookie('SingnedCookie','Esta es una cookie muy poderosa',{maxAge:1000,signed:true}).send('Cookie')
})

app.get('/setCookies', (req,res)=>{
    res.cookie('CoderCookie','Esta es una cookie muy poderosa',{maxAge:10000}).send('Cookie')
})

app.get('/getCookies',(req,res)=>{
 res.send(req.cookies);
})

app.get('/deleteCookie',(req,res)=>{
    res.clearCookie('CoderCookie').send('Cookie Removed')
})

//COMENTAMOS ESTA FRACCION DE CODIGO PORQUE EN POSTMAN TOMABA ESTO COMO /students y no traia la lista actualizada
/* app.get('/students',async(req,res)=>{
    const students = [
        {firstName:"joshua",lastName:"amengual",edad:"30",dni:123123123,nota:9},
        {firstName:"rocio",lastName:"espindola",edad:"28",dni:123123123,nota:10},
        {firstName:"juan",lastName:"amen",edad:"29",dni:123123123,nota:9}
    ];
    const result = await studentModel.insertMany(students);
    res.send({status:'success',payload:result})
}); */

app.post('/student', async (req,res)=>{
    const {
        firstName,
        lastName,
        edad,
        dni,
        curso,
        nota
    }= req.body;
       
    if(!firstName||!lastName||!edad||!dni||!nota) return res.status(400).send({status:"error",error:"Incomplete values"})
    const newStudent = {
    firstName,
    lastName,
    edad,
    dni,
    curso,
    nota
}
//INSERTO EN LA BASE DE DATOS
const result = await studentModel.create(newStudent);
//RESPONDO CON EL ID GENERADO
res.send({status:"success",payload:result._id})
});


//TRAE A TODA LA LISTA DE STUDENTS
app.get('/students', async(req,res)=>{
    const students = await studentModel.find();
    res.send({status:"success",payload:students})
})

app.get('/students/:dni',async (req,res)=>{
    const {dni}= req.params; //NECESITO PARAMETROS PARA PODER INGRESAR EL :DNI
    const student = await studentModel.findOne({dni:dni}) // BUSCO POR DNI EN STUDENTMODEL
    if(!student) return res.status(404).send({status:"error",error:"Student Not Found"})//SI NO LO ENCUENTRA ERROR
    res.send({status:"success",payload:student})//SI LO ENCUENTRA DEVUELVE OK!
    
})

const server = app.listen(8080,()=>console.log("escuchando en puerto 8080"))

const io = new Server(server)

io.on('connection',socket=>{
    console.log(`se conecto ${socket}`)
})
 