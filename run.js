const express = require('express');
const app = express();

app.use(express.static('.'));

app.listen(5000, () => console.log('RevealJS slides on port 5000'));
