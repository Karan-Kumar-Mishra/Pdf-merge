import express from "express";
const app = express();
import multer from "multer";
import PDFMerger from "pdf-merger-js";
var merger = new PDFMerger();
import fs from "fs"
let number = 1;
app.use(express.static("public"));
function DeleteFile()
{
   
    fs.unlink("./public/merged.pdf", (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
       
    });
    fs.unlink("./uploads/pdf-1.pdf", (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
       
    });
    fs.unlink("./uploads/pdf-2.pdf", (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
    });
}
async function merge_pdf() {
  await merger.add("uploads/pdf-1.pdf");
  await merger.add("uploads/pdf-2.pdf", 1);
  await merger.setMetadata({
    producer: "pdf-merger-js based script",
    author: "karan kumar mishra",
    creator: "zack",
    title: "merged pdf",
  });
  await merger.save("public/merged.pdf", () => {
    console.log("pdf is saved ");
  });
}
const setupname = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop();
    const uniqueSuffix = `pdf-${number}`;
    number++;
    cb(null, uniqueSuffix + "." + fileExtension);
    if (number === 3) {
      merge_pdf();
    }
  },
});
const upload = multer({ storage: setupname });
app.post("/profile", upload.any("file"), function (req, res) {
  res.redirect("/");
});
app.post("/pdf_downloaded", function (req, res) {
   DeleteFile()
  res.redirect("/");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.listen(80, () => {
  console.log("Server is running...");
});
