import { NavigationActions } from 'react-navigation';
import React from 'react';

// eslint-disable-next-line no-underscore-dangle
let _navigatorAuth;

// eslint-disable-next-line no-underscore-dangle
let _navigatorProfile;

function setTopLevelNavigator(navigatorRef) {
  _navigatorAuth = navigatorRef;
}

function setTopLevelNavigatorProfile(navigatorRef) {
  _navigatorProfile = navigatorRef;
}

function navigate(routeName, params) {
  _navigatorAuth.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function navigateProfile(routeName, params) {
  _navigatorProfile.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export const navigationRef = React.createRef();

export const navigateAction = (routeName, params) => {
  navigationRef.current?.navigate(routeName, params);
};

export default {
  navigate,
  setTopLevelNavigator,
  setTopLevelNavigatorProfile,
  navigateProfile
};
