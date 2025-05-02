import "./App.css";
import Header from "./components/Header";
import Tags from "./components/Tags";
import Content from "./components/Content";
import { LinklotData } from "./types";

const data: LinklotData = {
  tags: [
    {
      id: 1,
      name: "Productivity",
      color: "#02B99A",
    },
    {
      id: 2,
      name: "Research",
      color: "#7DE2F1",
    },
    {
      id: 3,
      name: "Dev Tools",
      color: "#F17E91",
    },
    {
      id: 4,
      name: "Social Media",
      color: "#F9C557",
    },
  ],
};

function App() {
  return (
    <div>
      <Header />
      <div className="bg-linklot-background-gray">
        <div className="app-container">
          <Tags data={data} />
          <Content />
        </div>
      </div>
    </div>
  );
}

export default App;
