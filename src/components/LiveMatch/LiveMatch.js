import React, { PureComponent } from 'react';
import Carousel from 'nuka-carousel';
import MDSpinner from 'react-md-spinner';
import moment from 'moment';

import { iconMapping } from './constants';
import style from './style.scss';

export default class extends PureComponent {
    componentDidMount() {
        this.props.fetchMatchData();
    }

    _calculateTime(id) {
        const currentTime = moment().format();
        const startTime = moment(this.props.matchData[id].event.start).format();
        const displayDate =
            currentTime.toString().slice(0, 10) ===
            startTime.toString().slice(0, 10)
                ? this.props.lang.Today
                : startTime.toString().slice(0, 10);
        const displayTime = startTime.toString().slice(11, 16);

        return `${displayDate} - ${displayTime}`;
    }

    _renderButton(id) {
        this.props.placeBet(id);
    }

    _renderContent() {
        if (this.props.errMsg.matchData) {
            return <div className="err-msg">{this.props.errMsg.matchData}</div>;
        } else {
            return (
                <Carousel
                    autoplay={true}
                    autoplayInterval={3500}
                    speed={500}
                    pauseOnHover={false}
                    // dragging={false}
                    renderBottomCenterControls={() => true}
                    renderCenterLeftControls={() => false}
                    renderCenterRightControls={() => false}
                >
                    {Object.keys(this.props.matchData).map(id => {
                        const { event, liveData } = this.props.matchData[id];

                        //get the correct icon
                        let icon;
                        if (
                            Object.keys(iconMapping).includes(
                                event.sport.toLowerCase(),
                            )
                        ) {
                            icon = iconMapping[event.sport.toLowerCase()];
                        } else {
                            icon = iconMapping.default;
                        }

                        //defense checking. Sometimes API return data with missing field
                        if (
                            liveData.score.home &&
                            liveData.score.away &&
                            event.homeName &&
                            event.awayName &&
                            event.start
                        ) {
                            return (
                                <div key={id} className="carousel-content">
                                    <div className="score">
                                        {`${liveData.score.home} - ${
                                            liveData.score.away
                                        }`}
                                    </div>
                                    <div className="name-container">
                                        <img className="icon" src={icon} />
                                        <p className="name">{`${
                                            event.homeName
                                        } - ${event.awayName}`}</p>
                                    </div>
                                    <div className="date">
                                        {this._calculateTime(id)}
                                    </div>
                                    <div className="bet-container">
                                        <button
                                            className="bet"
                                            onClick={() =>
                                                this._renderButton(id)
                                            }
                                        >
                                            {this.props.lang.place_bet}
                                        </button>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </Carousel>
            );
        }
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div id="carousel">
                    <MDSpinner size={50} borderSize={1} />
                </div>
            );
        } else {
            return <div id="carousel">{this._renderContent()}</div>;
        }
    }
}
