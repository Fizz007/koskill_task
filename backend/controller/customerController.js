
const Customers = require('../model/customerModel');

//CREATE
const createUser = async (req, res) => {
  const { name, email, password, phoneNumber, address, additionalInfo } = req.body;
  console.log(name)
  try {
    const userAdded = await Customers.create({
      name,
      email,
      password,
      phoneNumber,
      address,
      additionalInfo
    });

    res.status(200).json({ message: "userAdded", user: userAdded });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET ALL
  const getAllUser = async (req, res) => {
    try {
      const allUser = await Customers.find();
     
      res.status(200).json({message:"userretrived", user:allUser});
    } catch (err) {
        res.status(400).json({ error: err.message });
    } 
  
  };

  //GET BY ID
  const getUserById = async (req, res) => {
    const {id} = req.params
    try {
      const user = await Customers.findById({ _id: id });
      res.status(200).json({message:"user retrived", user:user});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  //UPDATE
  const updateSingle = async (req, res) => {
    const { id } = req.params;
    console.log("get body", req.body);
    console.log("get id", id);
  
    try {
      const updatedUser = await Customers.findByIdAndUpdate(id, {$set: req.body});
      // const updatedUser = await User.findByIdAndUpdate(id, req.body, {new:true});
      res.status(200).json({message:"user updated", user:updatedUser});
    } catch (error) {
      res.send(error);
    }
  };

  // DELETE
  const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await Customers.findByIdAndDelete({ _id: id });
      res.status(201).json({message:"deleted",deletedUser});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {createUser,deleteUser,getAllUser,getUserById, updateSingle};