
import {Slide, toast} from "react-toastify"
import {Fragment} from "react";
import { Avatar} from 'antd';
import { FiAlertTriangle } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";


// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content"
// export const MySwal = withReactContent(Swal)

import Cookies from "js-cookie";
import * as constant from '../constant/constants'

// export const isObjEmpty = obj => Object.keys(obj).length === 0

// // ** Returns K format from a number
// export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** FaCheck s if the passed date is today
const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

export const isUserLoggedIn = () => Cookies.get(constant.ACCESS_TOKEN)

// export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

// export const getHomeRouteForLoggedInUser = userRole => {
//   if (userRole === 'admin') return '/'
//   if (userRole === 'client') return '/access-control'
//   return '/login'
// }

// ** React Select Theme Colors
// export const selectThemeColors = theme => ({
//   ...theme,
//   colors: {
//     ...theme.colors,
//     primary25: '#7367f01a', // for option hover bg-color
//     primary: '#7367f0', // for selected option bg-color
//     neutral10: '#7367f0', // for tags bg-color
//     neutral20: '#ededed', // for input border-color
//     neutral30: '#ededed' // for input hover border-color
//   }
// });


const ToastContent = ({title, body, assets}) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' className={assets.color} icon={assets.icon}/>
          <h6 className='toast-title fw-bolder custom-font-toast'>{title}</h6>
        </div>
      </div>
      {body && (
          <div className='toastify-body'>
            <span>{body}</span>
          </div>
      )}
    </Fragment>
)

export const customToastMsg = (title, type, body) => {
  let msgType = "info"
  let assets = {
    color: "bg-info",
    icon: <FiAlertTriangle   color={'#3f3d3d'}  size={15}/>
  }

  if (type === 2) {
    msgType = "info"
    assets = {
       color: "bg-warning",
      icon: <FiAlertTriangle  color={'#3f3d3d'} size={15}/>
    }
  } else if (type === 0) {
    msgType = "error"
    assets = {
      color: "bg-danger",
      icon: <RxCross2  size={15} color={'#680000'}/>
    }
  } else if (type === 1) {
    msgType = "success"
    assets = {
      color: "bg-success",
      icon: <FaCheck  color={'#10df10'} size={15}/>
    }
  }

  toast[msgType](
      <ToastContent title={title} body={body} assets={assets}/>,
      {icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000}
  )
}

export const isEmpty = (str) => {
  return (!str || str.length === 0)
}




