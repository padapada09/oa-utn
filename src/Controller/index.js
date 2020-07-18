import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const styles = {
    option_button: {
        flexShrink: 0,
        width: '50px',
        height: '50px',
        margin: '10px',
        bottom: '0px',
        position: 'absolute',
        borderRadius: '25px',
        textAlign: 'center', 
        transition: 'all 0.5s',
        textVerticalAlign: 'center',
    },
    main_button: {
        flexShrink: 0,
        width: '50px',
        height: '50px',
        margin: '10px',
        borderRadius: '25px',
        textAlign: 'center', 
        textVerticalAlign: 'center',
        zIndex: 99,
        transform: 'rotate(225deg)',
        transition: 'all 0.5s'
    },
    collapsed_button: {
        transform: 'rotate(0deg)'
    },
    container: {
        position: 'fixed',
        bottom: '10px', 
        right: '10px',
        display: 'flex',
        flexDirection: 'column-reverse',
    },
    collapsed_options: {
        top: '70px',
        height: '70px'
    }
}

const Controller = (props) => {

    const [collapsed, collapse] = useState(true);

    return (
        <div style={styles.container}>
            <Button style={{...styles.main_button, ...(collapsed && styles.collapsed_button)}} onClick={() => collapse(!collapsed)}>+</Button>
            <Button variant="secondary" style={{...styles.option_button, ...(!collapsed && {bottom: '70px'})}}>1</Button>
            <Button variant="secondary" style={{...styles.option_button, ...(!collapsed && {bottom: '140px'})}}>2</Button>
            <Button variant="secondary" style={{...styles.option_button, ...(!collapsed && {bottom: '210px'})}}>3</Button>
        </div>
    );
}

export default Controller;