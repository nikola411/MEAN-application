
//require to be able to use express
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const request = require("request");

const MongoClient = require('mongodb').MongoClient;

const DISTANCE_API_KEY = "AqZHdc6VCnHj7GO5sOMgY_6mEeae6NH-yh71uFes1sxYVh--4lp2Ihhzt4XahGd0";
const LOCATION_API_URL = "http://dev.virtualearth.net/REST/v1/Locations/";
const DISTANCE_API_URL = "http://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix/";

const BingDistanceMatrix = require('bing-distance-matrix');
const bdm = new BingDistanceMatrix(DISTANCE_API_KEY);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mojrasadnik.pia.etf@gmail.com',
      pass: 'nikolacar11'
    }
  });

const APP_EMAIL = "mojrasadnik.pia.etf@gmail.com";

//we instantiate express to be able to use it
const app = express();
const TWO_HOURS = 1000 * 60 * 60 * 2;
const SESS_ID = 'sid';
const SESS_SECRET = 'ssh!quiet,it\'sasecret';
const url = 'mongodb://127.0.0.1:27017';
const myDB = 'myDB';
//used for captcha validation
const secretkey = "6LcAfgEVAAAAAPrN9EDUPbqWQSwcQ5pCGGMEhBlC";


let loggedIn = "";


let currId = 1;
let db;
let prodId = 0;
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



app.post("/api/position", (req, res) => {

})

app.listen(3000, (req, res) => {
    console.log("Server init");

    //ovde pisemo funkciju za pozicioni api
    //odakle vadimo start i finish
    //f

    /* let start = "Wuhan, Wuhan";
     let end = "Beograd";
 
     const locationUrl = "http://dev.virtualearth.net/REST/v1/Locations/";
     const distanceUrl = "http://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix/";
     
     let srcCoordUrl = locationUrl + start + "?key=" + DISTANCE_API_KEY;
     let dstCoordUrl = locationUrl + end + "?key=" + DISTANCE_API_KEY;
     console.log("lokacija")
 
     request(srcCoordUrl, (err,response, body)=>{
         let telo = JSON.parse(body);            
         let srcCoords = telo.resourceSets[0].resources[0].point.coordinates;            
        
         request(dstCoordUrl , (err , response , body)=>{
             
             let telo = JSON.parse(body);            
             let dstCoords = telo.resourceSets[0].resources[0].point.coordinates; 
 
             let razdaljinaUrl = distanceUrl + "?origins=" + srcCoords.join() 
                                                      + "&destinations=" + dstCoords.join()
                                                      + "&travelMode=driving&key=" + DISTANCE_API_KEY;
 
             request(razdaljinaUrl , (err , response , body)=>{              
             
                 let telo = JSON.parse(body);                                 
                 console.log(telo.resourceSets[0].resources[0].results[0]);                         
                 
             });
 
     
         });
     })
 
 
 
     */

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


    if (req.session.userId && loggedIn != "") {
        console.log('Logged in');
        res.send({ route: "user", type: loggedIn });
    } else {
        console.log('Not logged in');
        res.send({ route: "login" });
    }


})

app.post('/api/validate/token', (req, res) => {
    let token = req.body.token;
    const secretKey = "6LcAfgEVAAAAAPrN9EDUPbqWQSwcQ5pCGGMEhBlC";
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${req.connection.remoteAddress}`

    if (token === null || token === undefined) {
        res.status(201).send({ success: false, message: "Token is empty or invalid" })
        return console.log("token empty");
    }

    request(url, function (err, response, body) {

        body = JSON.parse(body);

        //check if the validation failed
        if (body.success !== undefined && !body.success) {
            res.send({ success: false, 'message': "recaptcha failed" });
            return console.log("failed")
        }

        //if passed response success message to client
        res.send({ "success": true, 'message': "recaptcha passed" });

    })

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
        req.body.productId = 0;
        req.body.status = "pending";
        console.log(req.body);

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

    db.collection('users').find(
        { username: req.body.user, password: req.body.pass, status: "registered" }
    )
        .toArray()
        .then(results => {
            console.log(results);
            for (i in results) {
                if (results[i].password == password) {
                    req.session.userId = currId++;
                    req.session.user = req.body.user;

                    loggedIn = results[i].type;

                    let userInfo = {
                        username: results[i].username, place: results[i].place,
                        email: results[i].email, firstName: results[i].firstName,
                        lastName: results[i].lastName, date: results[i].date,
                        type: results[i].type
                    };

                    if (loggedIn == "company") {
                        prodId = results[i].productId;
                    }
                    if (results[i].type != "admin") {
                        res.send({ route: "/user", user: userInfo });
                    } else {
                        res.send({ route: "/admin", user: userInfo });
                    }

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

app.post("/api/user/footer",(req,res)=>{
    let user = req.session.user;
    db.collection("users").findOne({username : user}).then(result=>{
        let response = "";
        let alert = "";
        let number = 0;
        for(i in result.garden){
            if(result.garden[i].temp<18 || result.garden[i].water<70  ){
                alert+=result.garden[i].name +" ";
                number++;
            }
        }
        if(number>1){
            response = "U rasadnicima: " +alert + "su nepovoljni uslovi!!!";
      
        }else if(number == 1){
            response = "U rasadniku: " + alert + "su nepovoljni uslovi!!!";
        } 
        
        res.send({alert : response, number : number});
    })
})

function checkingGardens() {
    db.collection('users').find({type : "farmer"}).toArray().then(result=>{
        let receivers = "";
        for(i in result){
            for(j in result.garden){
                if(result.garden[j].temp < 18 ||result.garden[j].water < 70){
                   receivers+=result[i].email + ",";
                   console.log(result.garden[j].temp);
                   console.log(result.garden[j].temp);
                }
            }
        }
        console.log(receivers);
    })
   
  }
  
//setInterval(checkingGardens, 1500);


app.post('/api/user/addgarden', (req, res) => {
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
            req.body.garden[i][j] = { state: -1, x: i, y: j, name: "", producer: "" };

        }
    }
    req.body.water = 70;
    req.body.temp = 18;
    req.body.free = width * height;

    db.collection('users').findOneAndUpdate({ "username": req.session.user }, {
        $push: { "garden": req.body }
    }).then(result => {
        console.log(result);
        res.send(result.value.garden);
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
                "warehouse.$[elem].quantity": -1
            },
            $set: {
                "garden.$[element].garden.$[i].$[j].name": plantName,
                "garden.$[element].garden.$[i].$[j].producer": producer,
            }
        },
        {

            arrayFilters: [
                { "element.name": { $eq: name } },
                { "i.x": { $eq: i } }, { "j.y": { $eq: j } },
                { "elem.name": { $eq: plantName }, "elem.producer": { $eq: producer } }
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

app.put("/api/user/warehouse", (req, res) => {
    let user = req.session.user;

    db.collection("users").findOneAndUpdate(
        { username: user },

        { $pull: { warehouse: { quantity: { $eq: 0 } } } },

        { returnOriginal: false }
    )
        .then(result => {
            console.log(result.value.warehouse);
            //sending warehouse obj[]
            res.send({ pending: null, warehouse: result.value.warehouse });
        })
})


app.post("/api/company/orders", (req, res) => {
    let user = req.session.user;

    db.collection("users").findOne({ username: user }, {
        projection: {
            orders: 1, _id: 0
        }
    }).then(result => {
        res.send(result);
    })
})

app.post("/api/shop/product/order", (req, res) => {
    console.log(req.body);

    let company = req.body.company;
    let product = req.body.product;

    //username, email, phonenumber, 
    let user = req.body.user;
    let quantity = req.body.quantity;
    let type = req.body.type;
    let properties = req.body.properties;
    let date = new Date;

    let order = { 
                username : user.username,
                email : user.email,
                place : user.place, 
                product: product, 
                time: date, 
                quantity : quantity, 
                properties : properties, 
                type : type 
            };
    console.log(order);

    //inserts order into order array and returns product that is ordered
    //we cannot atomically acces the shop courires, so we need another funciton for that
    //we return a product to put in users warehouse\\\\\\\\\\\\\ as an order

    db.collection('users').updateOne({ firmName: company, type: "company" }, {
        $push: { orders: order },
        $inc: { "shop.$[element].quantity": -quantity },

    }, {
        arrayFilters: [
            { "element.name": { $eq: product } }
        ],
        
    }).then(result => {

        res.send({ updated: true });
    })
})

app.post("/api/company/orders/shop/courier", (req, res) => {

    let request = req.body.request;
    let start = request.start;
    let end = request.goingTo;

    let srcCoordUrl = LOCATION_API_URL + start + "?key=" + DISTANCE_API_KEY;
    let dstCoordUrl = LOCATION_API_URL + end + "?key=" + DISTANCE_API_KEY;


    request(srcCoordUrl, (err, response, body) => {
        let ret = JSON.parse(body);
        let srcCoords = ret.resourceSets[0].resources[0].point.coordinates;

        request(dstCoordUrl, (err, response, body) => {

            let ret = JSON.parse(body);
            let dstCoords = ret.resourceSets[0].resources[0].point.coordinates;

            let distanceUrl = DISTANCE_API_URL + "?origins=" + srcCoords.join()
                + "&destinations=" + dstCoords.join()
                + "&travelMode=driving&key=" + DISTANCE_API_KEY;

            request(distanceUrl, (err, response, body) => {

                let ret = JSON.parse(body);

                // console.log(ret.resourceSets[0].resources[0].results[0]); 
                db.collection("users").updateOne({ type: "shop" },
                    {
                        "shop.couiers[element]":
                        {
                            $set:
                                { startTime: request.start, goingTo: request.goingTo, busy: true }
                        }

                    }, {
                    arrayFilters: [
                        { "element.busy": { $eq: false } }
                    ]
                }
                ).then(result => {
                    //if(result.updated) res.send({deliveryTime : time});
                    console.log(ret, result);
                })

            });


        });
    })





})


app.post("/api/company/products", (req, res) => {
    let user = req.session.user;

    db.collection("users").findOne({ username: user }, { projection: { shop: 1, _id: 0 } })
        .then(result => {
            res.send(result);
        })
})

app.post("/api/company/product/add", (req, res) => {
    let user = req.session.user;
    let product = req.body;
    product.comments = [];
    product.rating = null;
    ///product.id = prodId++;


    db.collection("users").findOneAndUpdate({ username: user },
        {
            $push: { shop: product },
            $inc: { productId: 1 }
        }
    ).then(result => {
        res.send(result);
    }

    )
})

app.post("/api/company/product/remove", (req, res) => {
    let user = req.session.user;
    let productName = req.body.name;
    let productId = req.body.id;

    db.collection('users').updateOne(
        { username: user },
        {
            $pull: { shop: { name: productName, id: productId } },

        }).then(result => {
            res.next();
        })
})

app.post("/api/shop", (req, res) => {
    db.collection('users').find({ type: "company" },
        { projection: { _id: 0, firmName: 1, shop: 1, place: 1 } }).toArray().then(result => {
            res.send(result)
        });
})

app.post("/api/shop/product", (req, res) => {
    
    let comp = req.body.companyName;
    let companyLocation = req.body.companyLocation;
    let prod = req.body.product;
    db.collection('users').findOne({ firmName: comp }, { projection: { shop: 1, orders : 1 } }).then(result => {
        
        if (result && result.shop) {
            //find product
            let x = result.shop;
            let ret = x.filter(y => y.name == prod);
            ret[0].producer = comp;
            ret[0].producerLocation = companyLocation;

            //see if user can rate it

            let user = req.session.user;
            let orders = result.orders;
            let canRate = false;

            let filt = orders.filter(elem=> elem.product == prod && elem.user.username == user);
            let comm = ret[0].comments;

            let filt2 = comm.filter(elem=>elem.user == user);
            //user can rate it if he didnt comment on the product already
            //and has orderd it

            //however, user can leave a comment every time he orders a product
            console.log(filt.length);
            console.log(filt2.length);
            if(filt.length > 0 && filt2.length ==0 || filt.length > filt2.length){
                canRate = true;
            }
          
            res.send({ product: ret[0], canRate : canRate });
        } else {
            res.send({ product: null });
        }
    })
})

app.post("/api/shop/user/orders/cancel",(req,res)=>{
    let firmName = req.body.firmName;
    let product = req.body.product;
    let user = req.session.user;

    let quantity = parseInt(req.body.quantity);
    if(!quantity){
        quantity = 1;
    }
    console.log(firmName + " " + product + " " + user + " " + quantity);

    db.collection('users').updateOne({firmName : firmName, type : "company"},{
        $pull : {orders : 
                    { product : product, username :user}
                },
        $inc : {"shop.$[element].quantity" : quantity}
    },{
        arrayFilters : [
            {"element.name" : {$eq : product} }
        ]
    }
    ).then(result=>{
        console.log(result);
    })

})



app.post("/api/shop/product/add/comment", (req, res) => {
    console.log(req.body);
    let comp = req.body.product.producer;
    let prod = req.body.product.name;
    let user = req.session.user;
    let rating = req.body.rating;
    let comment = { text: req.body.comment, user: user, rating : rating };
    console.log(comment);
    console.log(req.body);
    //treba da se trazi preko array giltera u nizu shop kompanije a ne da pravis 
    //novo polje koje se zove comments

    db.collection('users').findOneAndUpdate({ firmName: comp, type: "company" },
        { $push: { "shop.$[element].comments": comment } },
        {
            arrayFilters: [
                { "element.name": { $eq: prod } }
            ]
        },
        { returnOriginal: false }
    ).then(
        result => {
            console.log(result);
            //res.send(result);
        }
    )
})

app.post("/api/shop/user/orders", (req,res)=>{
    let user = req.session.user;
    //let element = {firmName : "", product : "", time : null, courier : -1};
    let response = [];

    console.log("ovo su narudzbine")
;    db.collection('users').find({type : "company"},{orders : 1})
    .toArray().then(result=>{
        if(result){
            for(i in result){
                let firmName = result[i].firmName;
                console.log(firmName);
                if(result[i].orders){
                    let userOrders = result[i].orders.filter(x=>x.username == user);
                    for(j in userOrders){
                        let product = userOrders[j].product;
                        let time = userOrders[j].time;
                        let quantity = userOrders[j].quantity;
                        let properties = userOrders[j].properties;
                        let type = userOrders[j].type;
                        let price = userOrders[j].price;
                        //let courier = userOrders[j].courier;
                        response.push({firmName : firmName,
                                        product : product, 
                                        time : time, 
                                        quantity : quantity,
                                        properties : properties,
                                        type : type,
                                        price : price
                                    });
                    }
                }
                
            }

        }
       

        res.send({response : response});
    })
})


app.post("/api/admin/users", (req, res) => {
    db.collection('users').find({ status: "registered" },
        { projection: { _id: 1, username: 1, email: 1, type: 1 } })
        .toArray()
        .then(result => {
            res.send(result);
        })
})

app.post("/api/admin/users/remove", (req, res) => {
    let user = req.body.user;
    let email = req.body.email;

    console.log("removing users");


    db.collection('users').deleteOne({ username: user, email: email }).then(result => console.log(result));
    res.send({ removed: true });

})

app.post("/api/admin/requests", (req, res) => {
    db.collection('users').find(
        { status: "pending" }, { projection: { _id: 1, username: 1, email: 1, type: 1 } })
        .toArray()
        .then(result => {
            res.send(result);
            console.log(result)
        })
})

app.post("/api/admin/requests/add", (req, res) => {
    db.collection('users').find({ status: "pending" }, { projection: { username: 1, email: 1, type: 1 } })
        .toArray()
        .then(result => { res.send(result); console.log(result) });
})

app.post("/api/admin/requests/confirm", (req, res) => {
    let user = req.body.user;
    db.collection("users").updateOne({ username: user }, { $set: { status: "registered" } }).then(res.send({ registered: true }));
})

app.post("/api/admin/requests/remove", (req, res) => {
    let user = req.body.user;
    db.collection("users").deleteOne({ username: user, status: "pending" }).then(result => {
        res.send({ removed: result.deletedCount == 1 ? true : false });
    });
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


