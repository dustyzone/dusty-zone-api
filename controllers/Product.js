const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try{
        const {title, category, subCategory, img, price, originalPrice, qty, newArrival, size} = req.body;
        
        if(!title || !category || !subCategory || !img || !price || !originalPrice || !qty || !newArrival || !size){
            return res.status(401).json({
                success: false,
                message: "Please Fill All the Details"
            })
        }
        
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        
        const existingProduct = await Product.findOne({slug});
        if(existingProduct){
            return res.status(401).json({
                success: false,
                message: "Product Already Exists"
            }) 
        }

        const productResponse = await Product.create({title, slug, category, subCategory, img, price, originalPrice, qty, newArrival, size});
        return res.status(200).json({
            success: true,
            message: "Product Created Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server",
            error: error.message
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            message: "Products Fetched Successfully",
            data: products
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}