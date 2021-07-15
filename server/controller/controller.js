var Productdb = require('../model/model');

//create and save new product
exports.create = (req,res) =>{
    //validate request
    if(!req.body){
        res.status(400).send({message:'Content can not be emtpy!'});
        return;
    }

    //new product
    const product = new Productdb({
        name:req.body.name,
        reference:req.body.reference,
        stock:req.body.stock,
        price:req.body.price
    })

    //save product in the database
    product
        .save(product)
        .then(data=>{
            //res.send(data)
            res.redirect('/add-product')
        })
        .catch(error=>{
            res.status(500).send({
                message: error.message || 'Some error occurred while creating a create operation'
            })
        })
}

//retrieve  and return all product/ retrieve and return a singler product
exports.find = (req,res) =>{
    if(req.query.id){
        const id = req.query.id;

        Productdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({message:'Not found Product'})
                }else{
                    res.send(data)
                }
            })
            .catch(error =>{
                res.atatus(500).send({message:'Error product id'})
            })

    }else{
        Productdb.find()
        .then(product =>{
            res.send(product)
        })
        .catch(error =>{
            res.status(500).send({
                message:error.message || 'Error occurred while retriving user information'
            })
        })
    }

    
}

// Update a new idetified product by product ID
exports.update = (req,res) =>{
    if(!req.body){
        return res.status(400).send({message:'Data to update can not be empty!'})
    }

    const id = req.params.id;
    Productdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
        .then(data =>{
            if(!data){
                res.status(400).send({message:'Cannot update product with id='+id})
            }else{
                res.send(data)
            }
        })
        .catch(error =>{
            res.status(500).send({message:'Error update product information'})
        })
}

//Delete a product with specified product id in the request 
exports.delete = (req,res) =>{
    const id = req.params.id;

    Productdb.findByIdAndDelete(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message:`Cannot delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message: 'Product was delete successfully!'
                })
            }
        })
        .catch(error =>{
            res.status(500).send({
                message:'Could not delete product'
            })
        })
}