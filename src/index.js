import TeacherList from './TeacherList'
import Discipline from './Discipline'
import Profile from './Profile'

import {createAppContainer, createDrawerNavigator,} from 'react-navigation'

const Routes = createAppContainer(
    createDrawerNavigator({
        TeacherList: TeacherList,
        Materia: Discipline,
        Profile: Profile
    })
)

export default Routes