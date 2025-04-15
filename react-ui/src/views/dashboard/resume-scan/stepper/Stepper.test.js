import renderer from 'react-test-renderer';

import { SetupDefaults } from '../../../../testUtils';
import { JobUploadSteps } from '.';
import { steps } from '../utils';

 test('Should render the stepper component without any errors', () => { 
    const instance = renderer.create(
       <SetupDefaults>
            <JobUploadSteps stepLabels={steps.map(step => step.name)}
                steps = {steps}
                renderChildren={({ activeStep }) => {
                    const Comp = steps[activeStep].component
                    return <Comp />
                }}/>
        </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
 })

 test('Stepper should have 3 fields, resume upload, job description upload and results', () => { 
   const instance = renderer.create(
      <SetupDefaults>
           <JobUploadSteps stepLabels={steps.map(step => step.name)}
                steps = {steps}
                renderChildren={({ activeStep }) => {
                    const Comp = steps[activeStep].component
                    return <Comp />
                }}/>
       </SetupDefaults>
   ).toJSON()
   //Validate that the component got rendered without any errors
   expect(instance).not.toBeNull()
   expect(instance.children.length).toBeGreaterThanOrEqual(3)
})
