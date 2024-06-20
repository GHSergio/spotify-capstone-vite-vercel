// import React, { createContext, useState, useContext } from "react";
// // import { useNavigate } from "react-router-dom";

// // 建立 UserContext
// const UserContext = createContext();

// // 自定義 hook 以便更容易地訪問 UserContext
// export const useUser = () => useContext(UserContext);

// // UserProvider 元件，用於將用戶資訊和 token 存儲在上下文中
// const UserProvider = ({ children }) => {
//   // const { navigate } = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [token, setToken] = useState(null);

//   return (
//     <UserContext.Provider value={{ userData, setUserData, token, setToken }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;
