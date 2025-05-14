import React from "react";
import { connect } from "react-redux";
import SingleDataset from "./single";
import { goTo404 } from "../../actions/navigation";
import { fetchJSON } from "../../util/serverInteraction";
import { getServerAddress } from "../../util/globals";
import { getNormalizedPathname } from "../../util/urls";

@connect()
class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {available: undefined};
  }
  componentDidMount() {
    console.log("Status", `${getServerAddress()}/getAvailable?prefix=${getNormalizedPathname()}`);
    fetchJSON(`${getServerAddress()}/getAvailable?prefix=${getNormalizedPathname()}`)
      .then((json) => {this.setState({available: json});})
      .catch((err) => {
        console.warn(err);
        this.props.dispatch(goTo404("Error getting available datasets"));
      });
  }
  renderHeader() {
    return (
      <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", minHeight: "50px"}}>
        <div style={{flex: 1}}/>
        <div style={{fontSize: 18}}>
          {`Status of available datasets for URL prefix "${getNormalizedPathname()}"`}
        </div>
        <div style={{flex: 1}}/>
      </div>
    );
  }

  render() {
    if (!this.state.available || !this.state.available.datasets) return null;
    return (
      <div style={{maxWidth: 1020, marginLeft: "auto", marginRight: "auto"}}>
        {this.renderHeader()}
        {this.state.available.datasets.map((dataset) => (
          <SingleDataset key={dataset.request} path={dataset.request}/>
        ))}
      </div>
    );
  }
}

export default Status;
