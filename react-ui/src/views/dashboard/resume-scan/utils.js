import { ResumeUpload } from "./resume-upload";
import { JobDescription } from "./job-description"
import { Results } from "./results"
import { getJobDescriptionContent, getResumeContentWithFile, getResumeContentWithText } from "../../../api/apis";
export const steps = [
    {
        name: 'Upload your resume',
        component: ResumeUpload,
        handleNext: (reduxState, reduxDispatches) => {
            if(reduxState.resumeText !== '') {
                getResumeContentWithText(reduxState.resumeText).then( content => {
                    reduxDispatches.setResumeContent(content)
                })
            }
            else if (reduxState.resumeFile !== null){
                getResumeContentWithFile(reduxState.resumeFile).then( content => {
                    reduxDispatches.setResumeContent(content)
                  })
            }
        }
    },
    {
        name: 'Upload your job description',
        component: JobDescription,
        handleNext: (reduxState, reduxDispatches) => {
            getJobDescriptionContent(reduxState.jobDescription).then( content => {
                reduxDispatches.setJobDescriptionContent(content)
              })
        }
    },
    {
        name: 'Results',
        component: Results
    }
]