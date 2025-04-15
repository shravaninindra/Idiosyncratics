import React, { Component } from 'react';
import { DropzoneArea } from 'mui-file-dropzone';
import { Button, Grid, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { setResumeFile, setResumeText } from '../../../../store/resumeActions';

class ResumeUploadClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextBox: props.resumeText !== ''
        };
    }
    handleChange(files) {
        if (files.length <= 0) {
            return;
        }
        const file = files[0];
        this.props.setResumeFile(file);
        this.props.setResumeText("")
    }
    render() {
        return (
            <>
                {this.state.showTextBox ? (
                    <>
                        <TextField
                            fullWidth
                            multiline
                            label={'Resume Content'}
                            required
                            placeholder={'Enter your resume here'}
                            value={this.props.resumeText}
                            onChange={(event) => {
                                this.props.setResumeFile(null)
                                this.props.setResumeText(event.target.value);
                            }}
                            minRows={20}
                        />
                        <Grid container justifyContent="center">
                            <Button
                                onClick={() => {
                                    this.setState((state) => ({ ...state, showTextBox: false }));
                                }}
                            >
                                Upload a file?
                            </Button>
                        </Grid>
                    </>
                ) : (
                    <>
                        <DropzoneArea onChange={this.handleChange.bind(this)} filesLimit={1} />
                        <Grid container justifyContent="center">
                            <Button
                                onClick={() => {
                                    this.setState((state) => ({ ...state, showTextBox: true }));
                                }}
                            >
                                Paste resume content instead?
                            </Button>
                        </Grid>
                    </>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return { resumeText: state.resume.resumeText, resumeFile: state.resume.resumeFile };
};

const mapDispatchToProps = (dispatch) => ({
    setResumeText: (resumeText) => dispatch(setResumeText(resumeText)),
    setResumeFile: (resumeFile) => dispatch(setResumeFile(resumeFile))
});
export const ResumeUpload = connect(mapStateToProps, mapDispatchToProps)(ResumeUploadClass);
