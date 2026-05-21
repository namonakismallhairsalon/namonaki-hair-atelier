import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const styles = {
    men: [
      "ナチュラルマッシュ",
      "センターパート",
      "スパイラルパーマ",
      "アップバング"
    ],
    women: [
      "韓国レイヤー",
      "ボブ",
      "ウルフカット",
      "ゆるふわパーマ"
    ]
  };

  const [gender, setGender] = useState("men");
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState([]);

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const recommendStyle = () => {
    const shuffled = [...styles[gender]].sort(
      () => 0.5 - Math.random()
    );
    setResult(shuffled.slice(0, 3));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "20px",
        fontFamily: "sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "420px",
          margin: "0 auto",
          background: "white",
          borderRadius: "24px",
          padding: "20px"
        }}
      >
        <h1>namonaki Hair Atelier</h1>
        <p>AI Hairstyle Recommendation</p>

        <input
          type="file"
          accept="image/*"
          onChange={handlePhoto}
        />

        {photo && (
          <img
            src={photo}
            alt="uploaded"
            style={{
              width: "100%",
              marginTop: "15px",
              borderRadius: "20px"
            }}
          />
        )}

        <div style={{ marginTop: "20px" }}>
          <button onClick={() => setGender("men")}>
            メンズ
          </button>

          <button
            onClick={() => setGender("women")}
            style={{ marginLeft: "10px" }}
          >
            レディース
          </button>
        </div>

        <button
          onClick={recommendStyle}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px"
          }}
        >
          AIで似合う髪型を見る
        </button>

        {result.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h2>おすすめスタイル</h2>
            {result.map((item, index) => (
              <div key={index}>
                ✂ {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(<App />);