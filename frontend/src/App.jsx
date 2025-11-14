import Landing1 from "./pages/Landing1";
import Landing2 from "./pages/Landing2";

export default function App() {
  const page = window.location.pathname.replace("/", "") || "1";

  return (
    <div>
      {page === "2" ? <Landing2 /> : <Landing1 />}
    </div>
  );
}