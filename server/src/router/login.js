import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import client from "../connection.js";
import auth from "../middlewares/auth.js"

const router = express.Router();

async function chekUsername(username) {
    return await client.query("select * from users where username = $1 ", [username])
}
async function chek(role) {
    const check = ((await client.query("select * from users where role = $1 ", [role])).rowCount + 1);
    return check < 10 ? `0${check}` : check;
}
router.post("/check", async (req, res) => {
    console.log(req.body)
    if ((await chekUsername(req.body.username)).rows.length > 0) {
        res.send("Berhasil mengambil");
    } else {
        res.status(401);
        res.send("username Tidak Di temukan");
    }
})


router.post("/daftar", async (req, res) => {
    console.log(req.body)
    // try {
    const results = await chekUsername(req.body.username);
    if (results.rows.length > 0) {
        res.status(401);
        res.send("username Sudah ada");
    } else {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(req.body.password, salt);
        const count = await chek(req.body.role);
        if (req.body.role === 'Pengirim') {
            await client.query(
                "insert into users  values ($1, $2, $3, $4, $5)",
                [`PJ${count}`, req.body.username, hash, req.body.alamat, req.body.role]
            );
        } else {
            await client.query(
                "insert into users  values ($1, $2, $3, $4, $5)",
                [`CS${count}`, req.body.username, hash, req.body.alamat, req.body.role]
            );
        }
        res.send("users berhasil ditambahkan.");
    }
    // } catch (error) {
    //     res.status(500);
    //     res.send(error)
    // }
});

router.put("/forgot", async (req, res) => {
    const results = await chekUsername(req.body.username);
    try {
        if (results.rows.length > 0) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(req.body.password, salt);
            await client.query("update users set password = $1  where username = $2 ", [hash, req.body.username]);
            res.send("Berhasil di ubah")
        } else {
            res.status(401);
            res.send("Tidak di temukan");
        }

    } catch (error) {
        res.status(500)
        res.send(error);
    }
})


router.post("/", async (req, res) => {
    console.log(req.body)
    const user = (await chekUsername(req.body.username)).rows;
    console.log(user)
    if (user.length > 0) {
        if (await bcrypt.compare(req.body.password, user[0].password)) {
            const token = jwt.sign(user[0], process.env.SECRET_KEY);
            res
                .cookie("jwt", token, {
                    httpOnly: true,
                    // secure: true,
                })
                .send("Login berhasil.");
        } else {
            res.status(401);
            res.send("Kata sandi salah.");
        }
    } else {
        res.status(401);
        res.send("Username tidak ditemukan.");

    }
});

router.use(auth)

router.get("/me", (req, res) => {
    console.log(req.user)
    try {
        res.json(req.user);
    } catch (error) {
        res.status(404);
        res.send("belum login")
    }
});

router.post("/logout", (_req, res) => {
    res.clearCookie("jwt").send("Logout berhasil.");
});
export default router;

