import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");

  const getCart = async () => {
    try {
      const response = await fetch(
        "https://e-commerce-app-v9zz.onrender.com/api/cart",
        {
          headers: {
            Authorization: token
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setCart(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // Place order
  const placeOrder = async () => {
    try {
      const response = await fetch(
        "https://e-commerce-app-v9zz.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            Authorization: token
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Order placed successfully!");

      getCart();
    } catch (error) {
      console.log("Order error:", error);
      alert("Something went wrong");
    }
  };

  // Remove item
  const removeItem = async (productId) => {
    try {
      const response = await fetch(
        `https://e-commerce-app-v9zz.onrender.com/api/cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      getCart();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Update quantity
  const updateQuantity = async (id, quantity) => {
    try {
      const response = await fetch(
        `https://e-commerce-app-v9zz.onrender.com/api/cart/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          body: JSON.stringify({
            quantity: Number(quantity)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      getCart();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <div className="page-title">
        <p className="small-title">
          YOUR SHOPPING BAG
        </p>

        <h1>My Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>

          <p>
            Add some products to your cart.
          </p>
        </div>
      ) : (
        <div className="cart-layout">

          <div className="cart-items">

            {cart.map((item) => (
              <div
                className="cart-item"
                key={item._id}
              >

                <div className="cart-image">

                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                    />
                  ) : (
                    <div className="no-image">
                      No Image
                    </div>
                  )}

                </div>

                <div className="cart-info">

                  <p className="category">
                    {item.product.category}
                  </p>

                  <h3>
                    {item.product.name}
                  </h3>

                  <p className="cart-price">
                    ₹{item.product.price}
                  </p>

                  <div className="quantity">

                    <label>
                      Quantity:
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item._id,
                          e.target.value
                        )
                      }
                    />

                  </div>

                  <button
                    onClick={() =>
                      removeItem(
                        item.product._id
                      )
                    }
                    className="remove-button"
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">

              <span>Items</span>

              <span>
                {cart.length}
              </span>

            </div>

            <div className="summary-row total-row">

              <span>Total</span>

              <span>
                ₹{total}
              </span>

            </div>

            <button
              className="main-button"
              onClick={placeOrder}
            >
              Checkout
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;