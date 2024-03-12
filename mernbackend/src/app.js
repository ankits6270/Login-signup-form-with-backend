const express = require('express')
const app = express();
const hbs = require('hbs');
const PORT = process.env.PORT || 3000;
const path = require('path');
require('./db/conn');
const Register = require('./models/register');

const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}))


// console.log(path.join(__dirname,"../public"))
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path)




app.get('/',(req,res)=>{
    res.render("index");
})

app.get('/register',(req,res)=>{
    res.render("register");
})

app.get('/login',(req,res)=>{
    res.render("login");
})

app.post('/register', async(req,res)=>{
    try {
        const password = req.body.password;
        const cpassword =  req.body.confirmpassword;
        if(password === cpassword)
        {
            const registerEmployee = new Register({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password : password,
                confirmpassword : cpassword,
            })
            const registered = await registerEmployee.save();
            console.log(registered)
            res.status(201).render(index)
            
            

        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post('/login',async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const username = await Register.collection.findOne({email:email});

        if(username.password === password)
        {
            res.status(201).render("index");
        }
        else{
            res.send("password are not matching");
        }
        
    } catch (error) {
       console.error(error);
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})