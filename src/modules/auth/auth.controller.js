import User from "../../models/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createuser = async(req, res) => {
    const { first_name, last_name, gender, date_of_birth, email, address, phone, password, role } = req.body;
    if (!first_name || !gender || !date_of_birth || !email || !address || !phone || !password || !role) {
        return res.status(400).json({ message: "All fields are required" })
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(404).json({ message: "User with this email already exists" });
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({
            first_name,
            last_name,
            gender,
            date_of_birth,
            email,
            address,
            phone,
            password: hashPassword,
            role
        });
        const safeUser = user.toObject();
        delete safeUser.password
        return res.status(200).json({ message: "User created successfully", safeUser })
    } catch (errr) {
        return res.status(500).json({ message: "user not created", error })
    }
}
const loginUser = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "Invalid Credentials" })
        }
        const isMatch = bcrypt.compareSync(password, existingUser.password);
        if (!isMatch) {
            return res.status(404).json({ message: "Invalid Credentials" })
        }
        const token = jwt.sign({ id: existingUser._id, role: existingUser.role },
            process.env.JWT_secret, { expiresIn: "7d" }
        )
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false
        })
        const safeUser = existingUser.toObject();
        delete safeUser.password;
        return res.status(200).json({
            message: "User LoggedIn successfully",
            user: safeUser,
            token
        })
    } catch (err) {
        return res.status(500).json({ message: "loggedin failed", err })
    }
}

const updateUser = async(req, res) => {
    try {
        const userId = req.user.id; // ✅ from token

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // ❌ Block restricted fields
        const restrictedFields = ["email", "password", "role"];

        for (let field of restrictedFields) {
            if (req.body[field]) {
                return res.status(403).json({
                    message: `You can't update ${field}`
                });
            }
        }

        // ✅ Allowed fields
        const allowedFields = [
            "first_name",
            "last_name",
            "gender",
            "date_of_birth",
            "address",
            "phone"
        ];

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                user[field] = req.body[field];
            }
        });

        await user.save();

        const safeUser = user.toObject();
        delete safeUser.password;

        return res.status(200).json({
            message: "User updated successfully",
            user: safeUser
        });

    } catch (error) {
        return res.status(500).json({
            message: "Update failed",
            error: error.message
        });
    }
};


export { createuser, loginUser, updateUser }