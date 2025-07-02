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
      color: "#4ADE80",
    },
    {
      id: 2,
      name: "Research",
      color: "#F472B6",
    },
    {
      id: 3,
      name: "Dev Tools",
      color: "#F472B6",
    },
    {
      id: 4,
      name: "Social Media",
      color: "#F472B6",
    },
  ],
  content: [
    {
      link: "https://www.google.com",
      title: "Google",
      description: "Google is a search engine",
      image:
        "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      tags: [
        {
          id: 1,
          name: "Productivity",
          color: "#4ADE80",
        },
        {
          id: 1,
          name: "Productivity",
          color: "#4ADE80",
        },
        {
          id: 1,
          name: "Productivity",
          color: "#4ADE80",
        },
        {
          id: 1,
          name: "Productivity",
          color: "#F472B6",
        },
        {
          id: 1,
          name: "Productivity",
          color: "#F472B6",
        },
        {
          id: 1,
          name: "Productivity",
          color: "#F472B6",
        },
        {
          id: 1,
          name: "Productivity",
          color: "#F472B6",
        },
      ],
      thumbnail:
        "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      hashtags: [
        {
          id: 1,
          name: "google",
        },
        {
          id: 1,
          name: "google",
        },
        {
          id: 1,
          name: "google",
        },
        {
          id: 1,
          name: "google",
        },
        {
          id: 1,
          name: "google",
        },
        {
          id: 1,
          name: "google",
        },
        {
          id: 1,
          name: "google",
        },
        {
          id: 1,
          name: "google",
        },
        {
          id: 1,
          name: "google",
        },
      ],
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
          <Content data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
