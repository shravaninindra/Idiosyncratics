import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { setJobDescription } from "../../../../store/resumeActions";
import { connect } from "react-redux";
import { sampleJds } from "./SampleJobDescriptions";

export const JobDescriptionWithoutProps = ({ jobDetails, setJobDetails }) => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Grid container direction="row"spacing={3}>
          <Grid item xs ={6} md={6}>
            <TextField
              fullWidth
              label={"Company Name"}
              required
              placeholder={"Enter the company name"}
              value={jobDetails.company}
              onChange={(event) => {
                setJobDetails({ ...jobDetails, company: event.target.value })
              }}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              fullWidth
              label={"Job Title"}
              required
              placeholder={"Enter your Job title here"}
              value={jobDetails.title}
              onChange={(event) => {
                setJobDetails({ ...jobDetails, title: event.target.value })
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          multiline
          label={"Job description"}
          required
          placeholder={"Enter the job description here"}
          value={jobDetails.description}
          onChange={(event) => {
            setJobDetails(({ ...jobDetails, description: event.target.value }))
          }}
          minRows={22}
          maxRows={22}
        />
      </Grid>
      <Grid item>
        Sample Job descriptions :
        {sampleJds.map(jd => {
          return <Button
            onClick={() => {
              setJobDetails(jd)
            }}
        >
          {jd.title}
        </Button>
        })
        }
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return { jobDetails: state.resume.jobDescription }
}

const mapDispatchToProps = (dispatch) => ({
  setJobDetails: (jobDetails) => dispatch(setJobDescription(jobDetails)),
})
export const JobDescription = connect(mapStateToProps, mapDispatchToProps)(JobDescriptionWithoutProps)