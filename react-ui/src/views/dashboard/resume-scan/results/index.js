import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { DoughnutChart } from './DonutChart';
import { CircularProgress, Divider, Grid, TextField } from '@material-ui/core';
import { ResultsGrid } from './ResultsGrid';
import { getMessageForHiringManager, getResults } from '../../../../api/apis';
import { skillsGridColumns } from './ResultsGridData';
import { AgGridReact } from 'ag-grid-react';

//TODO create the results component to indicate the individual steps to upload resume, etc
const ResultsWithoutProps = ({ resumeContent, jobDescriptionContent }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [gridData, setGridData] = useState({});
    const [hiringManagerMsg, setHiringManagerMsg] = useState("")
    useEffect(() => {
        if (
            resumeContent &&
            jobDescriptionContent &&
            Object.keys(resumeContent).length !== 0 &&
            Object.keys(jobDescriptionContent).length !== 0
        ) {
            const temp = async () => {
                const [girdDataRes, hiringManagerMsg] = await Promise.all(
                    [getResults(resumeContent, jobDescriptionContent),getMessageForHiringManager({
                              "company": jobDescriptionContent.company_name,
                              "job_title": jobDescriptionContent.job_title,
                              "skills": resumeContent.skills,
                              "name": resumeContent.name
                            })])
                setGridData(girdDataRes)
                setHiringManagerMsg(hiringManagerMsg)
                setIsLoading(false)
            }
            temp()
        }
    }, [resumeContent, jobDescriptionContent]);
    return (
        <>
            {isLoading ? (
                <Grid container flexDirection="row">
                    <Grid item xs={2} md={2}>
                        <CircularProgress />
                    </Grid>
                </Grid>
            ) : (
                <Grid container flexDirection="row" spacing={2}>
                    <Grid item xs={3} md={3} style={{ borderRight: true }}>
                        <Grid container flexDirection="column">
                            <DoughnutChart matchRate={gridData.skill_score}/>
                            <h2>Skills required for the job</h2>
                            <Grid item style={{height: '45vh'}}>
                                <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
                                    <AgGridReact
                                        rowData={jobDescriptionContent?.skills?.map((skill, index) => ({
                                            id: index,
                                            skill,
                                            exists: resumeContent?.skills?.includes(skill)
                                        }))}
                                        columnDefs={skillsGridColumns}
                                        // onGridReady={({api}) => setGridApi(api)}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={9} md={9}>
                        <Grid container flexDirection="column">
                            <h2>
                                <strong>Extracted details</strong>
                            </h2>
                            <Grid item xs={12} md={12}>
                                <div style={{ height: '40vh', width: '100%', marginBottom: '5px' }}>
                                    <ResultsGrid gridData={gridData} />
                                </div>
                            </Grid>
                            <h2>
                                <strong>Salary range for jobs in {jobDescriptionContent?.company_name}</strong>
                            </h2>
                            <iframe
                                src={`https://www.levels.fyi/charts_embed.html?company=${jobDescriptionContent?.company_name}`}
                                height={400}
                                title={`Salary ranges for ${jobDescriptionContent?.company_name}`}
                            />
                            <h2>
                                <strong>Message to hiring manager</strong>
                            </h2>
                            <TextField
                                fullWidth
                                multiline
                                label=""
                                placeholder=""
                                disabled
                                value={hiringManagerMsg}
                                minRows={10}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        jobDescriptionContent: state.resume.jobDescriptionContent,
        resumeContent: state.resume.resumeContent
    };
};

export const Results = connect(mapStateToProps)(ResultsWithoutProps);
