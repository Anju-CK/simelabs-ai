import Cookies from 'js-cookie';


export default function CheckAuth(){
    const token = Cookies.get('token');
    if(token)
        return true
    else
        return false
}
