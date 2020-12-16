import { BrowserRouter,Route,Switch } from 'react-router-dom'
import './App.scss';
import MainPage from './components/mainpage/mainpage'
import Login from './components/login/login'
import Signup from './components/signup/signup'
import EditProfile from './components/editProfile/editProfile'
import Home from './components/home/home'
import Story from './components/story/story'
import User from './components/user/user'
import Add from './components/add/add'
import Edit from './components/edit/edit'
import UserEdits from './components/userEdits/userEdits'
import UserEditTitle from './components/userEditTitle/userEditTitle'
import SingleEdit from './components/singleEdit/singleEdit'
import Profile from './components/profile/profile'
import Search from './components/search/search'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
              <Route path='/' exact component={MainPage}/>
              <Route path='/login' component={Login}/>
              <Route path='/signup' component={Signup}/>
              <Route path='/profile' component={Profile}/>
              <Route path='/editProfile' component={EditProfile}/>
              <Route path='/home' component={Home}/>
              <Route path='/story/:storyId' exact component={Story}/>
              <Route path='/user/:user' exact component={User}/>
              <Route path='/add' component={Add}/>
              <Route path='/edit/:storyId' exact component={Edit}/>
              <Route path='/userEdits' component ={UserEdits}/>
              <Route path ='/userEditTitle/:story' exact component={UserEditTitle}/>
              <Route path='/edited/:story/:edit' exact component={SingleEdit}/>
              <Route path='/search/:search' exact component={Search}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
