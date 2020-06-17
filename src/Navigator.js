import React from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import About from './screens/about/About';
import Help from './screens/help/Help';
import HelpDetails from './screens/helpDetails/HelpDetails';
import Menu from './screens/menu/Menu';
import Profile from './screens/profile/Profile';
import History from './screens/history/History';
import PlaceHistory from './screens/placeHistory/PlaceHistory';
import SearchPlaces from './screens/searchPlaces/SearchPlaces';
import commonStyles from './shared/commonStyle';
import PlaceView from './screens/placeView/placeView';
import AuthenticationOptions from './screens/authenticationOptions/AuthenticationOptions';
import Login from './screens/login/Login';
import SignUp from './screens/signup/SignUp';

const loginNavigator = createStackNavigator({
    AuthOptions: {
        screen: AuthenticationOptions
    },
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    }
}, {
    initialRouteName: 'AuthOptions',
    headerMode: 'none',
    defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
    }
});

const stackNavigator = createStackNavigator({
    SearchPlaces: {
        screen: SearchPlaces
    },
    PlaceView: {
        screen: PlaceView
    }
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
    }
});

const stackHistory = createStackNavigator({
    History: {
        screen: History
    },
    PlaceHistory: {
        screen: PlaceHistory
    },
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
    }
});

const stackHelp = createStackNavigator({
    Help: {
        screen: Help
    },
    HelpDetails: {
        screen: HelpDetails
    },
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
    }
});

const menuNavigatorLoggedUser = createDrawerNavigator({
    Home: {
        screen: stackNavigator,
        navigationOptions: {
            title: 'Início',
            drawerIcon: () => <Icon name="home" size={25} color={commonStyles.colors.primaryFontColor} />,
            headerStyle: {
                backgroundColor: 'red',
            },
            headerTintColor: 'aqua'
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Perfil',
            drawerIcon: () => <Icon name="user-alt" size={25} color={commonStyles.colors.primaryFontColor} />
        }
    },
    History: {
        screen: stackHistory,
        navigationOptions: {
            title: 'Histórico',
            drawerIcon: () => <Icon name="history" size={25} color={commonStyles.colors.primaryFontColor} />
        }
    },
    Help: { 
        screen: stackHelp,
        navigationOptions: {
            title: 'Ajuda',
            drawerIcon: () => <Icon name="question" size={25} color={commonStyles.colors.primaryFontColor} />
        }
    },
    About: {
        screen: About,
        navigationOptions: {
            title: 'Sobre',
            drawerIcon: () => <Icon name="info-circle" size={25} color={commonStyles.colors.primaryFontColor} />
        }
    },
    Logout: {
        screen: loginNavigator,
        navigationOptions: {
            title: "Sair",
            drawerIcon: () => <Icon name="sign-out-alt" size={25} color={commonStyles.colors.primaryFontColor} />

        }
    }
}, {
    initialRouteName: 'Home',
    contentComponent: Menu,
    drawerWidth: Dimensions.get('screen').width * 0.85,
    contentOptions: {
        labelStyle: {
            fontWeight: 'normal',
            fontSize: 18
        },
        activeLabelStyles: {
            color: commonStyles.colors.primaryFontColor,
            fontWeight: 'bold'
        }
    }
});

const menuNavigator = createDrawerNavigator({
    Home: {
        screen: stackNavigator,
        navigationOptions: {
            title: 'Início',
            drawerIcon: () => <Icon name="home" size={25} color={commonStyles.colors.primaryFontColor} />,
            headerStyle: {
                backgroundColor: 'red',
            },
            headerTintColor: 'aqua'
        }
    },
    Help: {
        screen: stackHelp,
        navigationOptions: {
            title: 'Ajuda',
            drawerIcon: () => <Icon name="question" size={25} color={commonStyles.colors.primaryFontColor} />
        }
    },
    About: {
        screen: About,
        navigationOptions: {
            title: 'Sobre',
            drawerIcon: () => <Icon name="info-circle" size={25} color={commonStyles.colors.primaryFontColor} />
        }
    },
    Login: {
        screen: loginNavigator,
        navigationOptions: {
            title: "Entrar",
            drawerIcon: () => <Icon name="sign-in-alt" size={25} color={commonStyles.colors.primaryFontColor} />

        }
    }
}, {
    initialRouteName: 'Home',
    contentComponent: Menu,
    drawerWidth: Dimensions.get('screen').width * 0.85,
    contentOptions: {
        labelStyle: {
            fontWeight: 'normal',
            fontSize: 18
        },
        activeLabelStyles: {
            color: commonStyles.colors.primaryFontColor,
            fontWeight: 'bold'
        }
    }
});

const NavigatorUser = createAppContainer(menuNavigatorLoggedUser);
const Navigator = createAppContainer(menuNavigator);

// export default createAppContainer(menuNavigator);

export { Navigator, NavigatorUser };
