import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './styles.module.scss';

const LoadingScreen = ({message = "Cargando"}) => {

    return (
        <div className={styles.Container}>
            <Spinner animation="border" role="status" />
            <h1 className={styles.Message}>{message}</h1>
        </div>
    );
}

export default LoadingScreen;