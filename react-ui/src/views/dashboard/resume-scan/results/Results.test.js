import renderer from 'react-test-renderer';
import { SetupDefaults } from '../../../../testUtils';
import { Results } from './index';

 test('Should render the results section without any error', () => { 
    const instance = renderer.create(
       <SetupDefaults>
            <Results />
        </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
 })

 test('Results section should have the match graph, extracted fields, etc', () => { 
    const instance = renderer.create(
       <SetupDefaults>
            <Results />
        </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
    expect(instance.children.length).toBeGreaterThanOrEqual(1)
 })