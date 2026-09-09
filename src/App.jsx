import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [memos, setMemos] = useState([]);   // 메모 목록 상태
  const [text, setText] = useState("");     // 입력창 상태

  // 1. 함수들을 useEffect보다 먼저 정의 (호이스팅 에러 예방)
  const loadMemos = async () => {
    try {
      const res = await fetch(`${API_URL}/memos`);
      const data = await res.json();
      setMemos(data);
    } catch (error) {
      console.error("메모 불러오기 실패:", error);
    }
  };

  const addMemo = async () => {
    if (!text.trim()) return;
    try {
      await fetch(`${API_URL}/memos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      setText("");
      loadMemos(); // 추가 후 목록 새로고침
    } catch (error) {
      console.error("메모 추가 실패:", error);
    }
  };

  const deleteMemo = async (id) => {
    try {
      await fetch(`${API_URL}/memos/${id}`, { method: "DELETE" });
      loadMemos(); // 삭제 후 목록 새로고침
    } catch (error) {
      console.error("메모 삭제 실패:", error);
    }
  };

  // 2. 마운트 시 1회만 메모 목록 로드
  useEffect(() => {
    loadMemos();
  }, []);

  // 3. 화면 UI 출력 (JSX return 추가)
  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>메모 앱</h1>

      {/* 메모 입력 영역 */}
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

      {/* 메모 목록 영역 */}
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