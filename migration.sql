
DROP TABLE IF EXISTS pets;
-- psql "name" -f "filename"
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name text,
    age integer,
    kind text
);
INSERT INTO pets (name, age, kind) VALUES ('Spot', 7, 'dog');