import renderer from 'react-test-renderer';
import { SetupDefaults } from '../../../../testUtils';
import Login from '.';

test('Should render the login page', () => { 
    const instance = renderer.create(
       <SetupDefaults>
            <Login />
        </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
 })