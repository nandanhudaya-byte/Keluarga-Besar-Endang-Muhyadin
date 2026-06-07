import { useState, useEffect } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const FAMILY = {
  id: "endang",
  name: "Endang Muhyadin",
  spouse: "Ii Isyah",
  role: "Kakek & Nenek",
  gen: 0,
  avatar: "EM",
  avatarSpouse: "II",
  children: [
    {
      id: "anggi",
      name: "Anggi Purwita",
      spouse: "Nana Sunarna",
      role: "Anak ke-1",
      gen: 1,
      avatar: "AP",
      children: [
        {
          id: "gina", name: "Gina", spouse: "Tomi", role: "Cucu ke-1", gen: 2,
          avatar: "GN",
          children: [{ id: "ezar", name: "Ezar", role: "Cicit", gen: 3, avatar: "EZ", children: [] }]
        },
        { id: "tania", name: "Tania", spouse: "Yuksel", role: "Cucu ke-2", gen: 2, avatar: "TN", children: [] },
        { id: "rikaz", name: "Rikaz", role: "Cucu ke-3", gen: 2, avatar: "RK", children: [] },
      ]
    },
    {
      id: "rinrin",
      name: "Rinrin Noviani",
      spouse: "Ade Yusuf Roni",
      role: "Anak ke-2",
      gen: 1,
      avatar: "RN",
      children: [
        { id: "hilmi", name: "Hilmi", spouse: "Zahra", role: "Cucu ke-4", gen: 2, avatar: "HM", children: [] },
        { id: "barqi", name: "Barqi", spouse: "Ghina", role: "Cucu ke-5", gen: 2, avatar: "BQ", children: [] },
        { id: "bildi", name: "Bildi", role: "Cucu ke-6", gen: 2, avatar: "BD", children: [] },
        { id: "rahma", name: "Rahma", role: "Cucu ke-7", gen: 2, avatar: "RM", children: [] },
        { id: "pathi", name: "Pathi", role: "Cucu ke-8", gen: 2, avatar: "PT", children: [] },
        { id: "nazma", name: "Nazma", role: "Cucu ke-9", gen: 2, avatar: "NZ", children: [] },
      ]
    },
    {
      id: "nandan",
      name: "Nandan Triana Hudaya",
      spouse: "Windi Widiastuti",
      role: "Anak ke-3",
      gen: 1,
      avatar: "NT",
      children: [
        { id: "rais", name: "Rais", role: "Cucu ke-10", gen: 2, avatar: "RS", children: [] },
        { id: "rumaisha", name: "Rumaisha", role: "Cucu ke-11", gen: 2, avatar: "RU", children: [] },
      ]
    },
    {
      id: "rindi",
      name: "Rindi Baka",
      spouse: "Imel",
      role: "Anak ke-4",
      gen: 1,
      avatar: "RB",
      children: [
        { id: "raga", name: "Raga", role: "Cucu ke-12", gen: 2, avatar: "RG", children: [] },
        { id: "raina", name: "Raina", role: "Cucu ke-13", gen: 2, avatar: "RA", children: [] },
        { id: "demika", name: "Demika", role: "Cucu ke-14", gen: 2, avatar: "DM", children: [] },
        { id: "faka", name: "Faka", role: "Cucu ke-15", gen: 2, avatar: "FK", children: [] },
      ]
    },
  ]
};

// flatten all
function flattenAll(node, list = []) {
  list.push(node);
  (node.children || []).forEach(c => flattenAll(c, list));
  return list;
}
const ALL_MEMBERS = flattenAll(FAMILY);

// find parent
function findParent(id, node = FAMILY, parent = null) {
  if (node.id === id) return parent;
  for (const c of node.children || []) {
    const r = findParent(id, c, node);
    if (r !== undefined) return r;
  }
  return undefined;
}

// ─── THEME ──────────────────────────────────────────────────────────────────
const GEN_THEME = [
  { bg: "#D4A017", bgLight: "#f5e6c8", text: "#1a1a2e", label: "Kakek & Nenek" },
  { bg: "#e94560", bgLight: "#fde8ec", text: "#fff", label: "Anak" },
  { bg: "#7c3aed", bgLight: "#ede9fe", text: "#fff", label: "Cucu" },
  { bg: "#059669", bgLight: "#d1fae5", text: "#fff", label: "Cicit" },
];

const C = {
  bg: "#0f0f1a",
  card: "#1a1a2e",
  card2: "#16213e",
  border: "#2a2a4a",
  gold: "#D4A017",
  goldLight: "#f5e6c8",
  red: "#e94560",
  purple: "#7c3aed",
  green: "#059669",
  text: "#f5e6c8",
  sub: "#8888aa",
  white: "#ffffff",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const genStats = {
  anak: FAMILY.children.length,
  cucu: FAMILY.children.reduce((a, c) => a + c.children.length, 0),
  cicit: FAMILY.children.reduce((a, c) =>
    a + c.children.reduce((b, g) => b + g.children.length, 0), 0),
};

// ─── AVATAR ──────────────────────────────────────────────────────────────────
function Avatar({ initials, gen, size = 48, glow = false }) {
  const t = GEN_THEME[gen] || GEN_THEME[0];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${t.bg}, ${t.bg}bb)`,
      border: `2px solid ${t.bg}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 800, fontSize: size * 0.3,
      color: t.text === "#fff" ? "#fff" : "#1a1a2e",
      flexShrink: 0,
      boxShadow: glow ? `0 0 16px ${t.bg}88` : "none",
      fontFamily: "Georgia, serif",
      letterSpacing: 1,
    }}>
      {initials}
    </div>
  );
}

// ─── GEN BADGE ───────────────────────────────────────────────────────────────
function GenBadge({ gen }) {
  const t = GEN_THEME[gen] || GEN_THEME[0];
  const labels = ["👴 Kakek/Nenek", "👨‍👩 Anak", "🧒 Cucu", "👶 Cicit"];
  return (
    <span style={{
      background: `${t.bg}22`, color: t.bg,
      border: `1px solid ${t.bg}55`,
      borderRadius: 20, padding: "2px 10px",
      fontSize: 10, fontWeight: 700,
    }}>{labels[gen]}</span>
  );
}

// ─── SCREEN: HOME ────────────────────────────────────────────────────────────
function HomeScreen({ onNavigate }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div style={{
      minHeight: "100vh", background: C.bg,
      display: "flex", flexDirection: "column",
    }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(160deg, #1a1a2e 0%, #16213e 60%, #0f1635 100%)`,
        padding: "48px 24px 32px",
        textAlign: "center",
        borderBottom: `1px solid ${C.border}`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 200, height: 200, borderRadius: "50%",
          background: `${C.gold}11`, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -60, left: -60,
          width: 240, height: 240, borderRadius: "50%",
          background: `${C.red}08`, pointerEvents: "none",
        }} />

        <div style={{
          fontSize: 56, marginBottom: 8,
          filter: "drop-shadow(0 4px 12px #D4A01766)",
          transform: visible ? "scale(1)" : "scale(0.5)",
          transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        }}>🌳</div>

        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: 26, fontWeight: 800,
          color: C.gold, margin: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.5s ease 0.1s",
          textShadow: `0 2px 20px ${C.gold}44`,
        }}>
          Silsilah Keluarga
        </h1>
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: 18, color: C.text,
          margin: "6px 0 0",
          opacity: visible ? 1 : 0,
          transition: "all 0.5s ease 0.2s",
        }}>
          Endang Muhyadin &amp; Ii Isyah
        </p>
        <p style={{
          fontSize: 12, color: C.sub, margin: "8px 0 0",
          fontStyle: "italic",
          opacity: visible ? 1 : 0,
          transition: "all 0.5s ease 0.3s",
        }}>
          "Sebaik-baik manusia adalah yang bermanfaat bagi keluarganya"
        </p>
      </div>

      {/* Stats row */}
      <div style={{
        display: "flex", gap: 12, padding: "20px 20px 0",
        opacity: visible ? 1 : 0,
        transition: "all 0.5s ease 0.35s",
      }}>
        {[
          { icon: "👨‍👩‍👧‍👦", val: genStats.anak, label: "Anak", color: C.red },
          { icon: "🧒", val: genStats.cucu, label: "Cucu", color: C.purple },
          { icon: "👶", val: genStats.cicit, label: "Cicit", color: C.green },
        ].map(s => (
          <div key={s.label} style={{
            flex: 1, background: C.card,
            border: `1px solid ${s.color}33`,
            borderRadius: 16, padding: "14px 8px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 24 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1.1 }}>{s.val}</div>
            <div style={{ fontSize: 11, color: C.sub, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div style={{
        padding: "20px",
        display: "flex", flexDirection: "column", gap: 12,
        opacity: visible ? 1 : 0,
        transition: "all 0.5s ease 0.45s",
      }}>
        {[
          { icon: "🌳", label: "Lihat Silsilah", sub: "Pohon keluarga interaktif", screen: "tree", color: C.gold },
          { icon: "👥", label: "Semua Anggota", sub: `${ALL_MEMBERS.length} anggota keluarga`, screen: "members", color: C.red },
          { icon: "🔍", label: "Cari Anggota", sub: "Temukan anggota keluarga", screen: "search", color: C.purple },
          { icon: "📊", label: "Statistik", sub: "Info lengkap keluarga", screen: "stats", color: C.green },
        ].map((m, i) => (
          <button
            key={m.screen}
            onClick={() => onNavigate(m.screen)}
            style={{
              background: C.card, border: `1px solid ${m.color}33`,
              borderRadius: 18, padding: "16px 18px",
              display: "flex", alignItems: "center", gap: 16,
              cursor: "pointer", textAlign: "left",
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: `all 0.4s ease ${0.45 + i * 0.07}s`,
              boxShadow: `0 2px 12px ${m.color}11`,
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: `${m.color}18`,
              border: `1px solid ${m.color}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24,
            }}>{m.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 16 }}>{m.label}</div>
              <div style={{ color: C.sub, fontSize: 12, marginTop: 2 }}>{m.sub}</div>
            </div>
            <div style={{ color: m.color, fontSize: 18 }}>›</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── SCREEN: TREE ────────────────────────────────────────────────────────────
function TreeScreen({ onBack, onSelectMember }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <TopBar title="🌳 Pohon Keluarga" onBack={onBack} />
      <div style={{ padding: "12px 16px", overflowY: "auto" }}>
        <TreeNode node={FAMILY} onSelect={onSelectMember} />
      </div>
    </div>
  );
}

function TreeNode({ node, onSelect, depth = 0 }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const t = GEN_THEME[node.gen] || GEN_THEME[0];

  return (
    <div style={{ marginLeft: depth > 0 ? 16 : 0, marginBottom: 6 }}>
      {/* Connector line */}
      {depth > 0 && (
        <div style={{
          position: "absolute", left: -16, top: 24,
          width: 16, height: 1,
          background: `${t.bg}44`,
        }} />
      )}
      <div style={{ position: "relative" }}>
        {/* Node card */}
        <div style={{
          background: C.card,
          border: `1px solid ${t.bg}44`,
          borderLeft: `3px solid ${t.bg}`,
          borderRadius: 12,
          padding: "10px 12px",
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 4,
        }}>
          <button
            onClick={() => onSelect(node)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "none", border: "none", cursor: "pointer",
              flex: 1, textAlign: "left", padding: 0,
            }}
          >
            <Avatar initials={node.avatar} gen={node.gen} size={40} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>{node.name}</div>
              {node.spouse && (
                <div style={{ color: C.sub, fontSize: 11 }}>❤ {node.spouse}</div>
              )}
              <div style={{ marginTop: 2 }}>
                <GenBadge gen={node.gen} />
              </div>
            </div>
          </button>

          {hasChildren && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: `${t.bg}22`, border: `1px solid ${t.bg}44`,
                color: t.bg, borderRadius: 8, width: 32, height: 32,
                cursor: "pointer", fontSize: 14, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {expanded ? "−" : `+${node.children.length}`}
            </button>
          )}
        </div>

        {/* Children */}
        {hasChildren && expanded && (
          <div style={{
            marginLeft: 20,
            borderLeft: `1px dashed ${t.bg}33`,
            paddingLeft: 8,
          }}>
            {node.children.map(child => (
              <TreeNode key={child.id} node={child} onSelect={onSelect} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN: MEMBERS ─────────────────────────────────────────────────────────
function MembersScreen({ onBack, onSelectMember }) {
  const [filter, setFilter] = useState(null);

  const filtered = filter !== null
    ? ALL_MEMBERS.filter(m => m.gen === filter)
    : ALL_MEMBERS;

  const tabs = [
    { label: "Semua", val: null },
    { label: "👴 Kakek/Nenek", val: 0 },
    { label: "👨‍👩 Anak", val: 1 },
    { label: "🧒 Cucu", val: 2 },
    { label: "👶 Cicit", val: 3 },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <TopBar title="👥 Semua Anggota" onBack={onBack} />

      {/* Filter tabs */}
      <div style={{
        display: "flex", gap: 8, padding: "12px 16px",
        overflowX: "auto", scrollbarWidth: "none",
      }}>
        {tabs.map(t => {
          const active = filter === t.val;
          const color = t.val !== null ? GEN_THEME[t.val].bg : C.gold;
          return (
            <button
              key={String(t.val)}
              onClick={() => setFilter(t.val)}
              style={{
                background: active ? color : `${color}18`,
                border: `1px solid ${color}44`,
                color: active ? (t.val === 0 ? "#1a1a2e" : "#fff") : color,
                borderRadius: 20, padding: "6px 14px",
                fontSize: 11, fontWeight: 700,
                cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "0 16px 20px" }}>
        <div style={{ color: C.sub, fontSize: 12, marginBottom: 10 }}>
          {filtered.length} anggota ditemukan
        </div>
        {filtered.map(m => (
          <MemberRow key={m.id} member={m} onClick={() => onSelectMember(m)} />
        ))}
      </div>
    </div>
  );
}

function MemberRow({ member, onClick }) {
  const t = GEN_THEME[member.gen] || GEN_THEME[0];
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", background: C.card,
        border: `1px solid ${t.bg}33`,
        borderLeft: `3px solid ${t.bg}`,
        borderRadius: 14, padding: "12px 14px",
        display: "flex", alignItems: "center", gap: 12,
        cursor: "pointer", textAlign: "left", marginBottom: 8,
      }}
    >
      <Avatar initials={member.avatar} gen={member.gen} size={44} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>{member.name}</div>
        {member.spouse && (
          <div style={{ color: C.sub, fontSize: 12 }}>❤ {member.spouse}</div>
        )}
        <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
          <GenBadge gen={member.gen} />
          {member.children?.length > 0 && (
            <span style={{ fontSize: 10, color: C.sub }}>
              · {member.children.length} anak
            </span>
          )}
        </div>
      </div>
      <div style={{ color: t.bg, fontSize: 18 }}>›</div>
    </button>
  );
}

// ─── SCREEN: SEARCH ──────────────────────────────────────────────────────────
function SearchScreen({ onBack, onSelectMember }) {
  const [query, setQuery] = useState("");
  const results = query.length > 0
    ? ALL_MEMBERS.filter(m =>
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        (m.spouse || "").toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <TopBar title="🔍 Cari Anggota" onBack={onBack} />
      <div style={{ padding: "12px 16px" }}>
        <div style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 16, padding: "12px 16px",
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 18 }}>🔍</span>
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari nama anggota keluarga..."
            style={{
              flex: 1, background: "none", border: "none",
              color: C.text, fontSize: 15, outline: "none",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                background: C.border, border: "none", color: C.sub,
                borderRadius: "50%", width: 24, height: 24,
                cursor: "pointer", fontSize: 12,
              }}
            >✕</button>
          )}
        </div>

        {query === "" && (
          <div style={{ textAlign: "center", padding: "40px 0", color: C.sub }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>👨‍👩‍👧‍👦</div>
            <div>Ketik nama untuk mencari anggota keluarga</div>
          </div>
        )}

        {query !== "" && results.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: C.sub }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🤷</div>
            <div>Tidak ditemukan: "<span style={{ color: C.text }}>{query}</span>"</div>
          </div>
        )}

        {results.map(m => (
          <MemberRow key={m.id} member={m} onClick={() => onSelectMember(m)} />
        ))}
      </div>
    </div>
  );
}

// ─── SCREEN: STATS ───────────────────────────────────────────────────────────
function StatsScreen({ onBack }) {
  const childStats = FAMILY.children.map(c => ({
    name: c.name.split(" ")[0],
    cucu: c.children.length,
    cicit: c.children.reduce((a, g) => a + g.children.length, 0),
    color: GEN_THEME[1].bg,
  }));

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <TopBar title="📊 Statistik Keluarga" onBack={onBack} />
      <div style={{ padding: "16px" }}>

        {/* Overview cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[
            { icon: "🌳", label: "Total Anggota", val: ALL_MEMBERS.length, color: C.gold },
            { icon: "👨‍👩‍👧‍👦", label: "Anak", val: genStats.anak, color: C.red },
            { icon: "🧒", label: "Cucu", val: genStats.cucu, color: C.purple },
            { icon: "👶", label: "Cicit", val: genStats.cicit, color: C.green },
          ].map(s => (
            <div key={s.label} style={{
              background: C.card, border: `1px solid ${s.color}33`,
              borderRadius: 16, padding: "16px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 12, color: C.sub }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Per-child breakdown */}
        <div style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 18, padding: "16px", marginBottom: 16,
        }}>
          <div style={{ color: C.gold, fontWeight: 700, fontSize: 14, marginBottom: 14 }}>
            📋 Keturunan Per Anak
          </div>
          {childStats.map((c, i) => (
            <div key={c.name} style={{ marginBottom: i < childStats.length - 1 ? 14 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: C.text, fontWeight: 600, fontSize: 13 }}>{c.name}</span>
                <span style={{ color: C.sub, fontSize: 12 }}>
                  {c.cucu} cucu · {c.cicit} cicit
                </span>
              </div>
              {/* Bar chart */}
              <div style={{ background: C.bg, borderRadius: 8, height: 8, overflow: "hidden" }}>
                <div style={{
                  width: `${(c.cucu / genStats.cucu) * 100}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${C.red}, ${C.purple})`,
                  borderRadius: 8,
                  transition: "width 0.8s ease",
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Cicit highlight */}
        <div style={{
          background: `linear-gradient(135deg, ${C.green}18, ${C.card})`,
          border: `1px solid ${C.green}44`,
          borderRadius: 18, padding: "16px",
        }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
            👶 Cicit Pertama
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar initials="EZ" gen={3} size={48} glow />
            <div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 16 }}>Ezar</div>
              <div style={{ color: C.sub, fontSize: 12 }}>Anak dari Gina & Tomi</div>
              <div style={{ color: C.sub, fontSize: 12 }}>Cucu dari Anggi Purwita & Nana Sunarna</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: MEMBER DETAIL ────────────────────────────────────────────────────
function DetailScreen({ member, onBack, onSelectMember }) {
  const parent = findParent(member.id);
  const t = GEN_THEME[member.gen] || GEN_THEME[0];

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <TopBar title="Profil Anggota" onBack={onBack} />

      {/* Hero */}
      <div style={{
        background: `linear-gradient(160deg, ${t.bg}22, ${C.card})`,
        borderBottom: `1px solid ${t.bg}33`,
        padding: "24px 20px",
        textAlign: "center",
      }}>
        <Avatar initials={member.avatar} gen={member.gen} size={80} glow />
        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: 22, fontWeight: 800,
          color: C.text, margin: "12px 0 4px",
        }}>{member.name}</h2>
        {member.spouse && (
          <div style={{ color: C.sub, fontSize: 14, marginBottom: 8 }}>
            ❤ {member.spouse}
          </div>
        )}
        <GenBadge gen={member.gen} />
      </div>

      <div style={{ padding: "16px" }}>
        {/* Info cards */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Generasi", val: `ke-${member.gen + 1}`, icon: "🌳" },
            { label: "Anak", val: member.children?.length || 0, icon: "👶" },
          ].map(info => (
            <div key={info.label} style={{
              flex: 1, background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 14, padding: "12px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 22 }}>{info.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: t.bg }}>{info.val}</div>
              <div style={{ fontSize: 11, color: C.sub }}>{info.label}</div>
            </div>
          ))}
        </div>

        {/* Parent info */}
        {parent && (
          <button
            onClick={() => onSelectMember(parent)}
            style={{
              width: "100%", background: C.card,
              border: `1px solid ${GEN_THEME[parent.gen].bg}33`,
              borderRadius: 14, padding: "12px 14px",
              display: "flex", alignItems: "center", gap: 12,
              cursor: "pointer", textAlign: "left", marginBottom: 12,
            }}
          >
            <div style={{ fontSize: 20 }}>⬆️</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.sub, fontSize: 11, marginBottom: 2 }}>Orang Tua</div>
              <div style={{ color: C.text, fontWeight: 700 }}>{parent.name}</div>
              {parent.spouse && (
                <div style={{ color: C.sub, fontSize: 12 }}>& {parent.spouse}</div>
              )}
            </div>
            <div style={{ color: GEN_THEME[parent.gen].bg, fontSize: 18 }}>›</div>
          </button>
        )}

        {/* Children */}
        {member.children?.length > 0 && (
          <div>
            <div style={{ color: C.gold, fontWeight: 700, fontSize: 14, marginBottom: 10 }}>
              Anak-anak ({member.children.length})
            </div>
            {member.children.map(child => (
              <MemberRow key={child.id} member={child} onClick={() => onSelectMember(child)} />
            ))}
          </div>
        )}

        {member.children?.length === 0 && (
          <div style={{
            textAlign: "center", padding: "24px",
            background: C.card, borderRadius: 16,
            color: C.sub, fontSize: 13,
          }}>
            {member.gen === 3 ? "👶 Cicit — generasi terbaru!" : "Belum ada data anak"}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TOP BAR ─────────────────────────────────────────────────────────────────
function TopBar({ title, onBack }) {
  return (
    <div style={{
      background: C.card,
      borderBottom: `1px solid ${C.border}`,
      padding: "14px 16px",
      display: "flex", alignItems: "center", gap: 12,
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <button
        onClick={onBack}
        style={{
          background: `${C.gold}18`, border: `1px solid ${C.gold}33`,
          color: C.gold, borderRadius: 10, width: 36, height: 36,
          cursor: "pointer", fontSize: 18,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >‹</button>
      <div style={{
        fontFamily: "Georgia, serif",
        fontWeight: 700, fontSize: 17, color: C.text,
      }}>{title}</div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav({ active, onNavigate }) {
  const tabs = [
    { icon: "🏠", label: "Home", screen: "home" },
    { icon: "🌳", label: "Silsilah", screen: "tree" },
    { icon: "👥", label: "Anggota", screen: "members" },
    { icon: "🔍", label: "Cari", screen: "search" },
    { icon: "📊", label: "Statistik", screen: "stats" },
  ];

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: C.card,
      borderTop: `1px solid ${C.border}`,
      display: "flex",
      paddingBottom: "env(safe-area-inset-bottom, 8px)",
      zIndex: 100,
    }}>
      {tabs.map(t => (
        <button
          key={t.screen}
          onClick={() => onNavigate(t.screen)}
          style={{
            flex: 1, background: "none", border: "none",
            padding: "10px 4px 6px",
            cursor: "pointer",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 2,
          }}
        >
          <div style={{
            fontSize: active === t.screen ? 22 : 20,
            filter: active !== t.screen ? "grayscale(1) opacity(0.5)" : "none",
            transition: "all 0.2s",
          }}>{t.icon}</div>
          <div style={{
            fontSize: 9, fontWeight: 600,
            color: active === t.screen ? C.gold : C.sub,
            transition: "color 0.2s",
          }}>{t.label}</div>
          {active === t.screen && (
            <div style={{
              width: 4, height: 4, borderRadius: "50%",
              background: C.gold, marginTop: 1,
            }} />
          )}
        </button>
      ))}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedMember, setSelectedMember] = useState(null);
  const [history, setHistory] = useState(["home"]);

  const navigate = (s) => {
    setHistory(h => [...h, s]);
    setScreen(s);
    setSelectedMember(null);
  };

  const openMember = (m) => {
    setSelectedMember(m);
    setHistory(h => [...h, "detail"]);
    setScreen("detail");
  };

  const goBack = () => {
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    const prev = newHistory[newHistory.length - 1] || "home";
    setScreen(prev);
    if (prev !== "detail") setSelectedMember(null);
  };

  const mainScreens = ["home", "tree", "members", "search", "stats"];

  return (
    <div style={{
      maxWidth: 430, margin: "0 auto",
      minHeight: "100vh", position: "relative",
      background: C.bg,
      paddingBottom: 70,
    }}>
      {screen === "home" && <HomeScreen onNavigate={navigate} />}
      {screen === "tree" && <TreeScreen onBack={goBack} onSelectMember={openMember} />}
      {screen === "members" && <MembersScreen onBack={goBack} onSelectMember={openMember} />}
      {screen === "search" && <SearchScreen onBack={goBack} onSelectMember={openMember} />}
      {screen === "stats" && <StatsScreen onBack={goBack} />}
      {screen === "detail" && selectedMember && (
        <DetailScreen member={selectedMember} onBack={goBack} onSelectMember={openMember} />
      )}

      <BottomNav
        active={mainScreens.includes(screen) ? screen : history.find(h => mainScreens.includes(h)) || "home"}
        onNavigate={navigate}
      />
    </div>
  );
}
