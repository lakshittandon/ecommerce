// src/features/auth/LoginPage.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../../api/authApi";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "./authSlice";
import formStyles from "../../components/form.module.css";

const LoginSchema = Yup.object({
  email:    Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

export default function LoginPage() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const dispatch  = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const getRedirect = (user) => {
    const from = location.state?.from?.pathname;
    if (from) return from;
    return user.role === "admin" ? "/admin/products" : "/";
  };

  return (
    <main className="container" style={{ maxWidth: 420, paddingTop: "2rem" }}>
      <h1>Login</h1>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const { user } = await login(values).unwrap();
            dispatch(setUser(user));
            navigate(getRedirect(user), { replace: true });
          } catch (err) {
            setFieldError("email", err?.data?.message || "Login failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={formStyles.form}>
            <div className={formStyles.field}>
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" />
              <ErrorMessage name="email" component="span" style={{ color: "red" }} />
            </div>

            <div className={formStyles.field}>
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage name="password" component="span" style={{ color: "red" }} />
            </div>

            <button type="submit" disabled={isSubmitting || isLoading}>
              {isLoading ? "Logging in…" : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}