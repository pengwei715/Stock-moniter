import React from "react";
import BottomBar from "@/components/BottomBar";
import SortTable from "@/components/TopBar"
import "bootstrap/dist/css/bootstrap.css";


class App extends React.Component {
  render() {
    return (
      <div>
        <SortTable/>
        <BottomBar/>
      </div>
    );
  }
}

export default App;