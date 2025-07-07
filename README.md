# Wonderlust - Airbnb Clone 🏠

A full-stack web application that replicates the core functionality of Airbnb, allowing users to list properties, browse accommodations, and leave reviews.

**Live Demo:** https://homyra.onrender.com

## 🚀 Features

- **User Authentication**: Sign up, login, and logout functionality
- **Property Listings**: Create, read, update, and delete property listings
- **Image Upload**: Upload property images using Cloudinary
- **Reviews & Ratings**: Leave reviews and star ratings for properties
- **Interactive Maps**: View property locations using Mapbox
- **Responsive Design**: Mobile-friendly interface
- **Search Functionality**: Search for destinations
- **Authorization**: Only property owners can edit/delete their listings
- **Flash Messages**: User feedback for actions

## 🛠️ Tech Stack

**Frontend:**
- EJS (Embedded JavaScript Templates)
- Bootstrap 5
- CSS3
- JavaScript
- Font Awesome Icons
- Mapbox GL JS

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js (Authentication)
- Multer (File Upload)
- Cloudinary (Image Storage)

**Other Tools:**
- Joi (Validation)
- Express Session
- Connect Flash
- Method Override

## 📁 Project Structure

```
wonderlust/
├── controllers/          # Route handlers
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/              # Database schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/              # Route definitions
│   ├── listing.js
│   ├── review.js
│   └── users.js
├── views/               # EJS templates
│   ├── layouts/
│   ├── includes/
│   ├── listings/
│   └── users/
├── public/              # Static files
│   ├── css/
│   └── JavaScript/
├── utils/               # Utility functions
├── init/                # Database initialization
├── app.js               # Main application file
├── middleware.js        # Custom middleware
├── schema.js           # Joi validation schemas
└── cloudConfig.js      # Cloudinary configuration
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd wonderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add:
   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_access_token
   ```

4. **Initialize Database (Optional)**
   ```bash
   node init/index.js
   ```

5. **Start the application**
   ```bash
   npm start
   ```

6. **Visit the application**
   Open your browser and go to `http://localhost:8080`

## 🔑 Environment Variables Required

- `ATLASDB_URL`: MongoDB Atlas connection string
- `SECRET`: Secret key for session management
- `CLOUD_NAME`: Cloudinary cloud name
- `CLOUD_API_KEY`: Cloudinary API key
- `CLOUD_API_SECRET`: Cloudinary API secret
- `MAP_TOKEN`: Mapbox access token

## 📱 Key Features Explained

### Authentication
- Users can sign up with username, email, and password
- Login/logout functionality with session management
- Protected routes that require authentication

### Listings Management
- Create new property listings with images
- Edit existing listings (only by owners)
- Delete listings (only by owners)
- View all listings with filtering options

### Reviews System
- Authenticated users can leave reviews
- Star rating system (1-5 stars)
- Only review authors can delete their reviews

### Image Upload
- Images are uploaded to Cloudinary
- Automatic image optimization and resizing
- Secure image storage

### Maps Integration
- Interactive maps showing property locations
- Geocoding for converting addresses to coordinates
- Custom markers for each property

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Filter Display**: Visual filter categories (Trending, Rooms, Mountains, Castles, etc.)
- **Tax Toggle**: Option to display prices with/without taxes
- **Flash Messages**: Success and error notifications
- **Form Validation**: Client and server-side validation

## 🔒 Security Features

- **Authentication**: Passport.js with local strategy
- **Authorization**: Route protection and ownership verification
- **Input Validation**: Joi schema validation
- **Session Management**: Secure session handling
- **CSRF Protection**: Form validation and security

## 🚀 Deployment

The application is configured for deployment with:
- Environment variable support
- Production-ready error handling
- Optimized static file serving
- Database connection handling

## 📝 API Routes

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Show create listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View specific listing
- `GET /listings/:id/edit` - Show edit form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/review` - Create review
- `DELETE /listings/:id/review/:reviewId` - Delete review

### Users
- `GET /signup` - Show signup form
- `POST /signup` - Register user
- `GET /login` - Show login form
- `POST /login` - Login user
- `GET /logout` - Logout user

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- Bootstrap for responsive design
- Mapbox for mapping functionality
- Cloudinary for image management
- Font Awesome for icons
- MongoDB Atlas for database hosting

---

**Note**: This is a learning project created to understand full-stack web development concepts including authentication, CRUD operations, file uploads, and third-party API integrations.
