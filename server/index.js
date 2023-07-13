require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Posts');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const url = process.env.MONGODB_URL;
const key = process.env.JWT_KEY;

const app = express();
app.use(cors({credentials:true,origin:process.env.FRONT_END_URL}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(url);

const PORT = process.env.PORT || 4000

app.post('/login', async (req,res) => {
    try {
        const { username , password } = req.body;
        const response = await User.findOne({username : username});
        const hashPassword = response.password;
        const valid = await bcrypt.compare(password,hashPassword);
        if(valid){
            jwt.sign({
                username:username,
                id:response._id
            },key,{},(err,token)=>{
                if(err){
                    throw err;
                }
                res.cookie('token',token,{
                    id:response._id,
                    username:response.username,
                    httpOnly: true,
                    expires: new Date(Date.now() + 60 * 1000 * 60),
                    sameSite: 'none',
                    secure: true,
                }).json('Login Success');
            });
        }else{
            throw res.status(400).json('Invalid Credentials');
        }
    } catch (e) {
        res.status(400).json(e.message);
    }
});
app.post('/register', async (req,res) => {
    try {
        const { username , password } = req.body;
        const find = await User.find({username: username});
        if(find.length){
            res.status(400);
        }
        const response = await User.create({
            username,
            password: await bcrypt.hash(password,10)
        });
        res.json(response);
    } catch (e) {
        res.json(e.message);
        res.status(400);
    }
});

app.post('/create', async (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, key, {}, async (err,info) => {
      if (err) res.status(400);
      const {title,summary,content,cover,name} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover,
        name,
        author:info.id,
      });
      res.json(postDoc);
    });
  
  });

app.get('/profile',(req,res) => {
    const { token } = req.cookies;
    // console.log(token);
    jwt.verify(token,key,{},(err,response) => {
        if(!err){
            res.status(200).json(response);
        }
        else{
            // console.log(err,response);
            res.json(err);
        }
    });
});

app.post('/logout', async (req,res) => {
    try {
        res.cookie('token',null,{
            id:null,
            username:null,
            httpOnly: true,
            expires: new Date(Date.now()),
            sameSite: 'none',
            secure: true,
        }).json('Logout Success');
    } catch (e) {
        res.json(e.message);
    }
});

app.get('/get', async (req,res) => {
    try {
        const posts = await Post.find().sort({updatedAt: -1});
        res.json(posts);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.post('/my', async (req,res) => {
    try {
        const posts = await Post.find({"name" : req.body.username}).sort({updatedAt: -1});
        res.json(posts);
    } catch (e) {
        res.status(400).json(e.message);
    }
});


app.get('/post/:id', async (req,res) => {
    try {
        const { id } = req.params; 
        const posts = await Post.findById(id);
        res.json(posts);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.put('/edit/:id', async (req,res) => {
    try {
        const { id } = req.params; 
        const post = await Post.findById(id);
        const {token} = req.cookies;
        jwt.verify(token, key, {}, async (err,info) => {
          if (err){
            res.status(400);
          }
          if(JSON.stringify(info.id) !== JSON.stringify(post.author)){
            throw res.status(400).json('Action not permitted');
          }
          const {title,summary,content,cover,name} = req.body;
          await Post.updateOne(
            {
                _id:id
            },
            {
            title,
            summary,
            content,
            cover,
            name,
            author:info.id,
          });
          res.status(200).json("Updated Sucessfully");
        });
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.delete('/post/:id', async (req,res) => {
    try {
        const { id } = req.params; 
        const post = await Post.findById(id);
        const {token} = req.cookies;
        jwt.verify(token, key, {}, async (err,info) => {
          if (err){
            res.status(400);
          }
          if(JSON.stringify(info.id) !== JSON.stringify(post.author)){
            throw res.status(400).json('Action not permitted');
          }
          await Post.deleteOne({_id: id});
          res.status(200).json("Deleted Sucessfully");
        });
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.listen(PORT, () => {
    console.log("Server started successfully");
});