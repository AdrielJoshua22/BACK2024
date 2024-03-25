import { Router } from "express";
import uploader from "../services/uploader.js";



const router = Router();

const users=[];

router.get('/', (req, res) => {
    res.send(users);
}) 

router.post('/', uploader.single("imagen"),(req, res) => {
const user = req.body
users.push(user)
res.send({status:"success",message:"user added"})
})

router.put('/api/users', (req, res) => {

})

router.delete('/users', (req, res) => {

})


export default router;