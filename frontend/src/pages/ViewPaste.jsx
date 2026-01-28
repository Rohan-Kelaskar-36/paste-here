import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [views, setViews] = useState(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await API.get(`/api/pastes/${id}`);
        setContent(res.data.content);
        setViews(res.data.views);
      } catch {
        setExpired(true);
        toast.error("Paste expired or not found");
      }
    };

    fetchPaste();
  }, [id]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>📄 Paste Content</h2>

        {expired ? (
          <p style={styles.expired}>This paste has expired.</p>
        ) : (
          <>
            <pre style={styles.pre}>{content}</pre>
            {views !== null && (
              <p style={styles.views}>
                👀 Views used: {views}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb",
    padding: "16px",
    fontFamily: "Inter, Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "700px",
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  pre: {
    background: "#0f172a",
    color: "#e5e7eb",
    padding: "16px",
    borderRadius: "8px",
    overflowX: "auto",
    fontSize: "14px",
  },
  views: {
    marginTop: "10px",
    color: "#555",
  },
  expired: {
    color: "#dc2626",
    fontWeight: "bold",
    marginTop: "20px",
  },
};
