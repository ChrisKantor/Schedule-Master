import { signup, useAuth, login, logout } from "../firebase";

async function handleLogout()
{
    try{
    await logout();
    }catch{
        alert("Error!");
    }
}

export const MenuData = [
    {
        title: "Home",
        url:"/home",
        cName:"nav-links",
        icon:"fa-solid fa-house-user"
    },
    {
        title: "Course Menu",
        url:"/selection",
        cName:"nav-links",
        icon:"fa-solid fa-book"
    },
    {
        title: "Cart",
        url:"/cart",
        cName:"nav-links",
        icon:"fa-solid fa-cart-shopping"
    },
    {
        title: "Logout",
        url:"/",
        cName:"nav-links-logout",
        theClick: handleLogout
    },
];