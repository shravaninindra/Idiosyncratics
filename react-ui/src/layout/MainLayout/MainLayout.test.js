import renderer from 'react-test-renderer';
import MainLayout from '.';
import { SetupDefaults } from '../../testUtils';

 test('Should render the main layout component without any errors', () => { 
    const instance = renderer.create(
      <SetupDefaults>
         <MainLayout />
      </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
 })

 
