//feature-1
import React, { setState } from "react";
import "./App.css";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

  sortProducts = (e) => {
    console.log(e.target.value);
    const sort = e.target.value
    this.setState((state) => ({
          sort: sort,
          products: this.state.products.slice().sort((a,b) =>(
            sort === "lowest" ?
            ((a.price > b.price) ? 1:-1):
            sort === "hightes" ?
            ((a.price < b.price) ? 1:-1):
            ((a._id < b.price) ? 1:-1)

          ))
    }))
      };

  filterProducts = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      this.setState({ size: e.target.value, product: data.products });
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };
  render() {
    return (
      <div className="grid-container">
        <header className="header">
          <a href="/">React Shoping Cart</a>
        </header>
        <main className="main">
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer className="footer">All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
