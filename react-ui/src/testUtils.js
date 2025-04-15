import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { store } from './store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

export function MockTheme({ children }) {
    const theme = createTheme({});
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export function SetupDefaults({children}){
    const theme = createTheme({});
    // console.log(theme)
    return (
        <Provider store={store}>
            <MemoryRouter>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </MemoryRouter>
        </Provider>
    )
}