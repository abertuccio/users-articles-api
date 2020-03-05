const app = require('./api/app.js');

app.listen(process.env.PORT, ()=>{ console.log("Server running"); });