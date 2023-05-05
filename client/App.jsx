// Project 7: React Chat
// Team ALJI

import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <div>
      <div className="App">
        <Header />
      </div>
      <Auth />
      <Footer />
    </div>
  );
}

export default App;
