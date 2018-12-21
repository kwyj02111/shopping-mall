import Home from '../components/Home';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => ({
    tabState: state.tabState,
});

const mapDispatchToProps = (dispatch) => ({
    onChangeTab: (tab) => {
        if(typeof tab === 'undefined'){
            return;
        }

        if(tab !== 'item' && tab !== 'store'){
            return;
        }

        dispatch(actions.tabChange(tab));
    }
});

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeContainer;