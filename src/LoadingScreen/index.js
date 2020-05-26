import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './styles.module.scss';

const LoadingScreen = ({message}) => {
    return (
        <div className={styles.Container}>
            <Spinner animation="border" role="status" />
            <h1>{message}</h1>
        </div>
    );
}

export default LoadingScreen;