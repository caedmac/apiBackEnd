const usersSchema = require('../models/users');

const index = (req, res) =>{
    usersSchema.find({})
        .then(users => {
            if(users.length) return res.status(200).send({users});
            return res.status(204).send({message: 'NO CONTENT'});
        }).catch(error => res.status(500).send({error}));
};

const createUser = (req, res) => {
    new usersSchema(req.body).save().then(user => res.status(201).send({message: 'User created', user})).catch(error => res.status(500).send({error}));
};

const findUser = (req, res, next) =>{
    let query = {};
    query[req.params.key] = req.params.value;
    usersSchema.find(query).then(users => {
        if(!users.length) return next();
        req.body.users = users;
        return next();
    }).catch(error =>{
        req.body.error = error;
        next();
    })
};

const showUser = (req, res) => {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.users) return res.status(404).send({message: 'NOT FOUND'});
    let users = req.body.users;
    return res.status(200).send({users});
};

const updateUser = (req, res) => {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.users) return res.status(404).send({message: 'NOT FOUND'});
    let user = req.body.users[0];
    user = Object.assign(user,req.body);
    user.save().then(user => res.status(200).send({message: "User updated", user})).catch(error => res.status(500).send({error}));
};

const removeUser = (req, res) => {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.users) return res.status(404).send({message: 'NOT FOUND'});
    req.body.users[0].remove().then(user => res.status(200).send({message: 'User removed', user})).catch(error => res.status(500).send({error}));
};

const ultimateFindUsers = (req, res, next) =>{
    let query =[
        {$match: {
            'age':{$gt:18},
            'gender':'Male',
            "register_date" : { "$gte" : new Date(Date.now() - 1000 * 86400 * 3) },
        }},
        {$group: {
            _id: '$hobbie',
            obj: { $push: { name: "$name", phone: "$phone", hobby:"$hobbie" } }
        }},
        {
            $replaceRoot: {
                newRoot: {
                    $let: {
                        vars: { obj: [ { k: {$substr:["$_id", 0, -1 ]}, v: "$obj" } ] },
                        in: { $arrayToObject: "$$obj" }
                    }
                }
            }
        }
    ];
    usersSchema.aggregate(query).then(users => {
        if(!users.length) return next();
        req.body.users = users;
        return next();
    }).catch(error =>{
        req.body.error = error;
        next();
    })
}

module.exports ={
    index,
    createUser,
    findUser,
    showUser,
    updateUser,
    removeUser,
    ultimateFindUsers,
};