import  {Router} from 'express';

const router = Router();

const food =[
    {name: "pizza", price:1000 },
    {name: "papas fritas", price:1200 },
    {name: "hamburguesa", price:1400 },
    {name: "empanada", price:600 },
    {name: "pancho", price:400 }
];

router.get('/',(req, res)=>{
    const user = {
        name:'joshua',
        role:'admin'
    }
    res.render('home.handlebars',{
        user,
        isAdmin: user.role==='admin',
        food
    })
})

router.get('/',(req,res)=>{
    res.render('Home.handlebars');
})

export default router;