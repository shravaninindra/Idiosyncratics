import { ResultsGridStatusCell } from "./ResultsGridStatusCell";

export const columns = [
    {
        field: 'field',
        headerName: 'Field',
        width: 150,
    },
    {
        field: 'exists',
        headerName: '',
        width: 60,
        cellRenderer: ResultsGridStatusCell
    },
    {
        field: 'value',
        headerName: 'Value',
        flex: 1
    },
];

export const getRows = ({gridData}) => {
    const rows = [
        { field: "Name", value: gridData?.name_exists? "You have provided your name" : "You have not provided your name", exists: gridData?.name_exists },
        { field: "Mobile number", value: gridData?.mobile_exists? "You have provided your mobile number" : "You have not provided your mobile number", exists: gridData?.mobile_exists },
        { field: "Email", value: gridData?.email_exists? "You have provided your email" : "You have not provided your email", exists: gridData?.email_exists },
        { field: "Education", value: gridData?.education_exists? "You have provided your education details" : "You have not provided your education details", exists: gridData?.education_exists },
        { field: "Experience", value: gridData?.experience_exists? "You have provided your experience details" : "You have not provided your experience details", exists: gridData?.experience_exists },
        { field: "Resume length", value: gridData?.pageCount <= 1 ? "Your resume is a single page" : "Your resume is multiple pages", exists: gridData?.pageCount <= 1 }
    ].map((data, index) => ({ ...data, id: index }));
    return rows;
}

export const skillsGridColumns = [
    { field: 'skill', headerName: 'Skills', flex: 1},
    { field: 'exists', headerName: '', cellRenderer: ResultsGridStatusCell, width: 60 }
]