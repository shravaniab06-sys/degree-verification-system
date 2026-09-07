const express = require("express");
const cors = require("cors");
const multer = require("multer");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

const upload =
  multer({
    storage: multer.memoryStorage()
  });

app.post(
  "/upload-degree",
  upload.single("file"),
  async (req, res) => {

    try {

      const {
        studentId,
        studentName,
        degreeTitle
      } = req.body;

      if (
        !studentId ||
        !studentName ||
        !degreeTitle
      ) {
        return res.status(400).json({
          error:
            "All fields are required."
        });
      }

      if (!req.file) {
        return res.status(400).json({
          error:
            "PDF file is required."
        });
      }

      if (
        req.file.mimetype !==
        "application/pdf"
      ) {
        return res.status(400).json({
          error:
            "Only PDF files are allowed."
        });
      }

      // SHA-256 hash of PDF
      const degreeHash =
        crypto
          .createHash("sha256")
          .update(req.file.buffer)
          .digest("hex");

      // Temporary IPFS placeholder
      // Replace this with actual IPFS upload.
      const ipfsCid =
        "IPFS_CID_TO_BE_GENERATED";

      res.json({
        success: true,
        degreeHash,
        ipfsCid
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error:
          "Failed to process degree."
      });
    }
  }
);

app.get("/", (req, res) => {
  res.json({
    message:
      "Degree Verification Backend Running"
  });
});

const PORT = 8000;

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  }
);