import { createContext, useState } from 'react';

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
    const [userData, setUserData] = useState(null);
    return <UserContext.Provider value={{ userData, setUserData }} >{props.children}</UserContext.Provider>
}

export default UserContextProvider;

