import React from 'react';
import { Image } from 'Types';
import classes from './styles.module.scss';

const ImgViewer = ({src} : Image) => {
    return (
        <div className={classes.container}>
            <img 
                className={classes.img}
                src={src}
            />
        </div>
    );
};

export default ImgViewer;