import React from "react";
import { useGetProductsQuery } from "../../api/productApi";
import Loader from "../../components/common/Loader.jsx";
import ProductCard from "./ProductCard";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  // local UI state
  const [keyword, setKeyword] = React.useState("");
  const [page, setPage]       = React.useState(1);

  // fetch products – backend already supports ?keyword & ?page
  const { data, isLoading, error } = useGetProductsQuery(
    { keyword, page }
  );

  // helpers
  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setPage(1);               // reset to first page on new search
  };

  // loading & error
  if (isLoading) return <Loader />;
  if (error)     return <p style={{ textAlign: "center" }}>Failed to load.</p>;

  // result list
  const products = data.products;
  const showNext = products.length === 8;   // 8 per page on backend

  return (
    <main className="container" style={{ paddingTop: "1.5rem" }}>
      <input
        className={styles.search}
        placeholder="Search products…"
        value={keyword}
        onChange={handleSearch}
      />

      <h1>Products</h1>

      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      <div className={styles.pager}>
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>
        <span>Page&nbsp;{page}</span>
        <button
          disabled={!showNext}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </main>
  );
}