
import { useState } from "react";
import "./App.css";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  emoji: string;
};

const products: Product[] = [
  { id: 1, name: "Floral Summer Dress", category: "Women", price: 1499, emoji: "👗" },
  { id: 2, name: "Men Casual Shirt", category: "Men", price: 999, emoji: "👕" },
  { id: 3, name: "Running Shoes", category: "Footwear", price: 1999, emoji: "👟" },
  { id: 4, name: "Leather Handbag", category: "Accessories", price: 1799, emoji: "👜" },
  { id: 5, name: "Stylish Sunglasses", category: "Accessories", price: 699, emoji: "🕶️" },
  { id: 6, name: "Denim Jacket", category: "Women", price: 2299, emoji: "🧥" },
];

function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>StyleCart</h1>
        <p>E-Commerce Website</p>
      </header>

      <section className="hero">
        <h2>Shop Smart. Look Better.</h2>
        <p>Search, filter, add to cart, and calculate total price.</p>
      </section>

      <div className="filters">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Footwear">Footwear</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <main className="main">
        <section className="products">
          {filteredProducts.length === 0 ? (
            <p className="empty">No products found</p>
          ) : (
            filteredProducts.map((product) => (
              <div className="card" key={product.id}>
                <div className="emoji">{product.emoji}</div>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <h4>₹{product.price}</h4>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))
          )}
        </section>

        <aside className="cart">
          <h2>Shopping Cart</h2>

          {cart.length === 0 ? (
            <p className="empty">No items added</p>
          ) : (
            cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <span>{item.name}</span>
                <strong>₹{item.price}</strong>
                <button onClick={() => removeFromCart(index)}>X</button>
              </div>
            ))
          )}

          <h3>Total: ₹{total}</h3>
        </aside>
      </main>
    </div>
  );
}

export default App;
