import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Title } from 'Types';

const TitleViewer = ({titulo} : Title) => {
    return (
        <Typography variant="h6" style={{marginTop: 10}}>
            {titulo}
        </Typography>
    );
};

export default TitleViewer;