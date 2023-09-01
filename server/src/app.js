import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import login from "./router/login.js";
import fifo from "./router/fifo.js";
import client from "./connection.js";

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
const router = express.Router();

app.use(cookieParser());

const orders = [
    { 'id_order': 1, 'id_pengirim': 'PJ01', 'id_penerima': 'CS01', 'alamat': 'Surabaya - osowilangon', 'priority': 4 },
    { 'id_order': 2, 'id_pengirim': 'PJ02', 'id_penerima': 'CS02', 'alamat': 'Surabaya - pasarturi', 'priority': 3 },
    { 'id_order': 3, 'id_pengirim': 'PJ03', 'id_penerima': 'CS03', 'alamat': 'Gresik - Kebomas', 'priority': 5 },
    { 'id_order': 4, 'id_pengirim': 'PJ04', 'id_penerima': 'CS04', 'alamat': 'Sidoarjo - Aloha', 'priority': 1 },
    { 'id_order': 5, 'id_pengirim': 'PJ05', 'id_penerima': 'CS05', 'alamat': 'Surabaya - Rungkut', 'priority': 2 }
];


router.use("/login", login);


// soal 2
router.get("/", (req, res) => {
    try {
        orders.sort((a, b) => a.priority - b.priority);
        res.json(orders)
    } catch (error) {
        res.status(500);
        res.send(error);
    }
})

router.use("/fifo", fifo)


router.get("/pengirim", async (_req, res) => {
    try {
        res.json((await client.query("select * from  users where role = 'Pengirim'")).rows);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
router.post("/pengirim", async (req, res) => {
    console.log(req.body)
    try {
        res.json((await client.query("insert into '")).rows);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});

app.use("/api", router);

const PORT = 3000;
app.listen(PORT, console.log(`server sedang berjalan di port ${PORT}`));

