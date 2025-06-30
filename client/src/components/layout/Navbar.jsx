import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useLogoutMutation } from "../../api/authApi";
import { clearUser } from "../../features/auth/authSlice";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { isAuth } = useAppSelector((s) => s.auth);
  const cartQty = useAppSelector((s) =>
    s.cart.items.reduce((n, i) => n + i.quantity, 0)
  );
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (_) {
      /* ignore backend failure */
    }
    dispatch(clearUser());
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navWrap}>
        <Link to="/" className={styles.brand}>
          ShopEZ
        </Link>
        <div className={styles.links}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Cart{cartQty > 0 && <span className={styles.badge}>{cartQty}</span>}
          </NavLink>
          {isAuth ? (
            <button onClick={handleLogout} className={styles.btnLink}>
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}