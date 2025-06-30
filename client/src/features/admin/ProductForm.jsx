import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Schema = Yup.object({
  name: Yup.string().required(),
  price: Yup.number().positive().required(),
  category: Yup.string().required(),
  description: Yup.string().required(),
  imageUrl: Yup.string().url().required("Image URL is required"),
  stock: Yup.number().integer().min(0).required(),
});

export default function ProductForm({ initial, onSubmit, onCancel }) {
  return (
    <Formik
      initialValues={initial}
      validationSchema={Schema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors }) => (
        <Form className="adm-form">
          <label>Name</label>
          <Field name="name" />
            <br />
          <label>Price</label>
          <Field name="price" type="number" />
            <br />
          <label>Category</label>
          <Field name="category" />
            <br />
          <label>Stock</label>
          <Field name="stock" type="number" />
            <br />
          <label>Description</label>
          <Field as="textarea" name="description" rows={3} />
            <br />
          <label>Image URL</label>
          <Field name="imageUrl" />
          {errors.imageUrl && <span style={{ color: "red" }}>{errors.imageUrl}</span>}

          <div className="adm-actions">
            <button type="submit" disabled={isSubmitting}>Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}