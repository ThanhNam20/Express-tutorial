const express = require("express");
const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", "./views");
var todos = [
  { id: 1, name: "An" },
  { id: 2, name: "Ngu" },
  { id: 3, name: "Nau" },
  { id: 4, name: "Hoc" }
];

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.send('Hello world <a href="/todos">Todos List</a>');
});

app.get("/todos",(req,res)=>{
  res.render("todos/index",{
    todos:todos
  })
})

app.get("/todos/search", (req, res) => {
  var q = req.query.q;
  var matchTodos = todos.filter(todo => {
    return todo.name.indexOf(q) !== -1;
  });
  res.render("todos/index", {
    todos : matchTodos
  });
});


app.post("/todos/create",(req,res)=>{
  todos.push(req.body);
  res.redirect("/todos");
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
