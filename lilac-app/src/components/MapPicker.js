import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Button } from 'antd';

import Icon from './Icon';

function MapPicker(props) {
    const { points, setCoords } = props;
    const [extra, setExtra] = useState([]);

    const setPoints = (val) => {
        setCoords(val);
        setExtra([...extra, { lat: 0, lng: 0 }]);
    };

    console.log('rerender');

    return (
        <>
            {points.map((point, index) => {

                return (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                Latitude: {point.lat} <br />
                                Longitude: {point.lng} <br />
                                <Button
                                    type="text"
                                    danger
                                    onClick={() => {
                                        let pointsCopy = points;
                                        pointsCopy[index] = { lat: 0, lng: 0 };

                                        pointsCopy.splice(index, 1);
                                        console.log(pointsCopy);
                                        setPoints(pointsCopy);
                                    }}
                                    disabled={points.length == 1}
                                >
                                    Remove
                                </Button>
                            </div>
                );
            })}
            {extra.map((point, index) => {

                return (
                    <div></div>
                );
            })}
        </>
    );
}

export default MapPicker;
