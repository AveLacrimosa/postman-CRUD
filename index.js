const message = require("./modules/message");

console.log("mano pirmasis NODEJS projektas " + message);

//Creating a server
const express = require("express");
const app = express();

//Duomenys perduodami json formatu
app.use(express.json());

//duomenu masyvas
const products = [
  {
    id: 1,
    title: " Eloquent JavaScript",
    description:
      "This is a book about JavaScript, programming, and the wonders of the digital. You can read it online here, or buy your own paperback copy.",
  },
  {
    id: 2,
    title: "The Creative Act: A Way of Being",
    description:
      "From the legendary music producer, a master at helping people connect with the wellsprings of their creativity, comes a beautifully crafted book many years in the making that offers that same deep wisdom to all of us.",
  },
  {
    id: 3,
    title: "The Art of Avatar The Way of Water",
    description:
      "Packed with hundreds of stunning images and written in collaboration with the filmmakers themselves, uncover the incredible creative and technical skill that went into the making of Avatar: The Way of Water.",
  },
  {
    id: 4,
    title: "Becoming Free Indeed: My Story of Disentangling Faith from Fear",
    description:
      "Jinger Vuolo, the sixth child in the famous Duggar family of TLC, recounts how she began to question the unhealthy ideology of her youth and learned to embrace true freedom in Christ.",
  },
  {
    id: 5,
    title: "Age of Vice",
    description:
      "New Delhi, 3 a.m. A speeding Mercedes jumps the curb and in the blink of an eye, five people are dead. It’s a rich man’s car, but when the dust settles there is no rich man at all, just a shell-shocked.",
  },
];

//Svarbu 1. sukurti route. Visi produktai
app.get("/api/products", (req, res) => {
  res.send(products);
});

//Vienas produktas
app.get("/api/products/:id", (req, res) => {
  const myProduct = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!myProduct) res.status(404).send("not found");

  res.send(myProduct);
});

//Naujos prekes pushinimas

app.post("/api/products", (req, res) => {
  const product = {
    id: products.length + 1,
    title: req.body.title,
    description: req.body.description,
  };
  products.push(product);
  res.send(products);
});

//esamos prekes atnaujinimas
app.put("/api/products/:id", (req, res) => {
  const myProduct = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!myProduct) res.status(404).send("not found");
  myProduct.title = req.body.title;
  myProduct.description = req.body.description;
  res.send(myProduct);
});

//esamos prekes pasalinimas
app.delete("/api/products/:id", (req, res) => {
  const myProduct = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!myProduct) res.status(404).send("not found");

  const product_index = products.indexOf(myProduct);
  products.splice(product_index, 1);

  res.send(myProduct);
});

//Apsirasome port
const PORT = 5001;

//Startuojam serveri
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

//
