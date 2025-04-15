import { SET_RESUME_CONTENT, SET_JOB_DESCRIPTION, SET_RESUME_FILE, SET_RESUME_TEXT, SET_JOB_DESCRIPTION_CONTENT } from "./actions"

export const setResumeContent = (resumeContent) => ({
    type: SET_RESUME_CONTENT,
    payload: {
        content: resumeContent
    }
})

export const setResumeText = (resumeText) => ({
    type: SET_RESUME_TEXT,
    payload: {
        resumeText
    }
})

export const setResumeFile = (resumeFile) => ({
    type: SET_RESUME_FILE,
    payload: {
        resumeFile
    }
})

export const setJobDescription = ({ company, title, description }) => ({
    type: SET_JOB_DESCRIPTION,
    payload: {
        company,
        title,
        description
    }
})

export const setJobDescriptionContent = (content) => ({
    type: SET_JOB_DESCRIPTION_CONTENT,
    payload : {
        content
    }
})