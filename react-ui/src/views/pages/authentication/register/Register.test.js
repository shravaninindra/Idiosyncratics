import renderer from 'react-test-renderer';
import { SetupDefaults } from '../../../../testUtils';
import Register from '.';

test('Should render the register page', () => { 
    const instance = renderer.create(
       <SetupDefaults>
            <Register />
        </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
 })