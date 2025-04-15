import renderer from 'react-test-renderer';

import Profile from '.';
import { SetupDefaults } from '../../../../testUtils';

 test('Should render the profile component without any errors', () => { 
    const instance = renderer.create(
      <SetupDefaults>
         <Profile />
      </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
 })