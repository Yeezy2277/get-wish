import { NavigationActions } from 'react-navigation';

let _navigatorAuth;

function setTopLevelNavigator(navigatorRef) {
    _navigatorAuth = navigatorRef;
}

function navigate(routeName, params) {
    _navigatorAuth.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

export default {
    navigate,
    setTopLevelNavigator,
};
