// action - state management
import { SET_RESUME_CONTENT, SET_JOB_DESCRIPTION, SET_RESUME_TEXT, SET_RESUME_FILE, SET_JOB_DESCRIPTION_CONTENT } from './actions';

export const initialState = {
    resumeContent: {},
    resumeText: '',
    resumeFile: null,
    jobDescription: {
        company: "",
        title: "",
        description: ""
    },
    jobDescriptionContent: {}
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const resumeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESUME_CONTENT: {
            const { content } = action.payload;
            return {
                ...state,
                resumeContent: content
            };
        }
        case SET_RESUME_TEXT: {
            const {resumeText} = action.payload
            return {
                ...state,
                resumeText
            }
        }
        case SET_RESUME_FILE: {
            const {resumeFile} = action.payload
            return {
                ...state,
                resumeFile
            }
        }
        case SET_JOB_DESCRIPTION: {
            const { company, title, description } = action.payload;
            return {
                ...state,
                jobDescription: {
                    ...state.jobDescription,
                    company,
                    title,
                    description
                }
            };
        }
        case SET_JOB_DESCRIPTION_CONTENT: {
            const {content} = action.payload
            console.log("Setting job description content",{
                ...state, 
                jobDescriptionContent: content
            })
            return {
                ...state, 
                jobDescriptionContent: content
            }
        }
        default: {
            return { ...state };
        }
    }
};

export default resumeReducer;
