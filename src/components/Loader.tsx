import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
    return (
        <div data-testid="loader" style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: 40}}>
            <CircularProgress style={{alignSelf: 'center'}} /> 
        </div>
    );
};

export default Loader;