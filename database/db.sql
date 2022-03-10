CREATE DATABASE yelp-clone

CREATE TABLE pubs (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <=5)
);

CREATE TABLE reviews(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  pub_id BIGINT NOT NULL REFERENCES pubs(id),
  name VARCHAR(50) NOT NULL, 
  review TEXT NOT NULL,
  rating INT NOT NULL CHECK(rating >=1 AND rating <= 5)
);