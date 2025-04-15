import renderer from 'react-test-renderer';
import Avatar from './Avatar';
import { SetupDefaults } from '../../testUtils';

 test('Should render the user avatar', () => { 
    const instance = renderer.create(
       <SetupDefaults>
            <Avatar />
        </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
 })