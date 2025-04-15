import renderer from 'react-test-renderer';
import AuthCardWrapper from './AuthCardWrapper';
import { MockTheme } from '../../../testUtils';

test('Should render the auth card wrapper with 1 child', () => { 
    const instance = renderer.create(
        <MockTheme>
            <AuthCardWrapper>
                <h1>Mock child</h1>
            </AuthCardWrapper>
        </MockTheme>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
    //Expect the auth card to have exactly 1 child
    expect(instance.children.length).toEqual(1)
 })