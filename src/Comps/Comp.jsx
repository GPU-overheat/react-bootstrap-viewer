import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Comp() {
  const [product, setProduct] = useState(null);
  const [itemId, setItemId] = useState(1);

  useEffect(() => {
    if (itemId > 0) {
      setProduct(null);
      fetch(`https://fakestoreapi.com/products/${itemId}`) //this is a free API
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [itemId]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      setItemId((prevItemId) => Math.max(prevItemId - 1, 1)); 
    } else if (event.key === "ArrowRight") {
      setItemId((prevItemId) => Math.min(prevItemId + 1, 20));
       // the api only have 20 items in the object. might be changed to something like products.length
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container my-5" style={{ height: "700px" }}>
      <div className="position-relative" style={{ height: "100%" }}>
        {/* Left Button */}
        <button
          className="btn btn-primary position-absolute top-50 start-0 translate-middle-y"
          onClick={() => setItemId((c) => c - 1)}
          disabled={itemId <= 1}
          style={{ zIndex: 10 }}
        >
          &lt;
        </button>

        {/* Right Button */}
        <button
          className="btn btn-primary position-absolute top-50 end-0 translate-middle-y"
          onClick={() => setItemId((c) => c + 1)}
          disabled={itemId >= 20}
          style={{ zIndex: 10 }}
        >
          &gt;
        </button>

        {product ? (
          <div
            className="card shadow-sm align-items-center d-flex"
            style={{ height: "100%" }}
          >
            <div
              className="card-img-top mt-3"
              style={{
                width: "400px",
                height: "400px",
                backgroundColor: "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: product.image ? "block" : "none",
                  opacity: product.image ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
              />
              {!product.image && (
                <span
                  style={{
                    fontSize: "24px",
                    color: "#555",
                    fontWeight: "bold",
                    textAlign: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  Loading...
                </span>
              )}
            </div>
            <div className="card-body text-center">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text text-muted">{product.category}</p>
              <p className="card-text h5">${product.price}</p>
              <p className="card-text">{product.description}</p>
              <p className="card-text">
                <small className="text-muted">
                  Rating: {product.rating.rate} / 5 - ({product.rating.count}{" "}
                  reviews)
                </small>
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
