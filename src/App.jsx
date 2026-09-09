import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [memos, setMemos] = useState([]);   // 메모 목록 상태
  const [text, setText] = useState("");     // 입력창 상태

  // 1. loadMemos 함수를 useEffect보다 먼저 선언합니다.
  const loadMemos = async () => {
    try {
      const res = await fetch(`${API_URL}/memos`);
      const data = await res.json();
      setMemos(data);
    } catch (error) {
      console.error("메모를 불러오는 중 오류 발생:", error);
    }
  };

  // 2. 선언된 loadMemos를 useEffect 내부에서 사용합니다.
  useEffect(() => {
    loadMemos();
  }, []);

  // 메모 추가 (POST)
  const addMemo = async () => {
    if (!text.trim()) return;
    try {
      await fetch(`${API_URL}/memos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      setText("");
      loadMemos();
    } catch (error) {
      console.error("메모 추가 중 오류 발생:", error);
    }
  };

  // 메모 삭제 (DELETE)
  const deleteMemo = async (id) => {
    try {
      await fetch(`${API_URL}/memos/${id}`, { method: "DELETE" });
      loadMemos();
    } catch (error) {
      console.error("메모 삭제 중 오류 발생:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>메모 앱</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="메모를 입력하세요..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={addMemo} style={{ padding: "8px 16px" }}>
          추가
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {memos.map((memo) => (
          <li
            key={memo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span>{memo.content}</span>
            <button onClick={() => deleteMemo(memo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}