import React from 'react';
import Typography from '@material-ui/core/Typography';

interface TitleProps {
    contenido: string
}

const Title = ({contenido} : TitleProps) => {
    return (
        <Typography variant="h6" style={{marginTop: 10}}>
            {contenido}
        </Typography>
    );
};

export default Title;