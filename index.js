const express = require('express');
// const axios = require('axios');
const cors = require('cors');
// const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/download', (req, res) => {
    const filePath = "MD_Sultan_Mahmud_Safoun_s_resume.pdf"; //  The actual file path
    const fileName = "MD_Sultan_Mahmud_Safoun_s_resume.pdf"; //  The desired file name for download

    const file = path.resolve(filePath);

    res.download(file, fileName, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error 500. Internal Server Error');
        }
    });
});

app.get("/", (req, res) => {
    res.send(`Server is running on localhost:${port}`);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
