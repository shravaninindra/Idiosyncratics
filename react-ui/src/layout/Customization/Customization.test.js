import renderer from 'react-test-renderer';
import Customization from '.';
import { SetupDefaults } from '../../testUtils';

 test('Should render the customization component without any errors', () => { 
    const instance = renderer.create(
       <SetupDefaults>
            <Customization />
        </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).toBeNull()
 })

 
