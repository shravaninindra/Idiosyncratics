//Read from environment variables
export const getBaseUrl = () => window._env_.API_URL

export const UPLOAD_RESUME = "/api/upload/resume"
export const GET_RESUME_CONENT = "/api/parse/resume/text"
export const GET_JOB_DESCRIPTION_CONTENT = "/api/parse/job_description"
export const GET_RESULTS = "/api/analyze/resume";
export const GET_HIRING_MANAGER_MESAGE = "/api/suggested_message"