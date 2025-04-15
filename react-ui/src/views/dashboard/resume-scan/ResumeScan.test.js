import renderer from 'react-test-renderer';
import ResumeScanDashboard from '.';
import { SetupDefaults } from '../../../testUtils';

 test('Should the resume scan dashboard without any errors', () => { 
    const instance = renderer.create(
       <SetupDefaults>
            <ResumeScanDashboard />
        </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
 })

 
