import React, { useState } from "react";
import SurveyForm from "./components/SurveyForm";
import SurveyForm2 from "./components/SurveyForm2";
import EventRegistration from "./components/EventRegistration";
import "./index.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const renderTabContent = () => {
    switch (activeTab) {
      case "tab1":
        return <SurveyForm />;
      case "tab2":
        return <SurveyForm2 />;
      case "tab3":
        return <EventRegistration />;
      default:
        return <SurveyForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl p-4">
        <div className="mb-4 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button
                className={`inline-block p-4 rounded-t-lg border-b-2 ${activeTab === "tab1" ? "border-blue-500 text-blue-600" : "border-transparent hover:text-gray-600 hover:border-gray-300"}`}
                onClick={() => setActiveTab("tab1")}
              >
                Level 3 
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`inline-block p-4 rounded-t-lg border-b-2 ${activeTab === "tab2" ? "border-blue-500 text-blue-600" : "border-transparent hover:text-gray-600 hover:border-gray-300"}`}
                onClick={() => setActiveTab("tab2")}
              >
                Level 2
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`inline-block p-4 rounded-t-lg border-b-2 ${activeTab === "tab3" ? "border-blue-500 text-blue-600" : "border-transparent hover:text-gray-600 hover:border-gray-300"}`}
                onClick={() => setActiveTab("tab3")}
              >
                Level 1
              </button>
            </li>
          </ul>
        </div>
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default App;
