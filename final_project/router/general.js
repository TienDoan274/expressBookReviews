const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
    username=req.body.username;
    password=req.body.password;
    if(!isValid(username)){
        return res.status(404).json({message:"Username already exists"});
    }
    else{
        user={"username":username,"password":password};
        users.push(user);
        return res.status(200).json({message:"Register successfully"});
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    isbn= req.params.isbn;
    res.send(JSON.stringify(books[isbn],null,4))
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    author=req.params.author;
    let ans;
    for(let i=1;i<=10;i++){
        if(books[i]['author']==author) ans=books[i]
    }
    res.send(JSON.stringify(ans,null,4))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    title=req.params.title;
    let ans;
    for(let i=1;i<=10;i++){
        if(books[i]['title']==title) ans=books[i]
    }
    res.send(JSON.stringify(ans,null,4))
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    isbn=req.params.isbn;
    res.send(JSON.stringify(books[isbn]['review'],null,4))
});

module.exports.general = public_users;
