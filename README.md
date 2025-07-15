# Inventory Management System

A modern, responsive inventory management application built with React and Django REST Framework. This system provides comprehensive product management, real-time stock monitoring, and detailed analytics with an intuitive user interface.

## 🚀 Features

### 📦 Product Management
- **Product Listing**: Browse all products with advanced search and filtering capabilities
- **Product Details**: View detailed information for each product
- **Low Stock Alerts**: Automatic notifications for products running low on stock
- **Out of Stock Tracking**: Monitor products that are currently unavailable
- **Product Transactions**: Track all product movement and transaction history

### 📊 Analytics & Reporting
- **Category Statistics**: Interactive bar charts showing product distribution across categories
- **Stock Status Overview**: Pie charts visualizing available, unavailable, and low-stock products

### 🎨 User Experience
- **Dark/Light Mode**: Seamless theme switching for comfortable viewing
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Toast Notifications**: Real-time feedback for user actions
- **Advanced Search**: Powerful filtering and search capabilities

### 🔔 Smart Notifications
- **Low Stock Notifier**: Automatic alerts when products reach minimum stock levels
- **Real-time Updates**: Instant notifications for inventory changes
- **Notification Center**: Centralized hub for all system notifications

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing for single-page application
- **TanStack Query**: Server state management and data fetching
- **Tailwind CSS**: Utility-first CSS framework
- **React Toastify**: Toast notifications
- **Recharts**: Interactive charts and data visualization

### Backend
- **Django REST Framework**: RESTful API backend
- **Real-time Data**: Live inventory updates

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DeebHajjar/react-inventory-ms.git
   cd react-inventory-ms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Query Client Configuration
The app uses TanStack Query with optimized settings:
- **Stale Time**: 5 minutes
- **Retry Logic**: Smart retry with exponential backoff
- **Window Focus Refetch**: Disabled for better performance

## 📖 Usage

### Navigation
- **Dashboard** (`/`): Overview of inventory statistics and key metrics
- **Products** (`/products`): Main product listing with search and filters
- **Categories** (`/categories`): Product category management
- **Transactions** (`/transactions`): Complete transaction history
- **Low Stock** (`/low-stock`): Products requiring attention
- **Out of Stock** (`/out-of-stock`): Currently unavailable products
- **Notifications** (`/notifications`): System alerts and updates

### Key Features Usage

#### Product Search & Filtering
- Use the search bar to find products by name, SKU, or description
- Apply filters by category, stock status, and price range
- Sort results by various criteria

#### Stock Management
- Monitor stock levels in real-time
- Receive automatic alerts for low stock items
- Track product movement through transaction history

#### Analytics Dashboard
- View category distribution charts
- Monitor stock status with pie charts
- Access real-time inventory metrics

## 🎨 Theming

The application supports both light and dark themes:
- Toggle between themes using the theme switcher
- Preferences are saved automatically
- Consistent design across all components

## 🔧 API Integration

The frontend communicates with a Django REST Framework backend:
- RESTful API endpoints for all operations
- Real-time data synchronization
- Optimized query patterns with TanStack Query

## 🚀 Performance Features

- **Code Splitting**: Lazy loading for optimal performance
- **Caching Strategy**: Intelligent data caching with TanStack Query
- **Optimized Bundle**: Minimized production build
- **Real-time Updates**: Efficient data synchronization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🛟 Support

For support and questions:
- Create an issue in the repository
- Contact me in deebhajjar04@gmail.com
- Check the documentation

**Built with ❤️ using React and Django REST Framework**
