import React from "react";
import TopBanner from "@/components/topbanner";
import Gallery from "@/components/slides";
import DatePanel from "@/components/datepick";
import "bootstrap/dist/css/bootstrap.css";
import Discription from "@/components/discribes";
import Neos from "@/components/neos";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      neoLst: []
    };
  }

  callBackFromDatePicker = pickedDate => {
    this.setState({ date: pickedDate });
  };

  callBackFromDes = lst => {
    if (this.state.neoLst != lst) {
      console.log(lst);
      this.setState({ neoLst: lst });
    }
  };

  render() {
    return (
      <div>
        <TopBanner />
        <Gallery time={this.state.date} />
        <Discription
          time={this.state.date}
          callbackFromParent={this.callBackFromDes}
        />
        <DatePanel parentCallback={this.callBackFromDatePicker} />
        <Neos data={this.state.neoLst} />
        <h6 ClassName="bg-dark text-light">Copyright: Peng Wei</h6>
      </div>
    );
  }
}

export default App;
