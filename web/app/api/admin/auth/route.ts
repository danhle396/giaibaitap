/**
 * Bước 1 của đăng nhập GitHub cho trang /admin (Decap CMS).
 * Đưa người dùng sang GitHub để cấp quyền, rồi GitHub gọi lại /api/admin/callback.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const clientId = process.env.GITHUB_OAUTH_ID;
  if (!clientId) {
    return new Response("Thiếu biến môi trường GITHUB_OAUTH_ID", { status: 500 });
  }

  const origin = new URL(request.url).origin;
  const state = crypto.randomUUID();

  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", `${origin}/api/admin/callback`);
  authorize.searchParams.set("scope", "repo");
  authorize.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      // state lưu tạm trong cookie để callback đối chiếu, chống CSRF
      "Set-Cookie": `admin_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}
