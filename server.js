import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");


// Home page
app.get("/", (req, res) => {res.render("index.ejs", {
    drink: null,
    error: null
  });
});


// Search for a drink
app.post("/search", async (req, res) => {
  const drinkName = req.body.drinkName;

  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
    );

    if (response.data.drinks) {
      const drink = response.data.drinks[0];

      res.render("index.ejs", {
        drink: drink,
        error: null
      });

    } else {
      res.render("index.ejs", {
        drink: null,
        error: "Drink not found. Try another search."
      });
    }

  } catch (error) {
    console.log(error);

    res.render("index.ejs", {
      drink: null,
      error: "Something went wrong. Please try again."
    });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});