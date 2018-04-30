import React from "react";
import { connect } from "react-redux";
import store from "../store";
import { NavLink, withRouter } from "react-router-dom";
import Stopwatch from "timer-stopwatch";
import Finish from "./Finish";
import { fetchAllHistory } from "../store/history";

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {
    rencentRecord: state.setup
  };
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: 5,
      done: false,
      addWater: 0,
      totalTime: 0,
      totalWater: 0
    };
    this.timer = 0;
    this.currentWater = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.caltTimeSec = this.caltTimeSec.bind(this);
    this.round = this.round.bind(this);
  }
  componentDidMount() {
    store.dispatch(fetchAllHistory());
  }


  // functions
  caltTimeSec(waterAmount) {
    if (waterAmount < 290) return 120;
    if (waterAmount > 440) return 210;
    const restWater = waterAmount - 290;
    return 120 + restWater * 0.6;
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      m: minutes,
      s: seconds
    };
    return obj;
  }


  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
    // counting water
    let totalTime = this.state.totalTime - 1;
    let currentTime = this.state.seconds;
    let waterAmount = this.state.totalWater;
    let addedWater = this.state.addWater;
    let firstRoundUnit = waterAmount * 0.3 / 20;
    let secondRountTime = totalTime - 48;
    let secondRountUnit = waterAmount * 0.7 / secondRountTime;
    let timeFromStart = totalTime - currentTime;
    if (timeFromStart < 21) {
      this.currentWater += firstRoundUnit;
      this.setState({ addWater: Math.floor(this.currentWater) });
    } else if (timeFromStart < 51) {
    } else if(timeFromStart < totalTime){
      this.currentWater += secondRountUnit;
      this.setState({ addWater: Math.floor(this.currentWater) });
    } else{
      this.currentWater = this.state.totalWater
      this.setState({ addWater: this.currentWater });
    }

    // Check if we're at zero.

    if (seconds == 0) {
      clearInterval(this.timer);
      this.setState({ done: true });
    }
  }

  render() {
    if (this.props.rencentRecord) {
      const totalWater = this.props.rencentRecord.waterAmount;
      const correctTime = this.caltTimeSec(totalWater);
      let displayWater = 0;
      let finish = this.state.done ? <Finish /> : null;
      //this.start(correctTime,totalWater );
      return (
        <div className="timer-container">
          <div className="timer-countdown">
            <span className="timer-min"> {this.state.time.m}</span> <span> m </span>
            
            <span className="timer-sec">{this.state.time.s}</span> <span> s </span>
          </div>

          <div className="timer-water-amount">
            <span className="timer-added-water">{this.state.addWater} </span>
            <span>mL water </span> 
            
          </div>
          <button type="button"
          className="btn timer-start-btn"
          onClick={e => {
            this.setState({ seconds: correctTime });
            this.setState({ totalTime: correctTime });
            this.setState({ totalWater: totalWater });
            this.startTimer();
          }}>Start
        </button>

          
          {finish}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
