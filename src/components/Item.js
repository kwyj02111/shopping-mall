import React, {Component} from 'react';
import { isMobile } from 'react-device-detect';
import { sortBy } from 'underscore';
import ITEM_JSON from '../assets/data/item.json';
import '../assets/css/item.css';
import * as axiosService from '../services/axios';

class Item extends Component {

    constructor(props) {
        super();

        this.state = {
            itemList : [],
            isMobile : isMobile, //mobile check (mobile일 경우 true, 아닐경우 false)
            sort : 'popular',
            keyword : '',
        }
    }

    componentDidMount() {
    }

    // 아이템 sort (인기순, 가격높은순, 가격낮은순)
    sortItemList(type){
        if(typeof type === 'undefined'){
            return;
        }

        if(type !== 'asc' && type !== 'desc' && type !== 'popular'){
            return;
        }

        let list = this.state.itemList;
        let newList = list;

        if(type === 'asc'){
            newList = sortBy(list, 'price');
        }else if(type === 'desc'){
            newList = sortBy(list, 'price').reverse();
        }else{
            newList = ITEM_JSON.data;
        }

        this.setState({
            sort: type,
            itemList : newList
        });

        return;
    }

    //3자리 마다 콤마 찍어 주기
    numberWithCommas(num){

        if(typeof num === 'undefined' || num === null || num === '' || num === '.'){
            return '';
        }

        let checkNum = num.toString().split('.');
        let result = checkNum[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        for(let i=1; i<checkNum.length; i++){
            result = result + '.' + checkNum[i];
        }

        return result;
    }

    addSearchInputKeyPress = (event) => {

        if (event.keyCode === 13 || event.charCode === 13) {
            this.getSearchData();
        }

        return;
    }

    updateSearchValue(event) {
        this.setState({
            keyword: event.target.value
        });

        return;
    }

    getSearchData = async () => {

        if(this.state.keyword === ''){
            return;
        }

        try {
            let url = `https://dev-soho-api.stylesha.re/kr/products/search`;
            let params = {
                keyword : this.state.keyword,
            }

            const itemList = await axiosService.getData(url, params);

            this.setState({
                itemList: itemList.data.data,
                keyword : '',
            });

            console.log(this.state);

        } catch(e) {

            this.setState({
                keyword: ''
            });
            console.log(e);
        }
    }

    render() {

        return (
            <div className="item-container">
                <div className="list-search-container">
                    <input
                        className="list-search-input"
                        type="text"
                        value={this.state.keyword}
                        onKeyPress={this.addSearchInputKeyPress}
                        onChange={event => this.updateSearchValue(event)}
                        autoFocus
                    />
                </div>

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