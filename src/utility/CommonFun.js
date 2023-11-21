import { useEffect } from "react";
import { useLocation } from "react-router";
import Cookies from "js-cookie";
import * as constant from "../constant/constants";


// export const debounce = (func, delay) => {
//     let debounceHandler;
//     return function () {
//         const context = this;
//         const args = arguments;
//         clearTimeout(debounceHandler);
//         debounceHandler = setTimeout(() => func.apply(context, args), delay);
//     };
// };


export const isEmpty = (str) => {
    return (!str || str.length === 0)
};

export const ScrollToTop = ({ children }) => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };

// export const getUserStatus = (type) => {
//     let labelText;
//     if (!isEmpty(type)) {
//         labelText = type.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase())
//     }
//     switch (type) {
//         case 'ACTIVE':
//             return {
//                 color: 'light-success',
//                 text: 'Active',
//                 alertText: 'active',
//                 btnText: 'Block User',
//                 colorCode: '#EC681E',
//                 icon: <Slash style={{width: '16px', height: '16px', marginRight: '5px'}}/>,
//                 param: 'BLOCKED'
//             };
//         case 'DEACTIVATED':
//             return {
//                 color: 'light-secondary',
//                 text: 'Deactivated',
//                 alertText: 'delete',
//                 btnText: 'Delete User',
//                 colorCode: '#8f8f8f',
//                 icon: <Trash2 style={{width: '16px', height: '16px', marginRight: '5px'}}/>,
//                 param: 'DELETED'
//             };
//         case 'INACTIVE':
//             return {
//                 color: 'light-secondary',
//                 text: 'Deactivated',
//                 alertText: 'delete',
//                 btnText: 'Delete User',
//                 colorCode: '#8f8f8f',
//                 icon: <Trash2 style={{width: '16px', height: '16px', marginRight: '5px'}}/>,
//                 param: 'DELETED'
//             };
//         case 'BLOCKED':
//             return {
//                 color: 'light-primary',
//                 text: labelText,
//                 alertText: 'block',
//                 btnText: 'Active User',
//                 colorCode: '#28C76F',
//                 icon: <CheckCircle style={{width: '16px', height: '16px', marginRight: '5px'}}/>,
//                 param: 'ACTIVE'
//             };
//         case 'DELETED':
//             return {
//                 color: 'light-primary',
//                 text: labelText,
//                 alertText: 'delete',
//                 btnText: 'Delete User',
//                 colorCode: '#EC681E',
//                 icon: <Trash2 style={{width: '16px', height: '16px', marginRight: '5px'}}/>,
//                 param: 'DELETED'
//             };
//         default:
//             return {
//                 color: '',
//                 text: '',
//                 alertText: '',
//                 btnText: '',
//                 colorCode: '',
//                 icon: '',
//                 param: ''
//             }
//     }
// };


export const logOutUser = () => {
    console.log('logOut');
    Cookies.remove(constant.ACCESS_TOKEN);
    Cookies.remove(constant.REFRESH_TOKEN);
    Cookies.remove(constant.Expire_time);
    Cookies.remove('userDetails');
    Cookies.remove(constant.ACCESS_TOKEN);
    window.location = `/login`;
};

export const setCommonErrorMessage = (e) => {
    let msg = e.response.data.message ? e.response.data.message : 'Something went wrong';
    return msg;

};


export const checkPermission = (permissionType) => {
    console.log()
    if (JSON.parse(Cookies?.get(constant.PERMISSION) === undefined)){
        window.href='/login'
    }else {
        let currentPermissions = JSON.parse(Cookies?.get(constant.PERMISSION));
        //   let PERMISSION =Cookies?.get('PERMISSION')=== undefined ?[]:JSON.parse(Cookies?.get('PERMISSION'));
        let pp = [];
        let permissionDecode = currentPermissions;

        if (permissionDecode != []) {
            permissionDecode?.map((p, index) => {
                pp.push(atob(p));
            });
        }
        // console.log(pp,'filter details :', permissionType)
        let isHavePermission = pp.includes(permissionType);
        //console.log(isHavePermission)
        return isHavePermission;
    }
};