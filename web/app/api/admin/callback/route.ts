/**
 * Bước 2 của đăng nhập GitHub cho trang /admin (Decap CMS).
 * Đổi `code` lấy access token rồi trả token về cửa sổ CMS bằng postMessage —
 * đúng giao thức Decap chờ: "authorization:github:success:<json>".
 */
export const dynamic = "force-dynamic";

/** Trang trung gian tự đóng, gửi kết quả về cửa sổ đã mở nó. */
function ketQua(noiDung: string, thanhCong: boolean) {
  const loai = thanhCong ? "success" : "error";
  const html = `<!doctype html><meta charset="utf-8"><title>Đang đăng nhập…</title>
<body style="font:15px system-ui;padding:2rem">${thanhCong ? "Đăng nhập xong, đang quay lại…" : "Đăng nhập thất bại: " + noiDung}
<script>
(function () {
  var payload = 'authorization:github:${loai}:' + ${JSON.stringify(noiDung)};
  function gui(e) { window.opener.postMessage(payload, e.origin); }
  window.addEventListener('message', gui, false);
  window.opener && window.opener.postMessage('authorizing:github', '*');
})();
</script>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("admin_oauth_state="))
    ?.slice("admin_oauth_state=".length);

  if (!code) return ketQua("Thiếu mã xác thực từ GitHub", false);
  if (!state || state !== cookieState) return ketQua("State không khớp — thử đăng nhập lại", false);

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_ID,
      client_secret: process.env.GITHUB_OAUTH_SECRET,
      code,
    }),
  });

  const data = (await res.json()) as { access_token?: string; error_description?: string };
  if (!data.access_token) return ketQua(data.error_description ?? "GitHub không trả về token", false);

  return ketQua(JSON.stringify({ token: data.access_token, provider: "github" }), true);
}
