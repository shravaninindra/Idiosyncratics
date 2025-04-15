import renderer from 'react-test-renderer';
import { SetupDefaults } from '../../../../testUtils';
import { ResumeUpload } from '.';
import { render, waitFor } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';


 test('Should render the resume upload component with a upload option', () => { 
    const instance = renderer.create(
       <SetupDefaults>
            <ResumeUpload />
        </SetupDefaults>
    ).toJSON()
    //Validate that the component got rendered without any errors
    expect(instance).not.toBeNull()
 })

 test('Clicking the "Paste resume content" button should render the resume text box', async () => {
   const { getByText } = render(<SetupDefaults>
      <ResumeUpload />
  </SetupDefaults>);

   Simulate.click(getByText('Paste resume content instead?'));
   await waitFor(() => getByText('Upload a file?'));
   expect(getByText('Resume Content')).toBeDefined()
 });
