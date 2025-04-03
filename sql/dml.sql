-- Optional
-- Insert movie
INSERT INTO movies (slug, title, year, director, synopsis, rating, duration, poster, release_date, language, country, genres)
VALUES 
('the-perks-of-being-a-wallflower', 
 'The Perks of Being a Wallflower', 
 2012, 
 'Stephen Chbosky', 
 'A socially awkward teenager finds solace in two charismatic seniors who welcome him to the real world.', 
 'PG13', 
 '103 min', 
 'https://www.imdb.com/images/the-perks-of-being-a-wallflower.jpg', 
 '2012-09-21', 
 'English', 
 'USA',
 'Drama, Romance'
);

-- Reviews
INSERT INTO reviews (username, movie_id, review)
SELECT 'user123', m.id, 'Amazing movie, truly inspiring!'
FROM movies m WHERE m.slug = 'the-perks-of-being-a-wallflower';

INSERT INTO reviews (username, movie_id, review)
SELECT 'cinema_fan', m.id, 'Great performances and storytelling!'
FROM movies m WHERE m.slug = 'the-perks-of-being-a-wallflower';
