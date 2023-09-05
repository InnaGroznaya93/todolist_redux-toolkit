import { authSlice, authThunks } from "./auth.slice";
import { LoginParamsType } from "../api/auth.api";


type InitialStateType = {
    isLoggedIn: boolean,
      captchaURL: null | string
  }
let startState: InitialStateType;
beforeEach(() => {
    startState = {
        isLoggedIn: false,
        captchaURL: null
      }
});


test("captcha property we should get when have anti-bot symbols error when login", () => {
    const args = {isLoggedIn: false};
    const loginParams: LoginParamsType = {
        email: "siankevich16@gmail.com",
        password: "12345",
        rememberMe: false,
    }
    const action = authThunks.login.fulfilled(args, "requestId", loginParams);
  
    const endState = authSlice(startState, action);
  
    expect(endState.captchaURL).toBeDefined();
  });

  test("property isLoggedIn should be set to false when we logout", () => {
    const args = {isLoggedIn: false};
 
    const action = authThunks.logout.fulfilled(args, "requestId");
  
    const endState = authSlice(startState, action);
  
    expect(endState.captchaURL).toBeDefined();
  });