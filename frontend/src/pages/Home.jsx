import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Home() {
  const [content, setContent] = useState("");
  const [expire, setExpire] = useState("");
  const [views, setViews] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const submitPaste = async () => {
    if (!content.trim()) {
      toast.error("Paste content is required");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/api/pastes", {
        content,
        expireInMinutes: expire || undefined,
        maxViews: views || undefined,
      });

      setLink(res.data.url);
      toast.success("Paste created!");
    } catch {
      toast.error("Failed to create paste");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>📋 Pastebin Lite</h1>
        <p style={styles.subtitle}>Create & share text instantly</p>

        <textarea
          placeholder="Paste your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />

        <div style={styles.inputs}>
          <input
            type="number"
            placeholder="Expire (minutes)"
            value={expire}
            onChange={(e) => setExpire(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
        </div>

        <button
          style={styles.button}
          onClick={submitPaste}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Paste"}
        </button>

        {link && (
          <div style={styles.linkBox}>
            <input value={link} readOnly />
            <button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Link copied");
              }}
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f7fb",
    padding: "16px",
    fontFamily: "Inter, Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "640px",
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    marginBottom: "4px",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "16px",
  },
  textarea: {
    width: "100%",
    minHeight: "180px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    resize: "vertical",
    marginBottom: "12px",
  },
  inputs: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
  },
  linkBox: {
    display: "flex",
    gap: "8px",
    marginTop: "14px",
  },
};
