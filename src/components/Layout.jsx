import { Footer } from "./Footer";
import { Nav } from "./Nav";

export function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
