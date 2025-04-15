import {
    GET_HIRING_MANAGER_MESAGE,
    GET_JOB_DESCRIPTION_CONTENT,
    GET_RESULTS,
    GET_RESUME_CONENT,
    UPLOAD_RESUME,
    getBaseUrl
} from './apiConstants';

export const getResumeContentWithFile = async (file) => {
    const data = new FormData();
    data.append('file', file, file.name);

    return fetch(getBaseUrl() + UPLOAD_RESUME, {
        method: 'POST',
        body: data
    }).then((resp) => resp.json());
};

export const getResumeContentWithText = async (text) => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return fetch(getBaseUrl() + GET_RESUME_CONENT, {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers
    });
};

export const getJobDescriptionContent = async (jobDescription) => {
    const raw = JSON.stringify({
        text: jobDescription.description,
        company_name: jobDescription.company,
        job_title: jobDescription.title
    });

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders
    };

    return fetch(getBaseUrl() + GET_JOB_DESCRIPTION_CONTENT, requestOptions).then((resp) => resp.json());
};
export const getResults = async (resumeContent, jobContent) => {
    const raw = JSON.stringify({
        resume_data: resumeContent,
        job_description_data: jobContent
    });

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders
    };

    return fetch(getBaseUrl() + GET_RESULTS, requestOptions).then((resp) => resp.json());
};

export const getMessageForHiringManager = async (params) => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var raw = JSON.stringify(params);

    var requestOptions = {
        method: 'POST',
        headers,
        body: raw
    };
    return fetch(getBaseUrl() + GET_HIRING_MANAGER_MESAGE, requestOptions).then((resp) => resp.json());
};
