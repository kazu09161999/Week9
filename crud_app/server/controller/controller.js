var Userdb = require('../model/model');

// create and save new user
exports.create=(req,res)=>{
  // validate request
  if(!req.body){
    res.status(400).send({message: "content can not be empty!"});
    return;
  }

  // new user 
  const user =  new Userdb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
  })

  // save user in the database
  user
    .save(user)
    .then(data => {
      res.send(data)
    })
    .catch(err=>{
      res.status(500).send({
        message:err.message || "some error occured while creating a create operation"
      });
    });
}

// retrive and return all users/ retrive and return a single user
exports.find=(req, res)=>{
  Userdb.find()
  .then(user=>{
    res.send(user)
  })
  .catch(err=>{
    res.status(500).send({message:err.message||"Error Occured while retriving user information"})
  })
}

// update a new identified user by user id
exports.update=(req,res)=>{
  if(!req.body){
    return res
      .status(400)
      .send({message:"Data to update can not be empty"})
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body)
    .then(data=>{
      if(!data){
        res.status(404).send({message:`Cannot update user with ${id}. Maybe user not found`})
      }else{
        res.send(data)
      }
    })
    .catch(err=>{
      res.status(500).send({message:"Error update user information"})
    })
}

// Delete a user with specified use id in the request
exports.delete = (req,res)=>{
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then(data =>{
      if(!data){
        res.status(404).send({message:`Cannot Delete with id ${id}. Maybe id is wrong`})
      }else{
        res.send({
          message: "User was deleted successfully!"
        })
      }
    })
    .catch(err=>{
      res.status(500).send({
        message:"Could not delete User with id =" + id
      });
    });
  
}