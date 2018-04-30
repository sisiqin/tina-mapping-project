import React from "react";
import { connect } from "react-redux";
import store from "../store";
import { NavLink, withRouter } from 'react-router-dom';
import { updateARecord } from "../store/setup";
import axios from 'axios';

const mapDispatchToProps = dispatch => {
  return {

  };
};

const mapStateToProps = state => {
  return {
    newRecord: state.setup
  };
};



class Finish extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            love: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
     handleSubmit (e)  {
        e.preventDefault();
        const id = Number(this.props.newRecord.id)
        const comment = this.state.comment;
        const love = this.state.love
        axios.put(`api/history/${id}`, {comment, love})
    }

    render(){

        return (
        <div className="finish">
        <form>         
          <p className="col-sm-2 col-form-label"> <label className="finish-comment"> Comment </label> 
            <input name="comment" className="finish-comment-input" type="text" onChange={e => this.setState({comment : e.target.value })} value={this.state.comment} />           
          </p>

          <p className="col-sm-2 col-form-label">  <label> Love </label> 
          <span onClick={() => this.setState({love : true })}> 👍 </span> 
          
          <span onClick={() => this.setState({love : false })}> 👎 </span> 
        
          </p>
          <button type="button" onClick={this.handleSubmit} className="btn finish-add-btn"> <NavLink to={'/history'}> YEAH! </NavLink> </button> 
          
        </form>
      </div>
    )
}

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Finish));
