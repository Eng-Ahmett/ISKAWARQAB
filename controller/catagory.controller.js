const {CatagoryModel,validateCatagory} = require("../models/catagory.service");

// get categories
const Get = async (req,res) =>{
    const catagory = await CatagoryModel.find().populate('userId', 'fullname');
    res.json({
        status: true,
        message: "Catagory retrieved successfully",
        data: catagory,
    });
}
// create catagories
const Post = async (req,res) =>{
    try {
        const {cat_name,amount,type,userId} = req.body;
        const newCatagory = await CatagoryModel.create({cat_name,amount,type,userId});
        res.status(201).json({
            status: true,
            message: "Catagory si guul leh ayaa loo sameyay",
            data: newCatagory,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Cillad ayaa dhacday markii catagory la cusbooneysiinayay",
            error: error.message,
        });
    }
}
// update catagories
const Put = async (req,res) => {
    try {
        const id = req.params.id;
        const {cat_name,amount,type,userId} = req.body;
        const updateUser = await CatagoryModel.findByIdAndUpdate(id,{cat_name,amount,type,userId}, {new: true});
        if (!updateUser) {
            return res.status(404).json({
                status: false,
                message: "Catagory lama helin",
            });
        }
        return res.status(200).json({
            status: true,
            message: "Catagory si guul leh ayaa loo cusbooneysiiyay",
            data: updateUser,
            });
        } catch (error) {
        res.status(500).json({
            status: false,
            message: "Cillad ayaa dhacday markii catagory la cusbooneysiinayay",
            error: error.message,
        });
    }
}

module.exports = {
    Get,
    Post,
    Put
};
