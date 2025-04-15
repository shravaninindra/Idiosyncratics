import renderer from 'react-test-renderer';
import { SetupDefaults } from '../testUtils';
import NavMotion from './NavMotion';

 test('Should render the navigation motion component without any errors', () => { 
    const instance = renderer.create(
       <SetupDefaults>
            <NavMotion />
        </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
 })

 
