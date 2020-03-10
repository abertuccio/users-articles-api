const app = require('./api/app.js');

app.listen(process.env.PORT || 3000, ()=>{ console.log("Server running"); });