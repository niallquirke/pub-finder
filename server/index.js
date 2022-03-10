require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");
const morgan = require("morgan");

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Get all
app.get("/api/pubs", async (req, res) => {
  try {
    const query = `
      SELECT 
        pubs.id,
        pubs.name, 
        pubs.location, 
        pubs.price_range, 
        TRUNC(AVG(reviews.rating), 1) AS avg_rating, 
        COUNT(reviews.rating) AS review_count
      FROM pubs
      LEFT JOIN reviews ON pubs.id = reviews.pub_id
      GROUP BY pubs.id
      ORDER BY 
        review_count DESC NULLS LAST,
        avg_rating DESC NULLS LAST
    `;
    const queryRes = await db.query(query);
    res.status(200).json({
      status: "success",
      results: queryRes.rows.length,
      data: {
        pubs: queryRes.rows,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// Get
app.get("/api/pubs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pubQuery = `
      SELECT
        pubs.id,
        pubs.name,
        TRUNC(AVG(reviews.rating), 1) AS avg_rating
      FROM pubs
      LEFT JOIN reviews ON pubs.id = reviews.pub_id
      WHERE pubs.id = $1
      GROUP BY pubs.id
    `;
    const pubQueryRes = await db.query(pubQuery, [id]);
    const reviewsQuery = "SELECT * FROM reviews WHERE pub_id=$1";
    const reviewsQueryRes = await db.query(reviewsQuery, [id]);
    res.status(200).json({
      status: "success",
      data: {
        pub: pubQueryRes.rows[0],
        reviews: reviewsQueryRes.rows,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// Create
app.post("/api/pubs", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const query = `
      INSERT INTO pubs (name, location, price_range) 
      VALUES ($1, $2, $3)
      RETURNING *
      `;
    const queryRes = await db.query(query, [name, location, price_range]);
    res.status(201).json({
      status: "success",
      data: {
        pub: queryRes.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// Update
app.put("/api/pubs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, priceRange } = req.body;
    const query = `
      UPDATE pubs 
      SET name = $1, 
          location = $2, 
          price_range = $3
      WHERE id = $4
      RETURNING *
      `;
    console.log(query);
    const queryRes = await db.query(query, [name, location, priceRange, id]);
    res.status(200).json({
      status: "success",
      data: {
        pub: queryRes.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// Delete
app.delete("/api/pubs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM pubs WHERE id = $1";
    const queryRes = await db.query(query, [id]);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.error(err);
  }
});

app.post("/api/reviews", async (req, res) => {
  try {
    const { name, pub_id, rating, review } = req.body;
    const query = `
      INSERT INTO reviews (name, pub_id, rating, review) 
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `;
    const queryRes = await db.query(query, [name, pub_id, rating, review]);
    res.status(200).json({
      status: "success",
      data: {
        review: queryRes.rows[0],
      },
    });
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
