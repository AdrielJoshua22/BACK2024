/* ESTE CODIGO ES ALGO QUE YA VIENE MEDIO POR DEFAULT NO ES ALGO QUE TENEMOS QUE ESCRIBRI
DONDE VOY A ALMACENAR MIS ARCHIVOS ? 
ESTE CODIGO ME VA A AYUDAR A GESTIONAR DONDE ALMACENARLOS, QUE NO HAYA CONFLICTO
POR SI TIENEN EL MISMO NOMBRE Y POR SI SE CARGAN VARIOS ARCHIVOS AL MISMO TIEMPO */

import multer from "multer";
import __dirname from "../utils.js";

const storage = multer.diskStorage({//DISK ES UN TIPO DE ALMACENAMIENTO EN EL DISCO DE MI PROUECTO
    destination:function(req,file,cb){
        cb(null,`${__dirname}/public/img`)//CON ESTO DEFINO DONDE SE GUARDA , EL NULL ES PARA CONTEMPLAR ERRORES
    },
    filename:function(req,file,cb){
        cb(null,`${date.now()}-${file.originalname}`)
    } 
})

const uploader = multer({storage:storage})

export default uploader; 