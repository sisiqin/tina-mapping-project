import React from 'react';
import {connect} from 'react-redux';
import { fetchAllNpo }  from '../store';
import GoogleMapReact from 'google-map-react';
import OnePoint from './OnePoint';


const mapDispatchToProps = (dispatch) => ({
    getAllNpo() {
        dispatch(fetchAllNpo());
    }
})

const mapStateToProps = (state) => ({
    allnpo: state.npo
})


class Nabar extends React.Component {
    constructor() {
        super();
        this.state = {
            center: { lat: 40.705, lng: -74.009 },
            zoom: 11,
            close: null
        }
    }

    componentDidMount () {
        this.props.getAllNpo();
    }

    render() {
        return (
            this.props.allnpo 
            ? (<div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAUs0_zXHXXInH_f3A2rmuLD_ZQ6G_k0RU',
                                        language: 'en' }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                    resetBoundsOnResize = {true}
                >
                {this.props.allnpo.map( (ele, i) => <OnePoint key={i} lat={ele.geo_location.lat} lng={ele.geo_location.lng} npo={ele} /> )}

                </GoogleMapReact>
            
            </div>)
            : (<div />) 
        )   
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Nabar);

