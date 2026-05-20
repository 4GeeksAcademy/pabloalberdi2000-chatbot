import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AnalyticsPanel from "../components/AnalyticsPanel";
import ChatContainer from "../components/ChatContainer";
import InputArea from "../components/InputArea";

export default function Home() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col">
            <ChatContainer />
            <InputArea />
          </div>
          <AnalyticsPanel />
        </div>
      </div>
    </div>
  );
}
