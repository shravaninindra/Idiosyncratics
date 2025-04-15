import React from 'react'
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { columns, getRows } from './ResultsGridData';

export const ResultsGrid = ({gridData}) => {
    return (
        <div
            className="ag-theme-alpine"
            style={{ height: "100%", width: "100%" }}
        >
            <AgGridReact
                rowData={getRows({gridData})}
                columnDefs={columns}
            // onGridReady={({api}) => setGridApi(api)}
            />
        </div>
    )
}