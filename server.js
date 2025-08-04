// server.js
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send('Hello from Express API!');
});


app.use(cors());

const baseItems = [
  {
    name: 'Apple iPhone 14',
    description: '6.1-inch display, A15 Bionic chip, dual-camera system.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1664285793603-07ec9ebbee77?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Samsung Galaxy S23',
    description: '6.1-inch AMOLED, Snapdragon 8 Gen 2, triple-camera setup.',
    price: 749.99,
    image: 'https://images.unsplash.com/photo-1678209127474-f0aa9e7d6b41?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Wireless noise-canceling headphones with 30-hour battery life.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1615379729776-311f6e0c17a9?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'MacBook Air M2',
    description: '13.6-inch Retina display, 8-core CPU, fanless design.',
    price: 1099.00,
    image: 'https://images.unsplash.com/photo-1580894894513-fc1e8214ba1e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'Advanced ergonomic mouse with ultra-fast scrolling.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Nintendo Switch OLED',
    description: '7-inch OLED screen, enhanced audio, 64GB storage.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1623704074735-b10d3fd079c2?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Dell XPS 13 Plus',
    description: '13.4-inch InfinityEdge display, Intel Core i7, minimalist design.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=80'
  }
];

// Generate 60 more items
const adjectives = ['Ultra', 'Smart', 'Compact', 'High-End', 'Eco', 'Wireless', 'Bluetooth', '4K', 'Gaming', 'Ergonomic'];
const products = ['Laptop', 'Tablet', 'Monitor', 'Headphones', 'Speaker', 'Camera', 'Mouse', 'Keyboard', 'Phone', 'Projector'];

function generateItem(index) {
  const name = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${products[Math.floor(Math.random() * products.length)]} ${index + 1}`;
  const description = `${name} with cutting-edge technology and superior performance.`;
  const price = +(Math.random() * (2000 - 50) + 50).toFixed(2);
  const image = `https://example.com/images/item${index + 1}.jpg`;
  return { name, description, price, image };
}

const extraItems = Array.from({ length: 100 }, (_, i) => generateItem(i));
const allItems = [...baseItems, ...extraItems];

app.get('/api/items', (req, res) => {
  const { query, offset = 0, limit = 10 } = req.query;
  const q = query?.toLowerCase() || "";
//   const offset = parseInt(req.query.offset || 0);
//   const limit = parseInt(req.query.limit || 10);
//   const pagedItems = allItems.slice(offset, offset + limit);
//   res.json(pagedItems);
    
    const filtered = allItems.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.price.toString().includes(q)
    );

  const paged = filtered.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  res.json(paged);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
