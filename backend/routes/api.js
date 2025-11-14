import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Lead from "../models/schema.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFeesData = () => {
  const dataPath = path.join(__dirname, "../seed/fees.json");
  const raw = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(raw);
};

/* ===========================
   GET: University Full Data
=========================== */
router.get("/university/:id", (req, res) => {
  try {
    const all = getFeesData();
    const uni = all.find((u) => u.id === req.params.id);

    if (!uni) return res.status(404).json({ error: "University not found" });

    res.json(uni);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ===========================
   GET: Fees for Modal
=========================== */
router.get("/university/:id/fees", (req, res) => {
  try {
    const all = getFeesData();
    const uni = all.find((u) => u.id === req.params.id);

    if (!uni) return res.status(404).json({ error: "University not found" });

    res.json({
      fees: uni.courses.map((c) => ({
        course: c.name,
        feeRange: c.feeRange,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ===========================
   POST: Save Lead 
=========================== */
router.post("/leads", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      state,
      course,
      intakeYear,
      consent,
      pipedreamUrl,
    } = req.body;

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: "Phone must be 10 digits" });
    }

    const lead = new Lead({
      fullName,
      email,
      phone,
      state,
      course,
      intakeYear,
      consent,
    });

    await lead.save();

    if (pipedreamUrl) {
      try {
        await fetch(pipedreamUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body),
        });
      } catch (_) {}
    }

    res.json({ success: true, message: "Lead saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
