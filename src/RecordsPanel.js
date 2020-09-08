import React from 'react';
import axios from "axios";
import iPacketLogo from "./assets/iPacketLogo.png";
import arrow from './assets/arrow.png'


class RecordsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicle: {},
            modules: [],
            vdpBase: '',
            success: false,
        };
    }


    //Get to API endpoint provided by AutoiPacket
    componentDidMount() {
        axios.get("https://exp-djapi.autoipacket.com/v1/packets/interview-test-data/55SWF4JB4HU198271")
            .then(res => {
                console.log(res)
                const records = res.data
                const modules = records.modules
                const vehicles = records.vehicle
                const vdpBase = records.vdp_base
                const correctedModules = modules.map(this.transformData)
                this.setState({
                    vehicle: vehicles,
                    modules: correctedModules,
                    vdpBase: vdpBase,
                    success: true,
                });
            })
            .catch(error => {
                console.error('API failed to connect to host data', error)
                this.setState({
                    success: false,
                })
            })
    }

    //VDP location for Carfax was incorrect and needed to be only capital "C"
    transformData(record) {
        if (record.vdp_location === "CARFAX") {
            record.vdp_location = "Carfax"
        }
        return record
    }

    render() {
        if (this.state.success === false) {
            return "Error VIN not found"
        }


        const vdpBaseURL = this.state.vdpBase
        const stockType = this.state.vehicle.stock_type
        let title = ''
        console.log(vdpBaseURL)
        if (stockType === "po") {
            title = <p>{"Pre-Owned " + this.state.vehicle.year + " " + this.state.vehicle.make + " " + this.state.vehicle.model}</p>
        }
        else {
            title = <p>{this.state.vehicle.year + " " + this.state.vehicle.make + " " + this.state.vehicle.model}</p>
        }

        return (
            <div className="recordsPanel" id="recordsPanel" >
                <div className="header">
                    <img src={iPacketLogo} style={{ height: "25px" }} alt="iPacketLogo"></img>
                </div>
                <div id="title">
                    {title}
                </div>
                <div>
                    {this.state.modules.map((module) => (
                        <div key={module.label} id="moduleInfo" onClick={() => window.location.href = vdpBaseURL.slice(0, 8) + "www." +
                            vdpBaseURL.slice(8) + "#" + module.vdp_location}>
                            <img src={module.icon} id="moduleIcon" alt="moduleIcon" />
                            <p id="moduleLabel">{module.label}</p>
                            <img id="arrowIcon" src={arrow} onClick={() => window.location.href = vdpBaseURL.slice(0, 8) + "www." +
                                vdpBaseURL.slice(8) + "#" + module.vdp_location} />
                        </div>
                    ))}
                </div>
                <div id="buttonDiv">
                    <button className="button" onClick={() => window.location.href = vdpBaseURL} >VIEW DOCUMENTS</button>
                    <p>Click to view all available documentation.</p>
                </div>
            </div>
        )
    }
}


export default RecordsPanel