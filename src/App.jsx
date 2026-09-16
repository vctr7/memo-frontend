import { useEffect, useRef, useState } from "react";
import "./App.css";
import profileImage from "./assets/profile.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const projects = [
  { number: "01", title: "Sound, learned differently", type: "Audio generation · WaveNet / WaveGAN", description: "시계열 데이터로 접근했던 ASMR 생성 문제를 오디오의 주기와 receptive field 관점에서 다시 정의했습니다. 모델을 바꾸고 구현을 목적에 맞게 변형해 식별 가능한 음원을 만들었습니다.", tags: ["Deep Learning", "Audio", "Research"] },
  { number: "02", title: "A more useful recommendation", type: "Media recommendation · doc2vec", description: "자연어 처리 기술을 활용해 미디어 간 유사도를 계산하고, 사용자가 다음 콘텐츠를 발견할 수 있는 추천 시스템 프로토타입을 제작했습니다.", tags: ["NLP", "Recommendation", "Prototype"] },
  { number: "03", title: "Ideas into something real", type: "Startup project · Receive", description: "인터넷 면세점 이용자에게 맞춤 할인정보를 제시하는 아이디어로 사업 준비부터 발표, 프로토타입 홈페이지 제작까지 창업 프로세스를 경험했습니다.", tags: ["Product", "Web", "Experiment"] },
];

const experiences = [
  ["2020", "NAVER · NOW Dev", "인턴", "음성합성 및 미디어 추천 프로토타입"],
  ["2018—20", "고전음악회", "회장", "운영, 홍보, 기획과 팀 커뮤니케이션"],
  ["2019", "하이버디 4기", "활동 우수자", "교환학생의 한국 생활 적응 지원"],
];

export default function App() {
  const [memos, setMemos] = useState([]);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [visitorCount, setVisitorCount] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "light");
  const hasRecordedVisit = useRef(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    let ignore = false;
    if (hasRecordedVisit.current) return undefined;
    hasRecordedVisit.current = true;

    const fetchGuestbook = async () => {
      try {
        const response = await fetch(`${API_URL}/memos`);
        if (!response.ok) throw new Error("방명록을 불러오지 못했습니다.");
        const data = await response.json();
        if (!ignore) setMemos(data);
      } catch (fetchError) {
        if (!ignore) setError(fetchError.message);
      } finally {
        if (!ignore) setIsLoading(false);
      }

    };

    const recordVisit = async () => {
      try {
        const response = await fetch(`${API_URL}/visits`, { method: "POST" });
        if (!response.ok) throw new Error("방문자 수를 불러오지 못했습니다.");
        const data = await response.json();
        if (!ignore) setVisitorCount(data.count);
      } catch (visitError) {
        console.error(visitError.message);
      }
    };

    fetchGuestbook();
    recordVisit();
    return () => { ignore = true; };
  }, []);

  const addGuestbookEntry = async (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/memos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text.trim() }),
      });
      if (!response.ok) throw new Error("메시지를 남기지 못했습니다.");
      const newMemo = await response.json();
      setMemos((currentMemos) => [...currentMemos, newMemo]);
      setText("");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Jeeho Park home">JP<span>.</span></a>
        <nav className="nav-links" aria-label="Main navigation"><a href="#story">Story</a><a href="#work">Work</a><a href="#guestbook">Guestbook</a></nav>
        <div className="header-meta">
          <a className="contact-link" href="#guestbook">Say hello <span>↗</span></a>
          <small>출처: 삼성전자 삼성리서치 자기소개서 이력서.pdf</small>
          <small className="visitor-count">Visitors: {visitorCount ?? "—"}</small>
          <button className="theme-toggle" type="button" onClick={() => setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light")} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">AI / SOFTWARE / HUMAN EXPERIENCE</p>
            <h1>Making technology<br /><em>feel more human.</em></h1>
            <p className="hero-intro">안녕하세요, 박지호입니다. 복잡한 기술을 사용자의 경험으로 번역하는 소프트웨어 개발자이자 AI를 탐구하는 사람입니다.</p>
            <a className="text-link" href="#story">More about me <span>↓</span></a>
          </div>
          <div className="hero-mark"><img src={profileImage} alt="박지호 프로필 사진" /><span className="mark-caption">SEOUL · 2021 → NOW</span></div>
        </section>

        <section className="statement-section" id="story">
          <p className="section-label">01 / A SHORT STORY</p>
          <div className="statement-grid"><h2>달과 6펜스 사이에서,<br /><span>현실과 이상을 함께 만듭니다.</span></h2><div className="story-copy"><p>정답처럼 보이는 길을 걷다가도, 내가 진짜 만들고 싶은 것이 무엇인지 끊임없이 질문해왔습니다. 그 질문은 컴퓨터 소프트웨어와 수학을 공부하고, 다양한 사람들과 프로젝트를 시작하는 동력이 되었습니다.</p><p>저는 문제를 바로 풀기보다 먼저 제대로 바라봅니다. 도메인을 공부하고, 가설을 세우고, 더 나은 방법을 실험합니다. 그렇게 기술이 사람의 가능성을 넓히는 순간을 만들고 싶습니다.</p></div></div>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading-row"><p className="section-label">02 / SELECTED WORK</p><p className="section-note">A few problems I enjoyed solving.</p></div>
          <div className="project-list">{projects.map((project) => <article className="project-item" key={project.number}><span className="project-number">{project.number}</span><div className="project-main"><p className="project-type">{project.type}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><span className="project-arrow">↗</span></article>)}</div>
        </section>

        <section className="experience-section"><p className="section-label">03 / EXPERIENCE &amp; EDUCATION</p><div className="experience-grid"><h2>Curious by nature,<br /><span>persistent by practice.</span></h2><div className="experience-list">{experiences.map(([date, place, role, detail]) => <div className="experience-row" key={place}><span className="experience-date">{date}</span><div><strong>{place}</strong><span>{role}</span></div><p>{detail}</p></div>)}<div className="education-note"><strong>Hanyang University</strong><span>Computer Software · Mathematics / 2011—2021</span></div></div></div></section>

        <section className="guestbook-section" id="guestbook"><div className="guestbook-intro"><p className="section-label">04 / GUESTBOOK</p><h2>Leave a note,<br /><em>start a conversation.</em></h2><p>방문해주셔서 감사합니다. 짧은 인사나 함께 나누고 싶은 이야기를 남겨주세요.</p></div><div className="guestbook-panel"><form onSubmit={addGuestbookEntry} className="guestbook-form"><label htmlFor="guestbook-message">Your message</label><div className="form-row"><input id="guestbook-message" value={text} onChange={(event) => setText(event.target.value)} placeholder="안녕하세요, 지호님..." maxLength={160} /><button type="submit" disabled={isSubmitting}>{isSubmitting ? "..." : "남기기 ↗"}</button></div></form>{error && <p className="form-error">{error}</p>}<div className="guestbook-list">{isLoading && <p className="empty-message">방명록을 불러오는 중입니다...</p>}{!isLoading && !memos.length && <p className="empty-message">첫 번째 메시지를 남겨주세요.</p>}{memos.map((memo) => <article className="guestbook-entry" key={memo.id}><span className="entry-dot" /><p>{memo.content}</p></article>)}</div></div></section>
      </main>

      <footer className="footer"><span>JEEHO PARK © 2026</span><span>Built with curiosity &amp; care</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}