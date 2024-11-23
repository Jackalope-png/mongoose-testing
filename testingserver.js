const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3001;

app.use(express.json());

async function client() {
    try {
        await mongoose.connect(
            "mongodb+srv://herofussion107:MJ3kuo8GESGTUlJT@learningcluster.9inaz.mongodb.net/?retryWrites=true&w=majority&appName=learningcluster"
        );
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
});
const UserModel = mongoose.model('User', userSchema);

client();

app.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users", error);
        res.status(500).send("Internal Server Error");
    }
});

app.put("/users/:id", async (req, res) => { 
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(PORT, () => {
    console.log(`all good buddy`);
});



// routes controllers modules














// app.post("/signup", async (req, res) => {
//     const { name, password } = req.body;

//     const existingUser = await UserModel.findOne({ name });
//     if (existingUser) {
//         return res.status(409).send("User already exists");
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     try {
//         const newUser = new UserModel({ name, password: hashedPassword });
//         await newUser.save(); 
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error("Error inserting user", error);
//         res.status(500).send("Internal Server Error");
//     }
// });


// app.post("/login", async (req, res) => {
//     const { name, password } = req.body;

//     if (!name || !password) {
//         return res.status(400).send("Name and password are required");
//     }

//     try {
//         const user = await UserModel.findOne({ name });

//         if (!user) {
//             return res.status(401).send("Invalid username or password");
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             return res.status(401).send("Invalid username or password");
//         }

//         res.status(200).send({ message: "Login successful", userId: user._id });
//     } catch (error) {
//         console.error("Error logging in", error);
//         res.status(500).send("Internal Server Error");
//     }
// });