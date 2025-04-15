import accountReducer, { initialState as accountReducerInitialState } from './accountReducer';
import * as actions from './actions';
import customizationReducer, { initialState as customizationReducerInitialState } from './customizationReducer';

describe("Testing account reducer functionality", () => {
    it("Testing account initialization", () =>{
        const newState = accountReducer(accountReducerInitialState, {
            type : actions.ACCOUNT_INITIALIZE,
            payload: { isLoggedIn : true, user : 'dummy', token : 'dummyToken' } 
        })

        expect(newState.isInitialized).toBe(true)
    })

    it("Testing user login", () =>{
        const newState = accountReducer(accountReducerInitialState, {
            type : actions.LOGIN,
            payload: { user : 'dummy' } 
        })

        expect(newState.isLoggedIn).toBe(true)
    })

    it("Testing account logout", () =>{
        const newState = accountReducer(accountReducerInitialState, {
            type : actions.LOGOUT,
        })

        expect(newState.isLoggedIn).toBe(false)
    })
})

describe("Testing customization reducer functionality", () => {
    it("Testing menu open functionality ", () =>{
        const newState = customizationReducer(customizationReducerInitialState, {
            type : actions.MENU_OPEN,
            id : 'id'
        })

        expect(newState.isOpen).toEqual(['id'])
    })

    it("Testing set menu functionality", () =>{
        const newState = customizationReducer(customizationReducerInitialState, {
            type : actions.SET_MENU,
            opened: 'openedSection'
        })

        expect(newState.opened).toBe('openedSection')
    })

    it("Testing set font functionality", () =>{
        const newState = customizationReducer(customizationReducerInitialState, {
            type : actions.SET_FONT_FAMILY,
            fontFamily : 'newFont'
        })

        expect(newState.fontFamily).toBe('newFont')
    })

    it("Testing set border functionality", () =>{
        const newState = customizationReducer(customizationReducerInitialState, {
            type : actions.SET_BORDER_RADIUS,
            borderRadius: 2
        })

        expect(newState.borderRadius).toEqual(2)
    })
})