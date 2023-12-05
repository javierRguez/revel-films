export { default } from "next-auth/middleware";

// rutas protegidas por login
export const config = {
  matcher: ["/", "/movies/:path*"],
};
