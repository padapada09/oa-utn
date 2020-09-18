// import React from 'react';
// import Button from '@material-ui/core/Button';
// import {
//     red,
//     green,
//     blue
// } from 'colors';

export interface OptionProps {
    selected: boolean,
    success: boolean | undefined,
    children: React.ReactNode,
    onSelect?: () => void,
    disabled: boolean
}

// const Option = ({ selected, success, children, onSelect, disabled } : OptionProps) => {


//     return (
//         <Button 
//         fullWidth
//         onClick={onSelect}
//         disableRipple
//         disabled={disabled}
//         style={{
//             marginTop: 10,
//             marginBottom: 10,
//             backgroundColor: 'white',
//             color: 'black',
//             ...(selected && styles.selected),
//             ...(success !== undefined && (success ? styles.successfull : styles.failed))
//         }}>
//             {children}
//         </Button>
//     );
// };

// const styles = {
//     successfull: {
//         backgroundColor: green,
//         color: 'white'
//     },
//     failed: {
//         backgroundColor: red,
//         color: 'white'
//     },
//     selected: {
//         backgroundColor: blue,
//         color: 'white'
//     }
// };

// export default Option;