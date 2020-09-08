import React from 'react';
import vehicleRecordsIcon from "./assets/vehicleRecordsIcon.png";
import './Records.css'
import RecordsPanel from './RecordsPanel';

class RecordsIcon extends React.Component {
  constructor() {
    super()
    this.handleMouseHover = this.handleMouseHover.bind(this)
    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }


  render() {
    return (
      <div className="iconHolder">
        <div className="recordsIcon">
          <div
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}>
            <img src={vehicleRecordsIcon} alt="vehicleRecordIcon"
            />
            {
              this.state.isHovering &&
              <div>
                <RecordsPanel />
              </div>
            }
          </div>
        </div>
      </div>

    );
  }


}

export default RecordsIcon;
