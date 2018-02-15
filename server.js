const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

let app=express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname+"/views/partials");

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.use((req,res,next)=>{
    let date= new Date().toDateString();
    let log=`${date} : ${req.method} : ${req.url}`;
    fs.appendFile('server.log', log + '\n',(err)=>{
        console.log(err);
    });
    console.log(log);
    next();
});

app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname +"/public"));

app.get('/',(req,res)=>{
        res.render('home.hbs',{
            welcomeMessage:'Welcome to our amazing website!',
            pageTitle:'Our amazing home page'
        });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to handle request.'
    });
});

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});