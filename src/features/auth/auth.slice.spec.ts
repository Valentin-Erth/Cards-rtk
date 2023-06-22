import { authReducer, authThunks } from "features/auth/auth.slice";

describe("authReducer", () => {
  const initialState = {
    user: null,
    isAuth: false,
    isInitialized: false,
    email: "",
    password: ""
  };

  it("should login work correctly and return profile", () => {
    const data = {
      email: "kozlov0020@gmail.com",
      password: "00009999",
      rememberMe: false
    };

    const profile = {
        created: "2023-05-27T13:32:07.772Z",
        email: "kozlov0020@gmail.com",
        isAdmin: false,
        name: "ggg",
        publicCardPacksCount: 8,
        rememberMe: false,
        token: "5ba39960-10d9-11ee-8502-71a617ff42bc",
        tokenDeathTime: 1687434422646,
        updated: "2023-06-22T08:47:02.646Z",
        verified: true,
        __v: 0,
        _id: "6472065715a819ad8f95f7ce"
      };

    // 1. Если мы проверяем успешный кейс, тогда пишем fulfilled (authThunks.login.fulfilled)
    // 2. fulfilled принимает 3 параметра
    // 2.1. То, что thunk возвращает
    // 2.2. Ожидает строку. Будем везде писать "requestId" - meta информация.
    // 2.3. То, что thunk принимает
    const action = authThunks.login.fulfilled({ profile }, "requestId", data);

    const state = authReducer(initialState, action);

    expect(state.user).toEqual(profile);
  });
});
