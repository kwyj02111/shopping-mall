import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';
import Store from './Store';
import '../assets/css/home.css';
import logo from '../assets/images/logo.png';

const Home = ({ tabState, onChangeTab }) => {

    return (
        <div className="home-container">
            <div className="header-container">
                <div className="logo-container">
                    <img src={logo} className="header-logo" alt="logo"/>
                </div>

                <ul className="tab-container">
                    <li className="tab-item">
                        <button
                            className={tabState.tab === 'item' ? "tab-item-btn active" : "tab-item-btn"}
                            onClick={() => onChangeTab('item')}
                        >
                            상품 모아보기
                        </button>
                    </li>
                    <li className="tab-item">
                        <button
                            className={tabState.tab === 'store' ? "tab-item-btn active" : "tab-item-btn"}
                            onClick={() => onChangeTab('store')}
                        >
                            쇼핑몰 리스트
                        </button>
                    </li>
                </ul>
            </div>

            <div className="tab-contents-container">
                {tabState.tab === 'item' ?
                    <Item />
                    : tabState.tab === 'store' ?
                    <Store />
                    : ''
                }
            </div>

        </div>
    );
};

Home.propTypes = {
    onChangeTab: PropTypes.func.isRequired,
};

Home.defaultProps = {
    tabState: {},
    onChangeTab: () => console.warn('onChangeTab not defined'),
};

export default Home;