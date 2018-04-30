import React from "react";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {
    allHistory: state.history
  };
};

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "nothing"
    };
    this.format = this.format.bind(this);
  }

  format(dateStr){
	const year = dateStr.substring(11, 15)
	let month = dateStr.substring(4, 7)
	const day = dateStr.substring(8, 10)
	if(month === "Jan") month = "01"
	if(month === "Feb") month = "02"
	if(month === "Mar") month = "03"
	if(month === "Apr") month = "04"
	if(month === "May") month = "05"
	if(month === "Jun") month = "06"
	if(month === "Jul") month = "07"
	if(month === "Aug") month = "08"
	if(month === "Sep") month = "09"
	if(month === "Oct") month = "10"
	if(month === "Nov") month = "11"
	if(month === "Dec") month = "12"
	return [year, month, day].join("-")
}
render() {
    let yesterday = new Date(Date.now() - 864e5)
    yesterday = this.format(yesterday.toString())
    if (this.props.allHistory.length > 0) {
      let display;
      {this.state.filter === "love"
      ? display = this.props.allHistory.filter(his => his.love === true)
      : this.state.filter === "recent" 
        ? display = this.props.allHistory.filter(his => his.date >=  yesterday)
        : display = display = this.props.allHistory  
  }
      return (
        <div>

          <select className="history-filter"
            value={this.state.filter}
            onChange={e => this.setState({ filter: e.target.value })} >
           <option value="nothing"> all </option>
            <option value="recent"> recent </option>
            <option value="love"> love </option>
          </select>
          {display.map(oneHistory => {
            let date = oneHistory.date;
            return (
              <ul key={oneHistory.id} className="history-records">
                <li>
                  <span> {date.substring(0, 10)} </span>
                  <span> {oneHistory.coffeeBeanAmount} </span>
                  <span> {oneHistory.grindLevel} </span>
                  <span> {oneHistory.waterAmount} </span>
                  {oneHistory.love === true ? (
                    <span> 👍 </span>
                  ) : (
                    <span> 👎 </span>
                  )}
                </li>
              </ul>
            );
          })}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
