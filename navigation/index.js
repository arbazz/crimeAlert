import Login from '../screen/Login/index'
import React from 'react'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import Signup from '../screen/Signup/index'
import Home from '../screen/Home/index'
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerProfile from '../screen/DrawerProfile/index'
import drawerContentComponents from './drawerContentComponents';
import CustomHeader from '../screen/Header/index'
import Search from '../screen/Home/Search'
import CrimeInFo from '../screen/CrimeInfo/index'
import RobbedHistory from '../screen/RobbedHIstory/index'
import Edit from '../screen/RobbedHIstory/Eidit'
import AllRobbedHistory from '../screen/RobbedHIstory/AllRobbedHIstory'
import Comments from '../screen/RobbedHIstory/Comments'
import NewComment from '../screen/RobbedHIstory/NewComment'

const AuthStack = createStackNavigator({
  SignIn: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null
    }
  }
});

const Drawer = createDrawerNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: {
        headerTitle: <Search/>
      }
    }
  },
  {
    contentComponent: drawerContentComponents
  }
)


const MainStack = createStackNavigator({
  drawer:{
    screen: Drawer,
    navigationOptions: {
      headerTitle: <CustomHeader />
    }
  },
  CrimeInfo: {
    screen: CrimeInFo,
    navigationOptions: {
      header: null
    }
  },
  RobbedHistory:{
    screen: RobbedHistory,
  },
  Edit: {
    screen: Edit
  },
  AllRobbedHistory:{
    screen: AllRobbedHistory
  },
  Comments: {
    screen: Comments
  },
  NewComment: {
    screen: NewComment
  },
  // home: {
  //   screen: Home
  // },
});


const MainNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: MainStack
    },
    {
      initialRouteName: 'Auth',
    }
  )

  // Dashboard: {
  //     screen: Dashboard
  // },
  // Difficulty: {
  //     screen: Difficulty
  // },
  // Game: {
  //     screen:Game,
  //     navigationOptions:  {
  //         headerLeft: null
  //     }
  // },
  // HighScore:{
  //     screen: HighScore,
  //     navigationOptions:{
  //         title: 'Highscore'
  //     }
  // }

)


const Navigator = createAppContainer(MainNavigator);
export default Navigator
