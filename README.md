# MovieScope 🎬

A modern, responsive movie discovery application built with React that allows users to explore movies from The Movie Database (TMDb) API. Browse through different categories, search for movies, and get detailed information about your favorite films.

## Features

- **Movie Categories**: Browse movies by Now Playing, Popular, Top Rated, and Upcoming
- **Smart Search**: Real-time search with debounced input and paginated results
- **Detailed Movie Pages**: View comprehensive movie information including cast, crew, ratings, and more
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices with modern UI/UX
- **Performance Optimized**: Features debouncing, pagination, and request cancellation for smooth browsing
- **Dark Theme**: Modern dark UI with glassmorphism effects and smooth animations

## Live Demo

**[MovieScope Live](https://rllz0.github.io/movie_scopejs/)**

## Screenshots

### Desktop View
![MovieScope Screenshot](./src/assets/MovieScope.png)

## Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: CSS3 with responsive design and glassmorphism effects
- **API**: The Movie Database (TMDb) API v3
- **Performance**: Custom hooks for debouncing and search optimization
- **Typography**: Montserrat font family

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- TMDb API key (sign up at [themoviedb.org](https://www.themoviedb.org/))

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

3. Set up your TMDb API key:
   - Create an `api.js` file in the `src` directory
   - Add your API configuration:
   ```javascript
   const API_CONFIG = {
     baseURL: 'https://api.themoviedb.org/3',
     apiKey: 'YOUR_API_KEY_HERE',
     imageBaseURL: 'https://image.tmdb.org/t/p/w500'
   };
   export default API_CONFIG;
   ```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

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
│   └── SearchResults.jsx  # Search results component
├── pages/
│   ├── Home.jsx           # Home page with movie categories
│   ├── About.jsx          # About page
│   ├── About.css          # About page styles
│   ├── MovieDetails.jsx   # Detailed movie information page
│   └── MovieDetails.css   # Movie details page styles
├── hooks/
│   ├── useDebounce.js     # Custom hook for debouncing
│   └── useMovieSearch.js  # Custom hook for movie search logic
├── api.js                 # API configuration
├── App.jsx                # Main application component
├── App.css                # Global styles
└── index.js               # Application entry point
```

## Key Features Explained

### Smart Search
- **Debounced Input**: Reduces API calls by waiting for user to stop typing
- **Paginated Results**: Load more results as needed for better performance
- **Request Cancellation**: Cancels previous requests when new searches are initiated
- **Quality Filtering**: Filters out low-quality movies (rating < 5, vote count < 150)

### Movie Details
- **Comprehensive Information**: Title, tagline, overview, rating, release date, runtime
- **Cast & Crew**: Display main cast with photos and character names
- **Visual Appeal**: Backdrop images with overlay effects
- **External Links**: Direct links to TMDb for additional information

### Responsive Design
- **Mobile-First**: Optimized for mobile devices with touch-friendly interactions
- **Flexible Grid**: Auto-responsive movie card grid layout
- **Adaptive Typography**: Font sizes adjust based on screen size
- **Modern UI**: Glassmorphism effects and smooth transitions

## API Integration

The application uses The Movie Database (TMDb) API v3 with the following endpoints:

- **Movie Categories**: `/movie/{category}` (now_playing, popular, top_rated, upcoming)
- **Search**: `/search/movie` with query parameters and pagination
- **Movie Details**: `/movie/{id}` with credits and videos append
- **Images**: `https://image.tmdb.org/t/p/w500/` for movie posters and backdrops

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: 320px - 479px

## Styling Features

- **Dark Theme**: Professional dark color scheme with blue accents
- **Glassmorphism**: Modern glass-like effects with backdrop blur
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Grid Layout**: CSS Grid for responsive movie card layouts
- **Typography**: Custom Montserrat font integration
- **Touch-Friendly**: Optimized button sizes and interactions for mobile

## Performance Optimizations

- **Debouncing**: Reduces API calls during search
- **Pagination**: Loads content incrementally
- **Request Cancellation**: Prevents race conditions
- **Image Optimization**: Responsive image loading
- **Skeleton Loading**: Smooth loading states

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

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the comprehensive movie data API
- [Montserrat Font](https://fonts.google.com/specimen/Montserrat) for beautiful typography
- React community for excellent documentation and resources

## Future Enhancements

- [ ] User authentication and personalized recommendations
- [ ] Movie trailers and video content
- [ ] Advanced filtering by genre, year, rating
- [ ] Watchlist and favorites functionality
- [ ] Social features and reviews
- [ ] Offline support with service workers
- [ ] Movie comparison tools
- [ ] Personalized movie suggestions

## License

This project is for learning and demonstration purposes only. All movie data is provided by The Movie Database (TMDb).

---

**Built with ❤️ for movie enthusiasts**

*This product uses the TMDb API but is not endorsed or certified by TMDb.*