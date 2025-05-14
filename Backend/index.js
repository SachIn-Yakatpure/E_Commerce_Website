// const port = 7000;

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from 'multer';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';


// === Routes
import stripeRoutes from './routes/stripeRoutes.js';
import vendorRoutes from './routes/vendor.js';
import Product from "./models/Product.js";
import webhookRoute from "./routes/stripeWebhook.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from './routes/cartRoutes.js';



const app = express();

app.use("/webhook", webhookRoute);

app.use(express.json());

dotenv.config();
app.use(cors());


// API Routes
app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
// app.use('/vendor', require('./routes/vendor'));
app.use("/api", stripeRoutes);

app.use('/vendor', vendorRoutes);



// ===

app.use(express.json()); //whatever rqst we get from rspons will be converted into json 
app.use(cors()); // by this react will connect with express on 4000 port


// Databse Connection with MongoDB

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


//API Creation  

app.get("/", (req, res) => {

    res.send("Express App is running")
}
)

const port = process.env.port || 7000;
app.listen(port, (error) => {

    if (!error) {
        console.log("Server Running on Port" + port)

    }

    else {
        console.log("Error" + error);
    }
})


// Image storage Engine

const storage = multer.diskStorage({         //disk storage we get from multer
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)  //image name
    }
})

const upload = multer({ storage: storage })

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for adding data in backend

app.post('/addproduct', async (req, res) => {

    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }

    else {
        id = 1;
    }

    const product = new Product({

        id: id,
        title: req.body.title,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        rating: req.body.rating,
        reviews: req.body.reviews

    });
    console.log(product);
    await product.save();
    console.log("Saveddd");
    res.json({
        success: true,
        name: req.body.name,
    })

})

// Creating API For deleting Products

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        title: req.body.title
    })

})

// Creating API for getting all products

app.get('/allproducts', async (req, res) => {

    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);

})



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

const Users = mongoose.models.Users || mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
});


// Creating Endpoint for registering the user

app.post('/signup', async (req, res) => {

    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Email address is already associated with an account. Please Try to log in" })

    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;

    }
    const user = new Users({

        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        cartData: cart,

    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom'); //using secret_ecom salt token will not be readable
    res.json({ success: true, token })

})

// Creating Endpoint for User Login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({
                success: true,
                token,
                username: user.name,  
                cartData: user.cartData
            });
        } else {
            res.json({ success: false, errors: "Incorrect password" });
        }
    } else {
        res.json({ success: false, errors: "Incorrect email" });
    }
});


// Creating Endpoint For adding products in cart data

app.post('/addtocart', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ success: false, errors: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_ecom');
        const userId = decoded.user.id;
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, errors: 'User not found' });
        }

        const cartObj = {};
        cartItems.forEach(item => {
            cartObj[item.productId] = item.qty;
        });
        user.cartData = cartObj;  
        await user.save();


        res.json({ success: true, message: 'Cart updated successfully', cart: user.cart });
    } catch (error) {
        console.error("❌ Add to Cart Error:", error);
        return res.status(500).json({
            success: false,
            errors: error.message || 'Server error'
        });
    }
});


// Create the Clear Cart API (on logout)

app.post('/api/cart/clear', async (req, res) => {
    // Assuming the user sends the token in the authorization header
    const token = req.headers.authorization.split(" ")[1]; // getting token from the authorization header

    if (!token) {
        return res.status(400).json({ success: false, errors: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_ecom');
        const userId = decoded.user.id;

        // it Clear the user's cart in the database
        const user = await Users.findById(userId);
        if (user) {
            user.cartData = {};  // Empty the cart data
            await user.save();
            res.json({ success: true, message: 'Cart cleared' });
        } else {
            res.status(404).json({ success: false, errors: 'User not found' });
        }
    } catch (error) {
        res.status(401).json({ success: false, errors: 'Invalid or expired token' });
    }
});

// GET endpoint to fetch saved cart data for logged-in user

app.get('/getcart', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ success: false, errors: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_ecom');
        const userId = decoded.user.id;
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, errors: 'User not found' });
        }

        const cartItems = [];
        const cartData = user.cartData || {};

        for (const id in cartData) {
            const quantity = cartData[id];
            if (quantity > 0) {
                const product = await Product.findById(id);
                if (product) {
                    cartItems.push({
                        _id: product._id,
                        qty: quantity,
                        title: product.title || product.name || "Unnamed Product",
                        image: product.image,
                        price: product.price,
                        total_item_price: quantity * product.price
                    });
                }
            }
        }

        res.json({ success: true, cartItems });
    } catch (error) {
        console.error("Get Cart Error:", error);
        res.status(401).json({ success: false, errors: 'Invalid or expired token' });
    }
});


//   purchaseee 

app.post('/purchase', async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(400).json({ success: false, message: "No token provided" });

    try {
        const decoded = jwt.verify(token, 'secret_ecom');
        const userId = decoded.user.id;

        const user = await Users.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const { cartItems } = req.body;
        const errors = [];

        for (const item of cartItems) {
            const productId = item.productId; 
            console.log("Received Product ID:", productId);

            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).json({ success: false, message: `Invalid product ID: ${productId}` });
            }

            const product = await Product.findById(productId);

            const qty = parseInt(item.qty || item.quantity); 


            if (!product) {
                errors.push(`Product ID ${productId} not found`);
                continue;
            }

            if (!qty || isNaN(qty) || qty <= 0) {
                errors.push(`Invalid quantity for product: ${product.title}`);
                continue;
            }

            if (product.quantity < qty) {
                errors.push(`Not enough stock for ${product.title}`);
                continue;
            }

            product.quantity -= qty;
            await product.save();
        }

        // ✅ Clearing cart after purchase
        user.cartData = {};
        await user.save();

        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        res.json({ success: true, message: "Purchase successful and stock updated" });

    } catch (err) {
        console.error("Purchase error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


// DB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => console.error("DB connection error:", err));



