/**
 * Created by agros on 07.06.2019.
 */
import React, {Fragment} from 'react';
import spinner from '../../../../blog/src/components/layout/spinner.gif'

//Spinner component
export default () => (
    <Fragment>
        <img
            src={spinner}
            style={{width: '200px', margin: 'auto', display: 'block'}}
            alt='Loading...'
        />
    </Fragment>
);