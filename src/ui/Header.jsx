import React, { useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  CloudIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { removeUser } from "../features/auth/userSlice";

const userMenu = [
  {
    label: "Profile",
    icon: UserCircleIcon,
    value: 'profile'
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    value: 'signout'
  },
];

const Header = () => {
  const { user } = useSelector((state) => state.userSlice);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Use location to get current path

  const closeMenu = () => setIsMenuOpen(false);
  const menu = user ? userMenu : [];

  return (
    <Navbar variant='gradient' color='#010101' className="bg-[#010101] mx-auto max-w-screen-5xl p-2 lg:pl-6 !rounded-none">
      <div className="relative mx-auto flex items-center justify-between text-white">

        <Typography
          as="a"
          href="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          CodePen
        </Typography>

        <div className="flex items-center gap-4">
          {/* Settings Button */}
          {user && (
            <Button
              variant="text"
              className="text-white"
              onClick={() => nav('/settings')} // You can create a /settings route or any other logic
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </Button>
          )}

          {/* Save Button */}
          {user && (
            <Button
              variant="text"
              className="text-white"
              onClick={() => console.log('Save action')} // Implement your save logic here
            >
              <CloudIcon className="h-5 w-5" />
            </Button>
          )}

          {/* Only show login button if the user is not logged in */}
          {user === null && (
            <Button onClick={() => nav('/login')} size="sm" variant="text" className="text-white bg-[#5A5F73]">
              <span>Log In</span>
            </Button>
          )}

          {/* Show user profile menu if logged in */}
          {user !== null && (
            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
              <MenuHandler>
                <Button
                  variant="text"
                  className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                  <Avatar
                    variant="circular"
                    size="sm"
                    alt="user avatar"
                    className="border border-gray-900 p-0.5"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                  />
                </Button>
              </MenuHandler>
              <MenuList className="p-1">
                {menu.map(({ label, icon, value }, key) => {
                  const isLastItem = key === menu.length - 1;
                  return (
                    <MenuItem
                      key={label}
                      onClick={() => {
                        switch (value) {
                          case 'signout':
                            dispatch(removeUser());
                            break;
                          case 'profile':
                            nav('/user-profile');
                            break;
                        }
                        closeMenu();
                      }}
                      className={`flex items-center gap-2 rounded ${isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""}`}
                    >
                      {React.createElement(icon, {
                        className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                        strokeWidth: 2,
                      })}
                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                        color={isLastItem ? "red" : "inherit"}
                      >
                        {label}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
