import renderer from 'react-test-renderer';
import { SetupDefaults } from '../testUtils';
import Routes from '.';

 test('Should render all the routes without any error', () => { 
    const instance = renderer.create(
       <SetupDefaults>
            <Routes />
        </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
 })

 
