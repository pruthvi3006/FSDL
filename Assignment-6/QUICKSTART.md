# Quick Start Guide - SecondHand E-Commerce Portal

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd ecommerce-portal
npm install
```

### Step 2: Start MongoDB
```bash
# If MongoDB is installed locally
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with your connection string
```

### Step 3: Start the Server
```bash
npm start
```

### Step 4: Open in Browser
```
http://localhost:5000
```

---

## 🧪 Testing the Application

### Create Test Account
1. Click **Login** in navigation
2. Click **Register** tab
3. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Phone: 9876543210
4. Click **Register**

### Post an Item (as Seller)
1. Click **Sell Item** menu
2. Fill in item details:
   - Title: 2015 Honda Civic
   - Description: Great condition, well maintained
   - Category: Car
   - Price: 500000
   - Condition: Good
   - Location: Delhi
3. Click **Post Item**

### Browse and Buy Items
1. Click **Browse Items**
2. Use filters to search
3. Click on any item to view details
4. Click **Add to Cart**
5. Click **🛒 Cart** in navigation
6. Click **Proceed to Checkout**

### Manage Profile
1. Click **👤 Profile** in navigation
2. Update your information
3. Click **Update Profile**

### View Your Items
1. Click **Sell Item** → My Items
2. See all your posted items
3. Edit or delete items

---

## 📁 Project Files Overview

### Backend Routes
- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/items` - Browse all items
- `/api/items/:id` - Get item details
- `/api/cart` - Shopping cart operations

### Frontend Pages
- `/` - Home page
- `/items` - Browse items
- `/item-detail?id=xxx` - Item details
- `/sell` - Post new item
- `/my-items` - Manage your items
- `/cart` - Shopping cart
- `/profile` - User profile
- `/login` - Login/Register

### Frontend Scripts
- `app.js` - Core functionality
- `items.js` - Items listing page
- `item-detail.js` - Item details
- `sell.js` - Sell item form
- `my-items.js` - User's items
- `cart.js` - Cart operations
- `profile.js` - User profile
- `auth.js` - Login/Register

---

## 🎨 Customization

### Change Theme Colors
Edit `/public/css/style.css`:
```css
:root {
  --primary-color: #2563eb;      /* Blue */
  --secondary-color: #f97316;    /* Orange */
  --dark-color: #1f2937;         /* Dark */
  --light-color: #f3f4f6;        /* Light */
}
```

### Modify Item Categories
Edit `/models/Item.js` and frontend forms to add/remove categories

### Change Company Name
Replace "SecondHand" with your brand name in:
- HTML files (title, logo)
- CSS if needed

---

## 🔧 Database Sample Data

### Insert Sample Data (Optional)
Open MongoDB client and run:

```javascript
// Create users
db.users.insertMany([
  {
    name: "John Seller",
    email: "seller@test.com",
    password: "hashed_password",
    phone: "9876543210",
    city: "Delhi",
    state: "Delhi"
  }
]);

// Create items
db.items.insertMany([
  {
    title: "Toyota Fortuner 2018",
    description: "Excellent condition, regular maintenance",
    category: "Car",
    price: 1200000,
    condition: "Good",
    location: "Delhi",
    seller: ObjectId("seller_id"),
    status: "Available",
    views: 15
  }
]);
```

---

## 📱 Responsive Design

The application is fully responsive:
- **Desktop** (1024px+) - Full layout with sidebar filters
- **Tablet** (768px-1024px) - Adjusted grid and sidebar
- **Mobile** (< 768px) - Single column, optimized touch targets

Test responsiveness:
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Select different devices

---

## 🚀 Deployment Ready

To deploy to production:

1. **Set Environment Variables**
   ```
   NODE_ENV=production
   MONGODB_URI=your_production_db
   JWT_SECRET=strong_random_secret
   ```

2. **Install Production Dependencies Only**
   ```bash
   npm install --production
   ```

3. **Use Process Manager**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "ecommerce"
   ```

4. **Set Up Reverse Proxy** (Nginx/Apache)
   - Forward requests to localhost:5000

---

## ❓ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "MongoDB connection failed" | Ensure mongod is running, check URI in .env |
| "Port 5000 in use" | Change PORT in .env or kill process: `lsof -ti:5000 \| xargs kill` |
| "Styles not loading" | Clear cache (Ctrl+Shift+Delete), hard refresh (Ctrl+Shift+R) |
| "CORS error" | Check server.js CORS settings, ensure correct API URL in app.js |
| "Items not showing" | Verify MongoDB is running, check network tab in DevTools |

---

## 📞 Need Help?

1. Check browser console for errors (F12 → Console)
2. Check server terminal for backend errors
3. Verify MongoDB connection
4. Review README.md for detailed documentation

---

## 🎓 Learning Resources

- **Node.js**: https://nodejs.org/docs
- **Express**: https://expressjs.com
- **MongoDB**: https://docs.mongodb.com
- **Mongoose**: https://mongoosejs.com
- **JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

**Happy coding! 🚀**
