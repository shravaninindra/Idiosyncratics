import renderer from 'react-test-renderer';
import { SetupDefaults } from '../../../testUtils';
import LogoSection from '.';

 test('Should render the logo component without any errors', () => { 
    const instance = renderer.create(
      <SetupDefaults>
         <LogoSection />
      </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
 })

 
