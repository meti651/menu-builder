import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Recipe api");
});

export default router;
