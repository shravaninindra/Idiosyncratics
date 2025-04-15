import * as React from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@material-ui/core';
import { connect } from 'react-redux';
import { setJobDescriptionContent, setResumeContent } from '../../../../store/resumeActions';

const JobUploadStepsWithoutProps = ({renderChildren, stepLabels, steps, reduxState, setResumeContent, setJobDescriptionContent}) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if(steps[activeStep].handleNext){
      steps[activeStep].handleNext(reduxState, {setResumeContent, setJobDescriptionContent})
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Stepper activeStep={activeStep} style={{ marginBottom: '10px'}}>
        {stepLabels.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
        <>
            {renderChildren({activeStep})}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
            <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext} disabled={activeStep >= stepLabels.length-1}>
                    Next
                </Button>
            </Box>
        </>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  reduxState : state.resume
})

const mapDispatchToProps = (dispatch) => ({
  setResumeContent: (content) => dispatch(setResumeContent(content)),
  setJobDescriptionContent: (content) => dispatch(setJobDescriptionContent(content))
})

export const JobUploadSteps = connect(mapStateToProps, mapDispatchToProps)(JobUploadStepsWithoutProps)
