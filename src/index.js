const express = require("express")
const path = require("path")
const app = express()


// const hbs = require("hbs")
//const LogInCollection = require("./mongo")
// const Video = require("./mongo")

const {LogInCollection,Video} = require("./mongo")

const port = process.env.PORT || 3000
app.use(express.json())

const multer = require('multer');


app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


app.get('/', (req, res) => {
    res.render('home')
})


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/login', (req, res) => {
    res.render('login')
})






app.post('/signup', async (req, res) => {
    try {

    const user = await LogInCollection.findOne({ name: req.body.username });

    if (user) {
    res.send("User already exists");
    }
    else if(req.body.password!==req.body.confiarmpassword){
        res.send("Password is not matched");
    } 
    else {
    const newUser = new LogInCollection({
    name: req.body.username,
    password: req.body.password
    });
    await newUser.save();
    //res.status(201).render("home", { naming: req.body.name });
    res.status(201).render("login");
    }
    } catch (error) {
    console.error("Error: ", error);
    res.status(500).send("Internal Server Error");
    }

})




app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.username })

        if (check.password === req.body.password) {
            //res.status(201).render("home", { naming: `${req.body.name}` })
            res.status(201).render("home")
        }

        else {
            res.send("incorrect password")
        }
    } 
    
    catch (e) {

        res.send("wrong details")

    }

})


app.listen(port, () => {
    console.log('port connected');
})




// Configure multer for video uploads
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./uploads");
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const upload = multer({ storage });


app.post('/uploadvideo', upload.single('video'), async (req, res) => {
    try {
        const { filename, originalname, path } = req.file;
        const video = new Video({ filename, originalname, path });
        await video.save();
        res.status(200).send('Video uploaded successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading video.');
    }
});











//npx nodemon src/index.js   this command for run app..............