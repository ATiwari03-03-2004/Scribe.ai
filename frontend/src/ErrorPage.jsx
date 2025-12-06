import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        color: "#444",
        backgroundColor: "#f7f8fa",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "10px", fontWeight: 600 }}>
        Oops!
      </h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
        Sorry, an unexpected error has occurred.
      </p>

      <p
        style={{
          fontStyle: "italic",
          color: "#777",
          fontSize: "1rem",
          background: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {error.statusText || error.message}
      </p>

      <button
        onClick={() => (window.location.href = "/")}
        style={{
          marginTop: "30px",
          padding: "10px 24px",
          background: "#1a73e8",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Go Home
      </button>
    </div>
  );
}
