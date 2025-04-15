import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography, useTheme } from '@material-ui/core';

// project imports
import config from './../../../config';
import Logo from './../../../ui-component/Logo';

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoSection = () => {
    const theme = useTheme();
    return (
        <ButtonBase disableRipple component={Link} to={config.defaultPath}>
            <Logo />
            <Typography variant="h2" color={theme.palette.primary.main} gutterBottom>
                Idiosyncrat
            </Typography>
        </ButtonBase>
    );
};

export default LogoSection;
