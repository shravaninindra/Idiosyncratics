import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
export const ResultsGridStatusCell = (props) => {
    const cellValue = props.value;
    return <>{cellValue ? <DoneIcon color="success" /> : <ClearIcon color="error" />}</>;
};
