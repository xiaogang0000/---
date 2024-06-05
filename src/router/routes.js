//路由规则
import Home from "../components/pags/Home"
import Login from "../components/pags/Login"
import Register from "../components/pags/Register"
import Search from "../components/pags/Search"
import Test from "../components/pags/Test"
import Detail from '../components/pags/Detail'
import AddCartSuccess from '../components/pags/AddCartSuccess'
import Cart from '../components/pags/Cart/Cart' 
import Trade from  '../components/pags/Trade'
import Pay from  '../components/pags/Pay'

const routes = [
    {
        path: "/home",
        component: Home,
      },
      {
        path: "/login",
        component: Login,
        meta:{
          isHiddenfooter:true
        },
      },
      {
        path: "/register",
        component: Register,
        meta:{
          isHiddenfooter:true
        },
      },
      {
        path: "/search",
        component:Search,
      },
      {
         path:"/test",
         component:Test,
      },
      
      {
         path:"/detail/:id",
         component:Detail,
      },
      {
        path:'/addcart_success',
        component:AddCartSuccess,
      },
      {
        path:'/cart',
        component:Cart,
      },
      {
        path:'/trade',
        component:Trade,
      },
      {
        path:'/pay',
        component:Pay,
      },
      {
          path:'/',
          redirect:'/home',
      }
]
export default routes