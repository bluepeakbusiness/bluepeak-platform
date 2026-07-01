import { useState } from "react";
import { askCEO } from "../services/api";

export default function CEO() {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateReport() {
    setLoading(true);

    const data = await askCEO(
      "Review today's business and tell me the top three priorities."
    );

    setReport(data.reply || JSON.stringify(data, null, 2));
    setLoading(false);
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>👨‍💼 AI CEO</h1>

      <button
        onClick={generateReport}
        style={{
          padding: 15,
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          cursor: "pointer"
        }}
      >
        Generate CEO Report
      </button>

      {loading && <h3>Thinking...</h3>}

      <pre
        style={{
          marginTop: 20,
          whiteSpace: "pre-wrap",
          background: "#111827",
          color: "#fff",
          padding: 20,
          borderRadius: 12
        }}
      >
        {report}
      </pre>
    </div>
  );
}