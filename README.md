# MovieScope 🎬

A modern, responsive movie discovery application built with React that allows users to explore movies from The Movie Database (TMDb) API.

## Features

- **Movie Categories**: Browse movies by Now Playing, Popular, Top Rated, and Upcoming
- **Search Functionality**: Search for movies with real-time results
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Movie Details**: View movie posters, ratings, release dates, and descriptions
- **External Links**: Direct links to TMDb movie pages for more information
- **Dark Theme**: Modern dark UI with smooth animations and hover effects

## Live Demo

**[MovieScope Live](https://rllz0.github.io/movie_scopejs/)**

## Screenshots

### Desktop View
![MovieScope Screenshot](./src/assets/MovieScope.png)

## Tech Stack

- **React** - Frontend framework
- **CSS3** - Styling with responsive design
- **The Movie Database (TMDb) API** - Movie data source
- **Montserrat Font** - Custom typography

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd moviescope
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/
│   ├── MovieCard.jsx      # Individual movie card component
│   ├── MovieCard.css      # Movie card styles
│   ├── MovieList.jsx      # Movie list container
│   ├── MovieList.css      # Movie list styles
│   ├── Navbar.jsx         # Navigation bar with search
│   ├── Navbar.css         # Navigation bar styles
│   ├── SearchResults.jsx  # Search results component
│   └── Filter.jsx         # Rating filter component
├── assets/
│   └── fonts/
│       └── Montserrat.woff2
├── App.jsx                # Main application component
├── App.css                # Global styles
└── index.js               # Application entry point
```

## API Integration

The application uses The Movie Database (TMDb) API v3 with the following endpoints:

- **Movie Categories**: `/movie/{category}` (now_playing, popular, top_rated, upcoming)
- **Search**: `/search/movie` with query parameters
- **Images**: `https://image.tmdb.org/t/p/w500/` for movie posters

## Responsive Design

The application is fully responsive with breakpoints for:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: 320px - 479px

## Styling Features

- **Dark Theme**: Professional dark color scheme
- **Smooth Animations**: Hover effects and transitions
- **Grid Layout**: Auto-responsive movie card grid
- **Typography**: Custom Montserrat font integration
- **Touch-Friendly**: Optimized for mobile interactions

## API Key

The application uses a TMDb API key. For production use, you should:
1. Get your own API key from [TMDb](https://www.themoviedb.org/settings/api)
2. Replace the API key in the fetch URLs
3. Consider using environment variables for security

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the movie data API
- [Montserrat Font](https://fonts.google.com/specimen/Montserrat) for typography
- React community for excellent documentation and resources

## Future Enhancements

- [ ] User authentication and favorites
- [ ] Movie trailers and additional media
- [ ] Advanced filtering options
- [ ] Pagination for large result sets
- [ ] Movie recommendations
- [ ] Watchlist functionality
- [ ] Social sharing features

## License

This project is for learning/demo purposes only.

---

Made with ❤️ by Razan
