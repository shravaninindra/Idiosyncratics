import React from 'react';

// material-ui
import { Grid } from '@material-ui/core';

import { JobUploadSteps } from './stepper';
import { steps } from './utils';

const ResumeScanDashboard = () => {
    return (
        <Grid container>
            <JobUploadSteps
                stepLabels={steps.map(step => step.name)}
                steps = {steps}
                renderChildren={({ activeStep }) => {
                    const Comp = steps[activeStep].component
                    return <Comp />
                }}
            />
        </Grid>
    );
};

export default ResumeScanDashboard;
