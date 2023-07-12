const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Posts');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

const url = 'mongodb+srv://milindsharma:milind123@blog.76ccyfp.mongodb.net/?retryWrites=true&w=majority';
const key = 'mvof3heu9eg9evgbwfe83un4c3cc4';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json());
app.use(cookieParser());
mongoose.connect(url);

app.post('/login', async (req,res) => {
    try {
        const { username , password } = req.body;
        // console.log(username,password);
        const response = await User.findOne({username : username});
        const hashPassword = response.password;
        const valid = await bcrypt.compare(password,hashPassword);
        // console.log(password,hashPassword);
        // console.log(valid);
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
                }).json('Login Success');
            });
        }else{
            throw res.status(400).json('Invalid Credentials');
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
            password: await bcrypt.hash(password,10)
        });
        res.json(response);
    } catch (e) {
        console.log(e.message);
    }
});

app.post('/create', async (req,res) => {
    // console.log(req);
    const {token} = req.cookies;
    jwt.verify(token, key, {}, async (err,info) => {
      if (err) throw err;
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
    jwt.verify(token,key,{},(err,response) => {
        if(!err){
            res.json(response);
        }
        else{
            res.json(err);
        }
    });
});

app.get('/logout', async (req,res) => {
    try {
        res.cookie("token", null, {
            httpOnly: true,
            expires: new Date(Date.now()),
        });
        console.log('success logout');
        res.json('ok');
    } catch (e) {
        // console.log(e.message);
        res.status(400).json(e.message);
    }
});

app.get('/get', async (req,res) => {
    try {
        const posts = await Post.find().sort({_id:-1});
        res.json(posts);
    } catch (e) {
        // console.log(e.message);
        res.status(400).json(e.message);
    }
});

app.post('/my', async (req,res) => {
    try {
        const posts = await Post.find({"name" : req.body.username});
        // console.log(req.body.useranme);
        res.json(posts);
    } catch (e) {
        // console.log(e.message);
        res.status(400).json(e.message);
    }
});


app.get('/post/:id', async (req,res) => {
    try {
        const { id } = req.params; 
        const posts = await Post.findById(id);
        res.json(posts);
    } catch (e) {
        // console.log(e.message);
        res.status(400).json(e.message);
    }
});

app.put('/edit/:id', async (req,res) => {
    try {
        const { id } = req.params; 
        const post = await Post.findById(id);
        const {token} = req.cookies;
        jwt.verify(token, key, {}, async (err,info) => {
          if (err) throw err;
          if(JSON.stringify(info.id) !== JSON.stringify(post.author)){
            console.log('acha');
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

app.delete('/delete/:id', async (req,res) => {
    try {
        const { id } = req.params; 
        await Post.deleteOne(
            {
                _id:id
            }
        );
        res.json("Deleted Successfully");
    } catch (e) {
        // console.log(e.message);
        res.status(400).json(e.message);
    }
});

app.listen(4000, () => {
    console.log("Server started successfully");
});