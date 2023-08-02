/* eslint-disable react/no-danger-with-children */
/* eslint-disable no-const-assign */
import React, { Component } from 'react';
import { formatDistance } from 'date-fns';
import { formatDate } from '../utils/commonfunctions.js';

class IndiaUpdates extends Component {
    render() {
        const newDate = new Date();
        const currentDate = newDate;
        const { show, updates } = this.props;
        return (
            show === true ?
                <div className="updateContainer">
                    <h4 className="updateHeader">
                        {formatDate(currentDate, 'd MMM yyyy')}
                    </h4>
                    {updates.slice(-5).reverse().map(function (update, id) {
                        update.update = update.update.replace(/\n/g, '<br/>');
                        const updateDate = new Date(update.timestamp * 1000);
                        const dateHeader = () => {
                            currentDate = updateDate;
                            return (
                                <div>
                                    {id === 0 ?
                                        <h4 className="updatesContainer">
                                            No updates yet!
                                        </h4>
                                        : ''
                                    }
                                    <h4 className="updateHeader">
                                        {formatDate(updateDate, 'd MMM yyyy')}
                                    </h4>
                                </div>
                            );
                        };
                        return (
                            <div key={id}>
                                {
                                    updateDate.getDate() !== currentDate.getDate()
                                        ? dateHeader
                                        : ' '
                                }
                                < div key={id} className="updatesContainer">
                                    <p className="updateTimestamp">
                                        {formatDistance(
                                            new Date(update.timestamp * 1000),
                                            new Date())} ago
                                        </p>
                                    <p className="updateValue"
                                        dangerouslySetInnerHTML={{
                                            __html: update.update,
                                        }}
                                    ></p>
                                </div>
                            </div>
                        );
                    })
                    }
                </div > : null
        );
    }
}
export default IndiaUpdates;