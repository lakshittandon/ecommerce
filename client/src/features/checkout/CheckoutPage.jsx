// src/features/checkout/CheckoutPage.jsx
import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { clearCart } from "../cart/cartSlice";
import { useNewOrderMutation } from "../../api/orderApi";
import formStyles from "../../components/form.module.css";

export default function CheckoutPage() {
  const cartItems = useAppSelector((s) => s.cart.items);
  const dispatch  = useAppDispatch();
  const navigate  = useNavigate();
  const [newOrder, { isLoading }] = useNewOrderMutation();

  if (cartItems.length === 0) {
    return (
      <main className="container" style={{ paddingTop: "2rem", textAlign: "center" }}>
        <h2>No items in cart.</h2>
      </main>
    );
  }

  const itemsPrice    = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingPrice = itemsPrice > 1000 ? 0 : 50;
  const taxPrice      = Math.round(itemsPrice * 0.12);
  const totalPrice    = itemsPrice + shippingPrice + taxPrice;

  return (
    <main className="container" style={{ maxWidth: 640, paddingTop: "2rem" }}>
      <h1>Checkout</h1>

      <Formik
        initialValues={{
          address: "",
          city: "",
          state: "",
          country: "India",
          pinCode: "",
          phoneNo: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await newOrder({
              shippingInfo: values,
              orderItems: cartItems.map(c => ({
                name: c.name,
                quantity: c.quantity,
                price: c.price,
                image: c.image,
                product: c.productId,
              })),
              paymentInfo: { id: "mock", status: "Paid" },
              itemsPrice,
              taxPrice,
              shippingPrice,
              totalPrice,
            }).unwrap();

            dispatch(clearCart());
            navigate("/orders", { replace: true });
          } catch (err) {
            alert(err?.data?.message || "Order failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={formStyles.form}>
            {[
              ["Address", "address"],
              ["City", "city"],
              ["State", "state"],
              ["Country", "country"],
              ["Pincode", "pinCode"],
              ["Phone No.", "phoneNo"],
            ].map(([label, name]) => (
              <div key={name} className={formStyles.field}>
                <label htmlFor={name}>{label}</label>
                <Field id={name} name={name} />
              </div>
            ))}

            <hr />

            <p>Items: ₹{itemsPrice.toLocaleString()}</p>
            <p>Tax: ₹{taxPrice.toLocaleString()}</p>
            <p>Shipping: ₹{shippingPrice.toLocaleString()}</p>
            <h2>Total: ₹{totalPrice.toLocaleString()}</h2>

            <button type="submit" disabled={isSubmitting || isLoading}>
              {isLoading ? "Placing order…" : "Place Order"}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}