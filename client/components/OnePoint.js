import React from 'react';
import {connect} from 'react-redux';
import { Card, Icon } from 'semantic-ui-react';


class OnePoint extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            clicked: false 
        }
        this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({clicked: !this.state.clicked })
    }


    render() {
        const MARKER_SIZE = "40px";
        const markerOuter = {
                position: 'absolute',
                left: "-20px",
                top: "-20px",
                display: "inline-block",
                borderRadius: "50% 50% 50% 0",
                width: "18px",
                height: "18px",
                border: "6px solid #f33",
                transform: "rotate(-45deg)"
            }
        const markerInner = {
            width: "14px",
            height: "14px",
            margin: "8px 0 0 8px",
            background: "white",
            position: "absolute",
            borderRadius:  "50%"
        }
        return (
          <div>
            <div style={markerOuter} onClick={() => this.handleClick()} />
            {this.state.clicked 
                ? showCard(this.props.npo)
                : <div />}
          </div>
        )
    }
}
export default connect()(OnePoint);

const showCard = (npo) => (
  <div className="card" style={{width: "18rem", zIndex: 100}}>
  <div className="card-header text-center"> 
  <h6>{npo.name}</h6>
  </div> 
  <div className="card-body">
    <p className="card-text">EIN: {npo.ein}</p>
    <p className="card-text">Mission Statement: {npo.missionstatement || "NAN"}</p>
    <p className="card-text">Assets: {npo.assests || "NAN"}</p>
    <p className="card-text">Gross Receipts: {npo.gross_receipts || "NAN"}</p>
    <p className="card-text">Funded At: {npo.funded_year || "NAN"}</p>
    <p className="card-text">CEO & gender: {npo.ceo || "NAN"} , {npo.gender_of_ceo || "NAN"}</p>
    <p className="card-text">Cause Area: {npo.cause_area || "NAN"}</p>
    <p className="card-text">NTEE Code: {npo.ntee_code}</p>
    <p className="card-text">IRS Filling Requirement: {npo.irs_filling_year || "NAN"}</p>
    <p className="card-text">IRS Filling Subsetion: {npo.irs_subsetion || "NAN"}</p>

  </div>
</div>
)