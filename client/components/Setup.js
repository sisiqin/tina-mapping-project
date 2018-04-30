import React from "react";
import { connect } from "react-redux";
import store from "../store";
import { NavLink, withRouter } from "react-router-dom";
import { postARecord, fetchAllHistory } from "../store/setup";
import Timer from "./Timer";

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {
    newRecord: state.setup
  };
};

class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffeeBean: "",
      grindLevel: "Medium-Coarse Grind",
      coffeeBeanAmount: 0,
      waterAmount: 0,
      comment: "",
      love: true,
      renderTimer: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculateWaterAmount = this.calculateWaterAmount.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    store.dispatch(postARecord(this.state));
    this.setState({ renderTimer: true });
  }

  calculateWaterAmount(coffeeBeanAmount) {
    return coffeeBeanAmount * 17.5;
  }

  render() {
    let displayTimer = this.state.renderTimer ? <Timer /> : null;
    return (
      <div className="setup-container">
        <form>
          <p>
            {" "}
            <label className="col-sm-2 col-form-label"> Coffee Bean </label>
            <input
              name="coffeeBean"
              type="text"
              onChange={e => this.setState({ coffeeBean: e.target.value })}
              value={this.state.coffeeBean}
            />
          </p>

          <p>
            {" "}
            <label className="col-sm-2 col-form-label"> Grind Level </label>
            <select
              className="setup-grindlevel"
              value={this.state.grindLevel}
              name="grindLevel"
              onChange={e => this.setState({ grindLevel: e.target.value })}
            >
              <option value="Medium-Coarse Grind"> Medium-Coarse Grind </option>
              <option value="Medium Grind"> Medium Grind </option>
              <option value="Medium-Fine Grind"> Medium-Fine Grind </option>
            </select>
          </p>

          <p>
            {" "}
            <label className="col-sm-2 col-form-label">
              {" "}
              Coffee Bean Amount{" "}
            </label>
            <input
              name="coffeeBeanAmount"
              type="text"
              onChange={e =>
                this.setState({
                  coffeeBeanAmount: e.target.value,
                  waterAmount: this.calculateWaterAmount(e.target.value)
                })}
              value={this.state.coffeeBeanAmount}
            />{" "}
            g
          </p>

          <p>
            {" "}
            <label className="col-sm-2 col-form-label"> Water Amount </label>
            <button
              type="button"
              value={this.state.waterAmount}
              onClick={e => {
                this.setState({ waterAmount: Number(e.target.value) - 1 });
              }}
            >
              {" "}
              -{" "}
            </button>
            <input
              name="waterAmount"
              type="text"
              onChange={e => this.setState({ waterAmount: e.target.value })}
              value={this.state.waterAmount}
            />{" "}
            mL
            <button
              type="button"
              value={this.state.waterAmount}
              onClick={e => {
                this.setState({ waterAmount: Number(e.target.value) + 1 });
              }}
            >
              {" "}
              +{" "}
            </button>
          </p>

          <button
            type="button"
            onClick={this.handleSubmit}
            className="btn setup-add-btn"
          >
            {" "}
            GO!{" "}
          </button>
        </form>
        {displayTimer}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
