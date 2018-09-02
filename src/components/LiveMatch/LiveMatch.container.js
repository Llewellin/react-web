import { connect } from 'react-redux';

import LiveMatch from './LiveMatch';
import * as action from './action';

const mapStateToProps = state => ({
    lang: state.lang,
    matchData: state.liveMatch.matchData,
    isLoading: state.loading.liveMatch,
    errMsg: state.liveMatch.errMsg,
});

export default connect(
    mapStateToProps,
    action,
)(LiveMatch);
