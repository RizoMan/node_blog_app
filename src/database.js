const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:/blog-app',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(db => console.log('DB is connected'))
  .catch(err => console.log(err));