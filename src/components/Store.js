import React, {Component} from 'react';
import STORE_JSON from '../assets/data/store.json';
import '../assets/css/store.css';

class Store extends Component {

    constructor(props) {
        super();

        this.state = {
            storeList : [],
        }
    }

    componentDidMount() {
        this.setState({
            storeList: STORE_JSON.data,
        });
    }

    render() {

        return (
            <div className="store-container">
                <ul className="store-list-container">
                    {this.state.storeList.map((item, idx) =>
                        <li key={idx}
                            className="store-contents"
                            onClick={() => window.open(item.url)}
                        >
                            <div className="store-ranking-container">
                                <div className="store-ranking">{idx+1}</div>
                            </div>

                            <img src={item.image.url} className="store-contents-image" alt="" />

                            <div className="store-contents-info-area">
                                <div className="store-contents-name">
                                    {item.name}
                                </div>

                                <div className="store-contents-description">
                                    {item.description}
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
};

export default Store;