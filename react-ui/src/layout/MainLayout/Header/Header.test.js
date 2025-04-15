import renderer from 'react-test-renderer';
import { SetupDefaults } from '../../../testUtils';
import Header from '.';

 test('Should render the header component without any errors', () => { 
    const instance = renderer.create(
      <SetupDefaults>
         <Header />
      </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
 })