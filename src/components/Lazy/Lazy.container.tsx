import {connect} from 'react-redux';

import Lazy from './Lazy';
import * as action from './action';

export default connect(null, action)(Lazy);