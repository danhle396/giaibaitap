"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Trang quản trị nội dung. Đăng nhập bằng GitHub (dùng lại luồng OAuth ở
 * /api/admin/auth), đọc danh sách từ /api/admin/danh-sach, ghi bài qua
 * GitHub Contents API bằng chính token của người đăng nhập — không có token
 * nào nằm ở phía máy chủ.
 */

const REPO = "danhle396/giaibaitap";
const THU_MUC = "web/content/bai-giai";

const MON = { van: "Ngữ văn", toan: "Toán" } as const;
const BO_SACH = {
  "ket-noi-tri-thuc": "Kết nối tri thức",
  "chan-troi-sang-tao": "Chân trời sáng tạo",
  "canh-dieu": "Cánh diều",
} as const;
const LOAI = { "soan-van": "Soạn văn", "giai-sgk": "Giải SGK" } as const;
const LOP = ["6", "7", "8", "9", "10", "11", "12"];

interface Bai {
  file: string;
  slug: string;
  tieu_de: string;
  lop: string;
  mon: string;
  loai: string;
  bo_sach: string;
  nguon: string;
}

interface BaiDangSua extends Bai {
  than_bai: string;
  tom_tat: string;
  meta_title: string;
  meta_description: string;
  sha: string;
}

const TRUONG_FM = [
  "tieu_de", "slug", "lop", "loai", "mon", "bo_sach",
  "tom_tat", "meta_title", "meta_description", "nguon",
] as const;

function tachFrontmatter(noiDung: string) {
  const s = noiDung.replace(/\r\n/g, "\n");
  const m = s.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { fm: {} as Record<string, string>, than: s };
  const fm: Record<string, string> = {};
  for (const dong of m[1].split("\n")) {
    const mm = dong.match(/^([a-z_]+):\s*(.*)$/);
    if (mm) fm[mm[1]] = mm[2].trim().replace(/^["']|["']$/g, "");
  }
  return { fm, than: m[2] };
}

function dungFile(b: BaiDangSua) {
  const gt: Record<string, string> = {
    tieu_de: b.tieu_de, slug: b.slug, lop: b.lop, loai: b.loai, mon: b.mon,
    bo_sach: b.bo_sach, tom_tat: b.tom_tat, meta_title: b.meta_title,
    meta_description: b.meta_description, nguon: b.nguon,
  };
  const dong = TRUONG_FM.filter((k) => gt[k]).map((k) => `${k}: "${gt[k].replace(/"/g, "'")}"`);
  return `---\n${dong.join("\n")}\n---\n\n${b.than_bai.trim()}\n`;
}

/** UTF-8 → base64 (btoa không xử lý được tiếng Việt). */
const sangBase64 = (s: string) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(s)));
const tuBase64 = (s: string) =>
  new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\n/g, "")), (c) => c.charCodeAt(0)));

export default function TrangQuanTri() {
  const [token, setToken] = useState<string | null>(null);
  const [dsBai, setDsBai] = useState<Bai[]>([]);
  const [dangTai, setDangTai] = useState(true);
  const [timKiem, setTimKiem] = useState("");
  const [locMon, setLocMon] = useState("");
  const [locLop, setLocLop] = useState("");
  const [locBo, setLocBo] = useState("");
  const [dangSua, setDangSua] = useState<BaiDangSua | null>(null);
  const [dangLuu, setDangLuu] = useState(false);
  const [thongBao, setThongBao] = useState<{ loai: "ok" | "loi"; chu: string } | null>(null);

  useEffect(() => {
    setToken(sessionStorage.getItem("admin_gh_token"));
  }, []);

  useEffect(() => {
    fetch("/api/admin/danh-sach")
      .then((r) => r.json())
      .then((d: Bai[]) => setDsBai(d))
      .catch(() => setThongBao({ loai: "loi", chu: "Không tải được danh sách bài." }))
      .finally(() => setDangTai(false));
  }, []);

  const dangNhap = useCallback(() => {
    const w = window.open("/api/admin/auth", "gh-oauth", "width=680,height=760");
    const nhan = (e: MessageEvent) => {
      if (typeof e.data !== "string") return;
      if (e.data.startsWith("authorization:github:success:")) {
        const { token: t } = JSON.parse(e.data.slice("authorization:github:success:".length));
        sessionStorage.setItem("admin_gh_token", t);
        setToken(t);
        window.removeEventListener("message", nhan);
        w?.close();
      } else if (e.data.startsWith("authorization:github:error:")) {
        setThongBao({ loai: "loi", chu: "Đăng nhập thất bại: " + e.data.split(":").slice(3).join(":") });
        window.removeEventListener("message", nhan);
      }
    };
    window.addEventListener("message", nhan);
  }, []);

  const ketQua = useMemo(() => {
    const q = timKiem.trim().toLowerCase();
    return dsBai.filter(
      (b) =>
        (!locMon || b.mon === locMon) &&
        (!locLop || b.lop === locLop) &&
        (!locBo || b.bo_sach === locBo) &&
        (!q || b.tieu_de.toLowerCase().includes(q) || b.slug.includes(q)),
    );
  }, [dsBai, timKiem, locMon, locLop, locBo]);

  async function moBai(b: Bai) {
    if (!token) return;
    setThongBao(null);
    const r = await fetch(`https://api.github.com/repos/${REPO}/contents/${THU_MUC}/${b.file}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
    });
    if (!r.ok) {
      setThongBao({ loai: "loi", chu: `Không mở được bài (HTTP ${r.status}).` });
      return;
    }
    const j = await r.json();
    const { fm, than } = tachFrontmatter(tuBase64(j.content));
    setDangSua({
      ...b,
      than_bai: than,
      tom_tat: fm.tom_tat ?? "",
      meta_title: fm.meta_title ?? "",
      meta_description: fm.meta_description ?? "",
      nguon: fm.nguon ?? "",
      sha: j.sha,
    });
  }

  async function luuBai() {
    if (!dangSua || !token) return;
    setDangLuu(true);
    setThongBao(null);
    const r = await fetch(`https://api.github.com/repos/${REPO}/contents/${THU_MUC}/${dangSua.file}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
      body: JSON.stringify({
        message: `sửa nội dung: ${dangSua.slug}`,
        content: sangBase64(dungFile(dangSua)),
        sha: dangSua.sha,
        branch: "main",
      }),
    });
    setDangLuu(false);
    if (!r.ok) {
      const j = await r.json().catch(() => ({}));
      setThongBao({ loai: "loi", chu: `Lưu thất bại (HTTP ${r.status}). ${j.message ?? ""}` });
      return;
    }
    const j = await r.json();
    setDangSua({ ...dangSua, sha: j.content.sha });
    setDsBai((ds) => ds.map((x) => (x.file === dangSua.file ? { ...x, tieu_de: dangSua.tieu_de } : x)));
    setThongBao({ loai: "ok", chu: "Đã lưu. Vercel sẽ tự cập nhật website sau khoảng 2 phút." });
  }

  return (
    <div className="min-h-screen bg-[#f6f6f9] text-[#32324d]">
      <style>{`.qt-o{outline:2px solid #4945ff;outline-offset:2px}`}</style>

      {/* Thanh trên */}
      <header className="h-14 bg-white border-b border-[#eaeaef] flex items-center px-5 gap-4 sticky top-0 z-20">
        <span className="font-bold text-[15px]">Quản trị nội dung</span>
        <span className="text-[13px] text-[#8e8ea9]">giaibaitap247.com</span>
        <div className="ml-auto flex items-center gap-3">
          {token ? (
            <>
              <span className="text-[13px] text-[#5cb176]">● Đã đăng nhập GitHub</span>
              <button
                onClick={() => { sessionStorage.removeItem("admin_gh_token"); setToken(null); setDangSua(null); }}
                className="text-[13px] text-[#8e8ea9] hover:text-[#32324d]"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <button onClick={dangNhap} className="bg-[#4945ff] text-white text-[13px] font-semibold px-4 py-2 rounded">
              Đăng nhập bằng GitHub
            </button>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Thanh bên */}
        <aside className="w-56 shrink-0 bg-white border-r border-[#eaeaef] min-h-[calc(100vh-3.5rem)] p-4">
          <p className="text-[11px] font-bold tracking-wider text-[#8e8ea9] uppercase mb-3">Bộ sưu tập</p>
          <button
            onClick={() => { setLocMon(""); setDangSua(null); }}
            className={`w-full text-left px-3 py-2 rounded text-[14px] mb-1 ${!locMon ? "bg-[#f0f0ff] text-[#4945ff] font-semibold" : "hover:bg-[#f6f6f9]"}`}
          >
            Tất cả bài <span className="float-right text-[#8e8ea9]">{dsBai.length}</span>
          </button>
          {(Object.keys(MON) as (keyof typeof MON)[]).map((m) => (
            <button
              key={m}
              onClick={() => { setLocMon(m); setDangSua(null); }}
              className={`w-full text-left px-3 py-2 rounded text-[14px] mb-1 ${locMon === m ? "bg-[#f0f0ff] text-[#4945ff] font-semibold" : "hover:bg-[#f6f6f9]"}`}
            >
              {MON[m]} <span className="float-right text-[#8e8ea9]">{dsBai.filter((b) => b.mon === m).length}</span>
            </button>
          ))}
        </aside>

        <main className="flex-1 p-6 min-w-0">
          {thongBao && (
            <div className={`mb-4 px-4 py-3 rounded text-[14px] ${thongBao.loai === "ok" ? "bg-[#eafbe7] text-[#2f6846]" : "bg-[#fcecea] text-[#b72b1a]"}`}>
              {thongBao.chu}
            </div>
          )}

          {!token && (
            <div className="bg-white border border-[#eaeaef] rounded-lg p-8 text-center">
              <p className="text-[15px] mb-1 font-semibold">Cần đăng nhập để sửa bài</p>
              <p className="text-[14px] text-[#8e8ea9] mb-5">Bạn vẫn xem được danh sách, nhưng phải đăng nhập GitHub mới mở và lưu được.</p>
              <button onClick={dangNhap} className="bg-[#4945ff] text-white text-[14px] font-semibold px-5 py-2.5 rounded">
                Đăng nhập bằng GitHub
              </button>
            </div>
          )}

          {dangSua ? (
            <FormSua
              bai={dangSua}
              dat={setDangSua}
              luu={luuBai}
              dangLuu={dangLuu}
              dong={() => { setDangSua(null); setThongBao(null); }}
            />
          ) : (
            <>
              <div className="flex items-baseline gap-3 mb-4">
                <h1 className="text-[20px] font-bold">{locMon ? MON[locMon as keyof typeof MON] : "Tất cả bài"}</h1>
                <span className="text-[14px] text-[#8e8ea9]">{ketQua.length} bài</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <input
                  value={timKiem}
                  onChange={(e) => setTimKiem(e.target.value)}
                  placeholder="Tìm theo tiêu đề hoặc slug…"
                  className="flex-1 min-w-[240px] h-10 px-3 rounded border border-[#dcdce4] bg-white text-[14px]"
                />
                <select value={locLop} onChange={(e) => setLocLop(e.target.value)} className="h-10 px-3 rounded border border-[#dcdce4] bg-white text-[14px]">
                  <option value="">Mọi lớp</option>
                  {LOP.map((l) => <option key={l} value={l}>Lớp {l}</option>)}
                </select>
                <select value={locBo} onChange={(e) => setLocBo(e.target.value)} className="h-10 px-3 rounded border border-[#dcdce4] bg-white text-[14px]">
                  <option value="">Mọi bộ sách</option>
                  {(Object.keys(BO_SACH) as (keyof typeof BO_SACH)[]).map((b) => <option key={b} value={b}>{BO_SACH[b]}</option>)}
                </select>
              </div>

              <div className="bg-white border border-[#eaeaef] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px]">
                    <thead>
                      <tr className="bg-[#f6f6f9] text-left text-[12px] uppercase tracking-wide text-[#666687]">
                        <th className="px-4 py-3 font-semibold">Tiêu đề</th>
                        <th className="px-4 py-3 font-semibold w-20">Lớp</th>
                        <th className="px-4 py-3 font-semibold w-28">Môn</th>
                        <th className="px-4 py-3 font-semibold w-44">Bộ sách</th>
                        <th className="px-4 py-3 font-semibold w-24"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {dangTai && (
                        <tr><td colSpan={5} className="px-4 py-8 text-center text-[#8e8ea9]">Đang tải…</td></tr>
                      )}
                      {!dangTai && ketQua.length === 0 && (
                        <tr><td colSpan={5} className="px-4 py-8 text-center text-[#8e8ea9]">Không có bài nào khớp bộ lọc.</td></tr>
                      )}
                      {ketQua.slice(0, 200).map((b) => (
                        <tr key={b.file} className="border-t border-[#eaeaef] hover:bg-[#f6f6f9]">
                          <td className="px-4 py-3">
                            <div className="font-medium">{b.tieu_de || b.slug}</div>
                            <div className="text-[12px] text-[#8e8ea9]">{b.slug}</div>
                          </td>
                          <td className="px-4 py-3">{b.lop}</td>
                          <td className="px-4 py-3">{MON[b.mon as keyof typeof MON] ?? b.mon}</td>
                          <td className="px-4 py-3 text-[#666687]">{BO_SACH[b.bo_sach as keyof typeof BO_SACH] ?? b.bo_sach}</td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => moBai(b)}
                              disabled={!token}
                              className="text-[#4945ff] font-semibold disabled:text-[#c0c0cf] disabled:cursor-not-allowed"
                            >
                              Sửa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {ketQua.length > 200 && (
                  <div className="px-4 py-3 text-[13px] text-[#8e8ea9] border-t border-[#eaeaef]">
                    Đang hiện 200 bài đầu trong {ketQua.length}. Dùng ô tìm kiếm hoặc bộ lọc để thu hẹp.
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function O({ nhan, goiY, children }: { nhan: string; goiY?: string; children: React.ReactNode }) {
  return (
    <label className="block mb-4">
      <span className="block text-[13px] font-semibold mb-1.5">{nhan}</span>
      {children}
      {goiY && <span className="block text-[12px] text-[#8e8ea9] mt-1">{goiY}</span>}
    </label>
  );
}

function FormSua({
  bai, dat, luu, dangLuu, dong,
}: {
  bai: BaiDangSua;
  dat: (b: BaiDangSua) => void;
  luu: () => void;
  dangLuu: boolean;
  dong: () => void;
}) {
  const oInput = "w-full h-10 px-3 rounded border border-[#dcdce4] bg-white text-[14px]";
  const duongDan = bai.loai === "soan-van" ? `/soan-van/${bai.slug}` : `/lop-${bai.lop}/${bai.mon}/${bai.loai}-${bai.mon}-lop-${bai.lop}-${bai.bo_sach}/${bai.slug}`;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <button onClick={dong} className="text-[14px] text-[#8e8ea9] hover:text-[#32324d]">← Quay lại danh sách</button>
        <div className="ml-auto flex gap-2">
          <a href={duongDan} target="_blank" rel="noreferrer" className="h-10 px-4 inline-flex items-center rounded border border-[#dcdce4] bg-white text-[14px] font-semibold">
            Xem trên web
          </a>
          <button onClick={luu} disabled={dangLuu} className="h-10 px-5 rounded bg-[#4945ff] text-white text-[14px] font-semibold disabled:opacity-60">
            {dangLuu ? "Đang lưu…" : "Lưu & đăng"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
        <div className="bg-white border border-[#eaeaef] rounded-lg p-5">
          <O nhan="Tiêu đề hiển thị" goiY="Bài của các bộ sách khác nhau phải đặt tên khác nhau, nếu không Google gộp lại.">
            <input className={oInput} value={bai.tieu_de} onChange={(e) => dat({ ...bai, tieu_de: e.target.value })} />
          </O>
          <O nhan="Nội dung bài (Markdown)">
            <textarea
              className="w-full h-[520px] p-3 rounded border border-[#dcdce4] bg-white font-mono text-[13px] leading-relaxed"
              value={bai.than_bai}
              onChange={(e) => dat({ ...bai, than_bai: e.target.value })}
            />
          </O>
        </div>

        <div className="bg-white border border-[#eaeaef] rounded-lg p-5">
          <p className="text-[11px] font-bold tracking-wider text-[#8e8ea9] uppercase mb-3">Phân loại</p>
          <O nhan="Slug (đường dẫn)" goiY="Đổi slug là đổi địa chỉ bài — cân nhắc kỹ với bài đã đăng.">
            <input className={oInput} value={bai.slug} onChange={(e) => dat({ ...bai, slug: e.target.value })} />
          </O>
          <O nhan="Lớp">
            <select className={oInput} value={bai.lop} onChange={(e) => dat({ ...bai, lop: e.target.value })}>
              {LOP.map((l) => <option key={l} value={l}>Lớp {l}</option>)}
            </select>
          </O>
          <O nhan="Loại bài" goiY="Chọn sai là bài vào nhầm đường dẫn và không hiển thị được.">
            <select className={oInput} value={bai.loai} onChange={(e) => dat({ ...bai, loai: e.target.value })}>
              {(Object.keys(LOAI) as (keyof typeof LOAI)[]).map((l) => <option key={l} value={l}>{LOAI[l]}</option>)}
            </select>
          </O>
          <O nhan="Môn">
            <select className={oInput} value={bai.mon} onChange={(e) => dat({ ...bai, mon: e.target.value })}>
              {(Object.keys(MON) as (keyof typeof MON)[]).map((m) => <option key={m} value={m}>{MON[m]}</option>)}
            </select>
          </O>
          <O nhan="Bộ sách">
            <select className={oInput} value={bai.bo_sach} onChange={(e) => dat({ ...bai, bo_sach: e.target.value })}>
              {(Object.keys(BO_SACH) as (keyof typeof BO_SACH)[]).map((b) => <option key={b} value={b}>{BO_SACH[b]}</option>)}
            </select>
          </O>

          <p className="text-[11px] font-bold tracking-wider text-[#8e8ea9] uppercase mb-3 mt-6">SEO</p>
          <O nhan="Tóm tắt">
            <textarea className="w-full h-20 p-3 rounded border border-[#dcdce4] bg-white text-[13px]" value={bai.tom_tat} onChange={(e) => dat({ ...bai, tom_tat: e.target.value })} />
          </O>
          <O nhan="Meta title" goiY={`${bai.meta_title.length} ký tự — nên dưới 60.`}>
            <input className={oInput} value={bai.meta_title} onChange={(e) => dat({ ...bai, meta_title: e.target.value })} />
          </O>
          <O nhan="Meta description" goiY={`${bai.meta_description.length} ký tự — nên 150-160.`}>
            <textarea className="w-full h-24 p-3 rounded border border-[#dcdce4] bg-white text-[13px]" value={bai.meta_description} onChange={(e) => dat({ ...bai, meta_description: e.target.value })} />
          </O>
        </div>
      </div>
    </div>
  );
}
