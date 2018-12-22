import React, {Component} from 'react';
import { isMobile } from 'react-device-detect';
import ITEM_JSON from '../assets/data/item.json';
import '../assets/css/item.css';

class Item extends Component {

    constructor(props) {
        super();

        this.state = {
            itemList : [],
            isMobile : isMobile,
        }
    }

    componentDidMount() {
        this.setState({
            itemList: ITEM_JSON.data,
        });
    }

    //3자리 마다 콤마 찍어 주기
    numberWithCommas(num){

        if(typeof num === undefined || num === null || num === '' || num === '.'){
            return '';
        }

        let checkNum = num.toString().split('.');
        let result = checkNum[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        for(let i=1; i<checkNum.length; i++){
            result = result + '.' + checkNum[i];
        }

        return result;
    }

    render() {

        return (
            <div className="item-container">

                <ul className="item-list-container">
                    {this.state.itemList.map((item, idx) =>
                        <li key={idx}
                            className={idx%3 === 0 ? "item-contents first" : "item-contents"}
                            onClick={() => this.state.isMobile ? window.open(item.mobileUrl) : window.open(item.url)}
                        >
                            <div className="item-contents-image-area">
                                <div className="item-contents-image-wrap">
                                    <img src={item.image.url} className="item-contents-image" alt="" />
                                </div>
                            </div>

                            <div className="item-contents-info-area">
                                <div className="item-contents-shop">
                                    {item.shopName}
                                </div>

                                <div className="item-contents-title">
                                    {item.title}
                                </div>

                                <div className="item-contents-price">
                                    {this.numberWithCommas(item.price)}원
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }

};

export default Item;