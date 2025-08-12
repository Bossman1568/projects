# Ghana Mall - E-commerce Platform

A comprehensive e-commerce platform for authentic Ghanaian products with full backend API, user authentication, and CRUD operations.

## Features

### Frontend
- Responsive design with modern UI/UX
- Product catalog with search and filtering
- Shopping cart functionality
- User authentication (login/register)
- Product reviews and ratings
- Wishlist functionality
- Order tracking
- Payment integration (Paystack)

### Backend API
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT-based authentication
- Role-based access control (User, Vendor, Admin)
- Complete CRUD operations for all entities
- File upload support
- Input validation and sanitization
- Rate limiting and security middleware
- Comprehensive error handling

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Font Awesome icons
- Responsive design

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
- multer for file uploads
- helmet for security
- cors for cross-origin requests

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ghana-mall
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/ghana_mall
   
   # JWT
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   
   # Server
   PORT=3000
   NODE_ENV=development
   
   # Paystack (optional)
   PAYSTACK_SECRET_KEY=your_paystack_secret_key
   PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+233123456789"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?page=1&limit=12&category=fabrics&search=kente
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product (Admin/Vendor)
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Kente Cloth",
  "description": "Authentic handwoven Kente cloth",
  "price": 250.00,
  "category": "category_id",
  "stock": 10,
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "alt": "Kente cloth",
      "isPrimary": true
    }
  ]
}
```

#### Update Product
```http
PUT /api/products/:id
Authorization: Bearer <token>
```

#### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "product": "product_id",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address1": "123 Main St",
    "city": "Accra",
    "region": "Greater Accra"
  },
  "paymentMethod": "paystack"
}
```

#### Get User Orders
```http
GET /api/orders
Authorization: Bearer <token>
```

#### Update Order Status (Admin)
```http
PUT /api/orders/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "shipped",
  "note": "Order shipped via DHL",
  "trackingNumber": "DHL123456789"
}
```

### Category Endpoints

#### Get All Categories
```http
GET /api/categories?tree=true&withProductCount=true
```

#### Create Category (Admin)
```http
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Traditional Fabrics",
  "description": "Authentic Ghanaian fabrics",
  "icon": "fas fa-tshirt"
}
```

### User Management Endpoints (Admin)

#### Get All Users
```http
GET /api/users?page=1&limit=20&role=user
Authorization: Bearer <token>
```

#### Update User
```http
PUT /api/users/:id
Authorization: Bearer <token>
```

## Database Schema

### User Model
- name, email, password (hashed)
- role (user, vendor, admin)
- address, phone, avatar
- wishlist, order history
- account status and verification

### Product Model
- name, description, price, images
- category, stock, SKU
- reviews and ratings
- vendor information
- SEO metadata

### Order Model
- user, items, pricing
- shipping and billing addresses
- payment information
- status tracking
- refund handling

### Category Model
- hierarchical structure
- SEO optimization
- product count tracking

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet security headers
- Role-based access control

## File Structure

```
ghana-mall/
├── models/           # Database models
├── routes/           # API routes
├── middleware/       # Custom middleware
├── uploads/          # File uploads
├── server.js         # Main server file
├── index.html        # Frontend
├── script.js         # Frontend JavaScript
├── style.css         # Frontend styles
└── package.json      # Dependencies
```

## Development

### Adding New Features

1. **Database Models**: Add new models in the `models/` directory
2. **API Routes**: Create new routes in the `routes/` directory
3. **Middleware**: Add custom middleware in the `middleware/` directory
4. **Frontend**: Update HTML, CSS, and JavaScript files

### Testing

```bash
# Run tests (when implemented)
npm test

# Check API health
curl http://localhost:3000/api/health
```

### Deployment

1. **Environment Variables**: Set production environment variables
2. **Database**: Use MongoDB Atlas or similar cloud database
3. **Server**: Deploy to Heroku, DigitalOcean, or similar platform
4. **Domain**: Configure custom domain and SSL certificate

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@ghanamall.com or create an issue in the repository.