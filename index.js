const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/download', async (req, res) => {
    try {
        const fileURL = 'https://drive.google.com/uc?export=download&id=1L7-B2Zzb3aNpHG-D_4XHiWF5MlyUgBsk';
        const fileName = 'Resume of_MD Sultan Mahmud Safoun_ 10.pdf';

        const response = await axios({
            url: fileURL,
            method: 'GET',
            responseType: 'stream',
        });

        res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-type', 'application/pdf');

        response.data.pipe(fs.createWriteStream(fileName));
        response.data.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/", (req, res) => {
    res.send(`Server is running on localhost:${port}`);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
