const initialState = {
    tab : 'item',
};

const tabState = (state = initialState, action) => {
    switch (action.type) {
        case 'TAB_CHANGE':
            return {
                tab: action.tab,
            };
        default:
            return state
    }
}

export default tabState