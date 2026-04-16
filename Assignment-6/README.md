# SecondHand - E-Commerce Portal for Used Items

A modern e-commerce platform built with Node.js, Express, and MongoDB for buying and selling used items like cars, bikes, electronics, and more.

## Features

- **User Authentication**: Register and login functionality
- **Browse Items**: Filter items by category, condition, price range
- **Post Items**: Sellers can post used items for sale
- **Shopping Cart**: Add items to cart and checkout
- **User Profile**: Manage user information and address details
- **My Items**: View and manage posted items
- **Search**: Full-text search across all items
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling (with responsive design)
- **Vanilla JavaScript** - Interactivity (no frameworks)

## Project Structure

```
ecommerce-portal/
├── public/
│   ├── css/
│   │   └── style.css          # Global styles
│   └── js/
│       ├── app.js              # Main app logic
│       ├── items.js            # Items page logic
│       ├── item-detail.js      # Item detail page
│       ├── sell.js             # Sell item form
│       ├── my-items.js         # User's items
│       ├── cart.js             # Shopping cart
│       ├── profile.js          # User profile
│       └── auth.js             # Login/Register
├── views/
│   ├── index.html              # Homepage
│   ├── items.html              # Browse items
│   ├── item-detail.html        # Item details
│   ├── sell.html               # Sell item form
│   ├── my-items.html           # User's items
│   ├── cart.html               # Shopping cart
│   ├── profile.html            # User profile
│   └── login.html              # Auth page
├── models/
│   ├── User.js                 # User model
│   ├── Item.js                 # Item model
│   └── Cart.js                 # Cart model
├── routes/
│   ├── auth.js                 # Auth routes
│   ├── items.js                # Items routes
│   └── cart.js                 # Cart routes
├── server.js                   # Express server setup
├── package.json                # Dependencies
├── .env                        # Environment variables
└── README.md                   # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. **Clone/Download the project**
   ```bash
   cd ecommerce-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure MongoDB**
   - Copy `.env.example` to `.env` and update the values.
   - If you use MongoDB Compass, copy the connection string from Compass and paste it into `.env`.
   - Example `.env` values:
   ```
   MONGODB_URI=mongodb://localhost:27017/ecommerce-portal
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_change_this
   ```
   - For MongoDB Atlas / Compass cloud connection, use the full URI from Compass, for example:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce-portal?retryWrites=true&w=majority
   ```

4. **Start MongoDB**
   - If using local MongoDB:
   ```bash
   mongod
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   
   Or with auto-reload (requires nodemon):
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open your browser and go to: `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile/:userId` - Get user profile
- `PUT /api/auth/profile/:userId` - Update user profile

### Items
- `GET /api/items` - Get all items (with filters)
- `GET /api/items/:id` - Get item details
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `GET /api/items/seller/:sellerId` - Get seller's items

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/add/:userId` - Add item to cart
- `DELETE /api/cart/remove/:userId/:itemId` - Remove item from cart
- `DELETE /api/cart/clear/:userId` - Clear entire cart

## Usage

### For Buyers
1. **Register/Login** to create an account
2. **Browse Items** using the categories or search
3. **View Details** of any item to see seller information
4. **Add to Cart** items you're interested in
5. **Checkout** to complete purchase
6. **View Profile** and manage your information

### For Sellers
1. **Register/Login** to create an account
2. **Navigate to Sell Item** from the menu
3. **Fill in Item Details** - title, description, price, condition
4. **Post Item** to list on the platform
5. **Manage Items** - view and delete your listings in "My Items"

## Categories

- 🚗 Cars
- 🏍️ Bikes
- 📱 Electronics
- 🪑 Furniture
- 👕 Clothing
- 📚 Books
- Other

## Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Image upload functionality
- [ ] User reviews and ratings
- [ ] Favorites/Wishlist
- [ ] Advanced search filters
- [ ] Real-time notifications
- [ ] Chat between buyers and sellers
- [ ] Email verification
- [ ] Admin dashboard
- [ ] Mobile app

## Database Models

### User
```
- name (String)
- email (String, unique)
- password (String)
- phone (String)
- address (String)
- city (String)
- state (String)
- zipcode (String)
- createdAt (Date)
- updatedAt (Date)
```

### Item
```
- title (String)
- description (String)
- category (String)
- price (Number)
- originalPrice (Number)
- condition (String)
- location (String)
- seller (Reference to User)
- images (Array)
- status (String) - Available/Sold/Pending
- views (Number)
- featured (Boolean)
- createdAt (Date)
- updatedAt (Date)
```

### Cart
```
- user (Reference to User)
- items (Array of Items)
- totalPrice (Number)
- createdAt (Date)
- updatedAt (Date)
```

## Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/ecommerce-portal
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## Error Handling

The application includes basic error handling. For production use, implement:
- Comprehensive error logging
- Error tracking services
- Proper HTTP status codes
- User-friendly error messages

## Security Considerations

- Change the JWT_SECRET in production
- Use HTTPS in production
- Implement rate limiting
- Sanitize user inputs
- Use environment variables for sensitive data
- Implement CORS properly for production

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in .env
- Verify MongoDB is accessible

### Port Already in Use
- Change PORT in .env
- Or kill the process using the port

### Styles Not Loading
- Clear browser cache
- Check CSS file path in HTML

## License

MIT License - feel free to use this project for learning and development.

## Support

For questions or issues, please check:
1. Console errors in browser DevTools
2. Server logs in terminal
3. MongoDB connection status

---

**Built with ❤️ using Node.js, Express, and MongoDB**
