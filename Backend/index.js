const port = 7000;
// import Products from "./Products";

const express = require ("express");
const mongoose = require ("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors")
const path = require("path");
const { log, error } = require("console");
const { title } = require("process");
const { type } = require("os");

const app = express();

app.use(express.json()); //whatever rqst we get from rspons will be converted into json 
app.use(cors()); // by this react will connect with express on 4000 port


// Databse Connection with MongoDB

mongoose.connect("mongodb+srv://sachinyakatpure:Sachin2909@cluster0.s0uaxhx.mongodb.net/e-commerce")


//API Creation  

app.get("/", (req, res)=>{

    res.send("Express App is running")
}
)

app.listen(port,(error)=>{

    if (!error) {
        console.log("Server Running on Port"+port)
        
    }

    else{
        console.log("Error"+error);
    }
})


// Image storage Engine

    const storage = multer.diskStorage({            //disk storage we get from multer
        destination: './upload/images',
        filename: (req,file,cb)=>{                 
                return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)  //image name
        }
    })    
    
    const upload = multer({storage:storage})

 // Creating Upload Endpoint for images
        app.use('/images',express.static('upload/images'))

        app.post("/upload",upload.single('product'),(req,res)=>{
                res.json({
                    success:1,
                    image_url:`http://localhost:${port}/images/${req.file.filename}`
                })
        })

// Schema for adding data in backend

const Product = mongoose.model("Product",{

    id:{
         type: Number,
         required:true,
    },
    title:{
        type: String,
        required:true,
    },
    image:{
        type: String,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    rating:{
        type: Number,
        required:true,
    },
    reviews:{
        type: Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }

})

app.post('/addproduct',async(req,res)=>{

    let products = await Product.find({});
    let id;
    if (products.length>0)
    {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]; 
        id = last_product.id+1;
    }

    else{
        id=1;
    }

    const product = new Product({

        id:id,
        title:req.body.title,
        image:req.body.image,
        price:req.body.price,
        category:req.body.category,
        rating:req.body.rating,
        reviews:req.body.reviews

    });
    console.log(product);
    await product.save();
    console.log("Saveddd");
    res.json({
        success:true,
        name: req.body.name,
    })
    
})

// Creating API For deleting Products

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        title:req.body.title
    })

})

// Creating API for getting all products

app.get('/allproducts',async (req,res)=>{
    
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products); 

})

// to get a single product

// app.get('/product',async (req,res)=>{
    

//     let products = await Product.findOne({id:req.body.id});
//     console.log("All Products Fetched");
//     res.send(products); 

// })


app.get('/allproducts/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      res.json(product);
    } catch (err) {
      res.status(404).json({ error: 'Product not found' });
    }
  });

  

// Schema Creating for User model

const Users = mongoose.model('Users',{

    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String
    },
    confirmPassword:{
        type: String 
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now
    }
})

// Creating Endpoint for registering the user

app.post('/signup',async(req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false, errors: "Email address is already associated with an account. Please Try to log in"})
        
    } 
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
        
    }
    const user = new Users({

        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        cartData:cart,

    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom'); //using secret_ecom salt token will not be readable
    res.json({success:true,token})

})

// Creating Endpoint for User Login

app.post('/login', async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});

        }
        else{
            res.json({success:false,errors:"You have Entered Wrong Password"});
        }

    }
    else{
        res.json({success:false, errors:"Incorrect Email Id"})
    }

})

// getting products from js file and adding it in backend

// app.get("/api/Products",(req,res)=>{
//     res.send(Products)
// })



// Creating Endpoint For adding products in cart data

app.post('/addtocart',async(req,res)=>{
    
})

