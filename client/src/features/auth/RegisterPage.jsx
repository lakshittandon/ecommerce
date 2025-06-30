import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/authApi";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "./authSlice";
import formStyles from "../../components/form.module.css";

const Schema = Yup.object({
  name:     Yup.string().min(3, "Too short").required("Required"),
  email:    Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSuccess = (user) => {
    dispatch(setUser(user));
    navigate("/", { replace: true });
  };

  return (
    <main className="container" style={{ maxWidth: 420, paddingTop: "2rem" }}>
      <h1>Register</h1>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={Schema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const { user } = await register(values).unwrap();
            handleSuccess(user);
          } catch (err) {
            setFieldError("email", err?.data?.message || "Register failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={formStyles.form}>
            <div className={formStyles.field}>
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" />
              <ErrorMessage name="name" component="span" style={{ color: "red" }} />
            </div>

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
              {isLoading ? "Creating…": "Create account"}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}