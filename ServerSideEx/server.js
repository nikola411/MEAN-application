
//require to be able to use express
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { check, validationResult } = require('express-validator');

const MongoClient = require('mongodb').MongoClient;


//we instantiate express to be able to use it
const app = express();
const TWO_HOURS = 1000 * 60 * 60 * 2;
const SESS_ID = 'sid';
const SESS_SECRET = 'ssh!quiet,it\'sasecret';
const url = 'mongodb://127.0.0.1:27017';
const myDB = 'myDB';

let loggedIn = false;


let currId = 1;
let db;
let currUser = null;
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.use((req, res, next) => {
    /*res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
    
      res.setHeader("Access-Control-Allow-Origin","Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader("Access-Control-Allow-Origin","*");
      res.setHeader('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
      res.setHeader("Access-Control-Allow-Headers","*");*/
    next();
});

app.use(session({
    name: SESS_ID,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: TWO_HOURS,//how long session lasts
        sameSite: true,//allow cookies only from same sites/domains 
        //secure: IN_PROD

    }
}));

app.listen(3000, (req, res) => {
    console.log("Server init");
})

const checkLogin = (req, res, next) => {
    if (req.session.userId && loggedIn) {
        res.send({ route: "/user" });
        console.log("logged in");
        next();

    } else {
        res.send("/login");

    }
}

const checkRegister = (req, res, next) => {

    console.log(check(['password']).isLowercase().isLength({ min: 5 }).matches(/\d/));
    check('username').not().contains("@");
    check('password').not().isEmpty();



    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {

        return res.status(422).json({ errors: errors.array() });
    } else {
        console.log("registrujemo");
        //next();
    }
}


MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) console.log(err);

    db = client.db(myDB);
    collection = db.collection("users");
    console.log(`Connected to db : ${url}`);
    console.log(`Database : ${db}`);


})
app.get('/api/boot', (req, res) => {

    //change for admin
    if (req.session.userId && loggedIn) {
        console.log('Logged in');
        res.send({ route: "user" });
    } else {
        console.log('Not logged in');
        res.send({ route: "login" });
    }


})

app.put('/api/register', [
    /*check('username', 'mail blank').not().isEmpty(),
    check('email', 'mail invalid').matches('.+@\..+'),
    check('username', 'username exists').custom(value=>{
        
        return  db.collection('users').find({username : value}).toArray().then(result =>{
            console.log(result);
            if(result.length){
                console.log("postoji user");
                return ;
            } 
        })
    }),
    check('password', 'password not strong enough').matches('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$')*/
], (req, res) => {

    const errors = validationResult(req);


    let ret;
    if (!errors.isEmpty()) {
        console.log(errors);
        res.send({ status: errors });
    } else {
        req.body.pending = null;
        db.collection('users').insertOne(req.body);

        res.send({ status: "registered" });

    }

})

app.put("/api/logout", (req, res) => {
    req.session.destroy();
    loggedIn = false;
    res.send({ route: '/login' });
})

app.post('/api/login', (req, res) => {

    let password = req.body.pass;
    let user = req.body.user;


    db.collection('users').find({ username: req.body.user, password: req.body.pass }).toArray().then(results => {
        for (i in results) {
            if (results[i].password == password) {
                req.session.userId = currId++;
                req.session.user = req.body.user;
                loggedIn = true;

                console.log(results[i]);
                res.send({ route: "/user" });
                return;
            }
        }

        console.log("didnt find anything");
        res.send({ route: "/register" });

    }

    );

});

app.get('/api/user', (req, res) => {
    let user = req.session.user;
    db.collection("users").findOne({ username: user }).then(result => {

        console.log(result);
        res.send(result);
        //es.send(result.garden);

    })

})

app.put('/api/user/addgarden', checkLogin, (req, res) => {
    let user = req.session.user;

    let newGarden = req.body;
    let oldData;

    let height = parseInt(req.body.height);
    let width = parseInt(req.body.width);
    //req.body.garden = [parseInt(width)][parseInt(height)];

    req.body.garden = new Array(height);

    for (var i = 0; i < height; i++) {
        req.body.garden[i] = new Array(width);
        for (var j = 0; j < width; j++) {
            req.body.garden[i][j] = { state: -1, x: i, y: j, name: "", producer : "" };

        }
    }
    req.body.water = 70;
    req.body.temp = 18;
    req.body.free = width * height;

    db.collection('users').updateOne({ "username": req.session.user }, {
        $push: { "garden": req.body }
    });


}
)

app.post("/api/user/delete/garden", (req, res) => {
    console.log("deleteig garden");
    db.collection('users').findOneAndUpdate(
        { username: req.session.user },
        {
            $pull: { "garden": { name: req.body.name, "place": req.body.place } }
        },
        {
            returnOriginal: false
        }
    ).then(result => {

        res.send({ garden: result.value.garden });
    })


})

app.get("/api/user/gardens", (req, res) => {
    db.collection('users').findOne({ username: req.session.user }, { projection: { garden: 1, _id: 0 } }).then(result => {

        //ovako filtriramo rezultat - pogodno za trazenje baste

        // console.log(result);


        res.send(result);
    })
})

app.post("/api/user/showGarden", (req, res) => {
    let user = req.session.user;
    let garden = req.body;


    db.collection('users').findOne({ username: user }, { projection: { garden: 1 } }).then(result => {
        var picked = result['garden'].filter(result => {

            return result.name === req.body.name;
        }
        );


        res.send(picked);
    })
})

app.post("/api/user/garden/plant", (req, res) => {
    let user = req.session.user;

    let name = req.body.name;
    let i = parseInt(req.body.x);
    let j = parseInt(req.body.y);
    let producer = req.body.producer;
    let plantName = req.body.plantName;


    db.collection('users').findOneAndUpdate(
        { username: user },
        {
            $inc: {
                "garden.$[element].garden.$[i].$[j].state": 1,
                "garden.$[element].free": -1,
                "warehouse.$[elem].quantity" : -1
            },
            $set :{
                "garden.$[element].garden.$[i].$[j].name" : plantName,
                "garden.$[element].garden.$[i].$[j].producer" :producer,
            }
        },
        {
           
            arrayFilters: [
                { "element.name": { $eq: name } },
                { "i.x": { $eq: i } }, { "j.y": { $eq: j } },
                { "elem.name": { $eq: plantName }, "elem.producer" : {$eq : producer} }
            ],
            returnOriginal: false
        },

    )
        .then(result => {
            filt = result.value.garden.filter(x => x.name == name);
            res.send(Object.values(filt[0]));
        });

})

app.post("/api/user/garden/take-out", (req, res) => {
    let user = req.session.user;
   
    let name = req.body.name;
    let i = parseInt(req.body.x);
    let j = parseInt(req.body.y);


    db.collection('users').findOneAndUpdate(
        { username: user },
        {
            $set: {
                "garden.$[element].garden.$[i].$[j].state": -1,
            },
            $inc: {
                "garden.$[element].free": 1,
                
            }
        },
        {
            arrayFilters: [
                { "element.name": { $eq: name } },
                { "i.x": { $eq: i } }, { "j.y": { $eq: j } }
            ],
            returnOriginal: false
        },

    )
        .then(result => {
           
            filt = result.value.garden.filter(x => x.name == name);
           
            res.send(Object.values(filt[0]));
        });

})

app.post("/api/user/garden/add/water", (req, res) => {

    let user = req.session.user;
    let name = req.body.name;
    console.log("adding water");

    db.collection("users").findOneAndUpdate(
        { username: user },
        { $inc: { "garden.$[element].water": 1 } },
        {
            arrayFilters: [
                { "element.name": { $eq: name } }
            ],
            returnOriginal: false
        }
    ).then(result => {
        filt = result.value.garden.filter(x => x.name == name);

        res.send(Object.values(filt[0]));
    })

})

app.post("/api/user/garden/remove/water", (req, res) => {

    let user = req.session.user;
    let name = req.body.name;

    db.collection("users").findOneAndUpdate(
        { username: user },
        { $inc: { "garden.$[element].water": -1 } },
        {
            arrayFilters: [
                { "element.name": { $eq: name } }
            ],
            returnOriginal: false
        }
    ).then(result => {
        filt = result.value.garden.filter(x => x.name == name);

        res.send(Object.values(filt[0]));
    })

})

app.post("/api/user/garden/raise/temp", (req, res) => {

    let user = req.session.user;
    let name = req.body.name;

    db.collection("users").findOneAndUpdate(
        { username: user },
        { $inc: { "garden.$[element].temp": 1 } },
        {
            arrayFilters: [
                { "element.name": { $eq: name } }
            ],
            returnOriginal: false
        }
    ).then(result => {
        filt = result.value.garden.filter(x => x.name == name);

        res.send(Object.values(filt[0]));
    })

})

app.post("/api/user/garden/lower/temp", (req, res) => {

    let user = req.session.user;
    let name = req.body.name;

    db.collection("users").findOneAndUpdate(
        { username: user },
        { $inc: { "garden.$[element].temp": -1 } },
        {
            arrayFilters: [
                { "element.name": { $eq: name } }
            ],
            returnOriginal: false
        }
    ).then(result => {
        filt = result.value.garden.filter(x => x.name == name);

        res.send(Object.values(filt[0]));
    })

})

app.put("/api/user/warehouse", (req,res)=>{
    let user = req.session.user;

    db.collection("users").findOneAndUpdate(
        {username : user},
        
        {$pull : {warehouse :{quantity : {$eq :0}} }},
        
        {returnOriginal : false}
        )
    .then(result =>{
        console.log(result.value.warehouse);
        //sending warehouse obj[]
        res.send({pending : null, warehouse : result.value.warehouse});
    })
})








//this does not work since 
//servers need to post and 
//browsers need to GET something
app.get('/', (req, res) => {
    console.log('requested get');

})
//this arrow function is a function that server is responding with to a
//get that it got from browser

//this callback func sends file index that will be displayed in the browser


//we use nodemon for running server that refreshes itself
//this is dev only dependencie


