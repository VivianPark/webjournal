import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts=[];


const homeStartingContent = "Welcome to my world! I'm a fresh web developer who likes doing experiments! Come and see my experiments.";
const journalContent = "This is my the place where I record and practice what I've learned as form of journals.";
const contactContent = "I'd like to hear what you think about my works. It's open to anyone and anything about my work.";


app.get("/", (req, res) => {
  res.render("home.ejs" , {StartingContent: homeStartingContent});
  
});



app.get("/posts/:postName", (req, res) =>{
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
   const storedTitle=_.lowerCase(post.title);
  

   if (storedTitle===requestedTitle) {
   

    res.render("post.ejs" , {
      title: post.title,
      content: post.content,
      storedTitle: storedTitle
    });
   } 
  });
  
  
});

app.get("/journal", (req, res) => {
  res.render("journal.ejs" , {journal: journalContent, posts: posts});
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs" , {contact: contactContent});
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/compose" , (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");

});







app.listen(3000, function() {
  console.log("Server started on port 3000");
});

