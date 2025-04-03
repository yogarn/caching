CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    director VARCHAR(255),
    synopsis TEXT,
    rating VARCHAR(10),
    duration VARCHAR(50),
    poster VARCHAR(255),
    release_date DATE,
    language VARCHAR(50),
    country VARCHAR(50),
    genres VARCHAR(50)
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
    review TEXT NOT NULL
);
