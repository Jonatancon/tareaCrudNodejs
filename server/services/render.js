const axios = require('axios');

exports.homeRoutes = (req, res) =>{
    axios.get('http://localhost:3000/api/products')
        .then(function(response){
            res.render('index',{products:response.data});
        })
        .catch(error =>{
            res.send(error)
        })
    
}

exports.add_product = (req, res) =>{
    res.render('add_product');
}

exports.update_product = (req, res) =>{
    axios.get('http://localhost:3000/api/products',{params:{id:req.query.id}})
        .then(function(productData){
            res.render('update_product',{product:productData.data});
        })
        .catch(error =>{
            res.send(error)
        })
    
}