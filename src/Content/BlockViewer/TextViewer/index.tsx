import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Text } from 'Types';

const TextViewer = ({texto} : Text) => {
    return (
        <Typography variant="body1" style={{marginTop: 10, whiteSpace: "pre-wrap"}}>
            {`${texto}`}
        </Typography>
    );
};

export default TextViewer;