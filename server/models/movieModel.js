const mongoose = require('mongoose');

const movies = [
  {
    id: 1,
    name: "Inception",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    genre: ["Science Fiction", "Action", "Thriller"],
    poster: "https://example.com/inception_poster.jpg",
    releaseDate: new Date("2010-07-16"),
    bio: "Inception is a science fiction action film...",
  },
  {
    id: 2,
    name: "The Shawshank Redemption",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    genre: ["Drama", "Crime"],
    poster: "https://example.com/shawshank_redemption_poster.jpg",
    releaseDate: new Date("1994-09-23"),
    bio: "The Shawshank Redemption is a drama film...",
  },
  {
    id: 3,
    name: "The Godfather",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    genre: ["Crime", "Drama"],
    poster: "https://example.com/godfather_poster.jpg",
    releaseDate: new Date("1972-03-24"),
    bio: "The Godfather is a crime film...",
  },
];

module.exports = movies;

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cast: { type: [String], required: true },
    genre: { type: [String], required: true },
    poster: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    bio: { type: String, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
