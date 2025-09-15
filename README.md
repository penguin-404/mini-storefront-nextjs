# Storify - Your online shop

A modern, responsive e-commerce storefront built with Next.js and Tailwind CSS. This project demonstrates key concepts of a single-page application, including state management, data fetching, and component-based architecture.

***

## How to Run the Project

Follow these steps to get the project up and running on your local machine.

### Prerequisites

* Node.js (version 18 or higher)
* npm or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/penguin-404/mini-storefront-nextjs.git](https://github.com/penguin-404/mini-storefront-nextjs.git)
    ```
2.  Navigate into the project directory:
    ```bash
    cd mini-storefront-nextjs
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

# Project Architecture, Flow, and Trade-offs
## Architecture and Data Flow

The project uses Next.js's App Router for routing and a component-based structure to promote reusability.
The overall flow can be broken down into these steps:

### Data Fetching and State Initialization

1. When the application loads, the FilterContext is initialized.

2. A useEffect hook within FilterContext calls a client-side API to fetch all product data.

3. The fetched products and unique categories are then stored in the global state.

### Displaying the Catalogue

1. The CataloguePage component uses the useFilters hook to access the product data and filter states from the FilterContext.

2. A useMemo hook filters and sorts the products based on the current search query, category, price range, and sort order.

3. This filtered data is then passed to ProductCard components for display.

### User Interaction

1. The Header component contains the global search bar, connected to the search state in FilterContext via the useFilters hook.

2. Typing in the search bar updates the global state, automatically re-rendering the CataloguePage with filtered results.

3. The Navbar component also updates global state through its filter controls.

### Stock Management

1. The stock property of each product is a simple representation of inventory.

2. In the ProductDetailPage, the Add to Cart button is disabled if product.stock is 0.

3. This is a client-side implementation for demonstration purposes.

### Cart Management

1. The CartContext manages the state of the user's shopping cart.

2. When a user clicks Add to Cart, the addToCart function from CartContext is called, adding the item to the cart.

3. The Header component uses the useCart hook to display the total item count in the cart icon badge.

### Trade-offs and Known Issues  

1. **All Data Loaded at Once**  
   - The app loads all products into the browser for faster searching and filtering.  
   - This works well for small/medium product lists but may slow down with very large catalogs.  

2. **Long Text Overflow**  
   - Some product names or descriptions may be too long and overflow on small screens.   

3. **Basic Stock System**  
   - Stock is only managed on the client side (in your browser).  
   - It doesn’t save across sessions or reflect real inventory like a true backend system would.  

