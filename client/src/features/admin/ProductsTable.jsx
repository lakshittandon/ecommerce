import React from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../api/productApi";
import Loader from "../../components/common/Loader.jsx";
import ProductForm from "./ProductForm";
import styles from "./ProductsTable.module.css";

export default function ProductsTable() {
  const [page, setPage] = React.useState(1);

  // fetch paginated products (default 8 per page)
  const {
    data = { products: [] },
    isLoading,
    isError,
  } = useGetProductsQuery({ page });

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [editing, setEditing] = React.useState(null);

  if (isLoading) return <Loader />;
  if (isError) return <p style={{ textAlign: "center" }}>Failed to load products.</p>;

  const products = data.products;
  const pageSize = 8; // backend default
  const hasNext = products.length === pageSize;

  const startCreate = () =>
    setEditing({ name: "", price: 0, category: "", description: "", stock: 1, imageUrl: "" });
  const startEdit = (p) =>
    setEditing({ ...p, imageUrl: p.images?.[0]?.url || "" });

  const handleSave = async (vals, { setSubmitting }) => {
    const body = {
      name: vals.name,
      price: vals.price,
      category: vals.category,
      description: vals.description,
      stock: vals.stock,
      images: [{ public_id: "manual", url: vals.imageUrl }],
    };
    try {
      if (editing?._id) {
        await updateProduct({ id: editing._id, ...body }).unwrap();
      } else {
        await createProduct(body).unwrap();
      }
      setEditing(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <button onClick={startCreate} className={styles.newBtn}>➕ New product</button>

      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p._id.slice(-6)}</td>
                <td>{p.name}</td>
                <td align="right">₹{p.price.toLocaleString()}</td>
                <td align="right">{p.stock}</td>
                <td>
                  <button onClick={() => startEdit(p)}>Edit</button>
                  <button
                    onClick={() => window.confirm("Delete product?") && deleteProduct(p._id)}
                    style={{ marginLeft: 8 }}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pager}>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>Page {page}</span>
        <button disabled={!hasNext} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>

      {editing && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalCard}>
            <ProductForm
              initial={editing}
              onCancel={() => setEditing(null)}
              onSubmit={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
}