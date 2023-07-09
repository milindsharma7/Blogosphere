const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

const url = 'mongodb+srv://milindsharma:milind123@blog.76ccyfp.mongodb.net/?retryWrites=true&w=majority';
const salt = bcrypt.genSaltSync(10);
const key = 'mvof3heu9eg9evgbwfe83un4c3cc4';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(url);

app.post('/login', async (req,res) => {
    try {
        const { username , password } = req.body;
        console.log(username,password);
        const response = await User.findOne({username : "user"});
        const hashPassword = bcrypt.hashSync(password, salt);
        const valid = await bcrypt.compareSync(password,hashPassword);
        console.log(valid);
        if(valid){
            jwt.sign({
                username,
                id:response._id
            },key,{},(err,token)=>{
                if(err){
                    throw err;
                }
                res.cookie('token',token).json('Login Success');
            });
        }else{
            res.status(400).json('Invalid Credentials');
        }
    } catch (e) {
        console.log(e.message);
        res.status(400).json(e.message);
    }
});
app.post('/register', async (req,res) => {
    try {
        const { username , password } = req.body;
        const response = await User.create({
            username,
            password: bcrypt.hashSync(password,salt)
        });
        res.json(response);   
    } catch (e) {
        console.log(e.message);
        res.status(400).json(e.message);
    }
});

app.get('/profile',(req,res) => {
    const { token } = req.cookies;
    jwt.verify(token,key,{},(err,response) => {
        if(err){
            throw err;
        }
        res.json(response);
    });
});
app.post('/logout', async (req,res) => {
    try {
        res.clearCookie('token').json('Logged out succesfully');  
    } catch (e) {
        console.log(e.message);
        res.status(400).json(e.message);
    }
});

app.listen(4000, () => {
    console.log("Server started successfully");
});