import { appActions, AppInitialStateType, appReducer } from "app/app.reducer";

let startState: AppInitialStateType;

beforeEach(() => {
  startState = {
    error: null,
    status: "idle",
    isInitialized: false,
  };
});

test("correct error message should be set", () => {
  const endState = appReducer(startState, appActions.setAppError({ error: "some error" }));
  expect(endState.error).toBe("some error");
});

test("property isInitialized set to true in state, when we dispatch appropriate action", () => {
  const endState = appReducer(startState, appActions.setAppInitialized({ isInitialized: true }));
  expect(endState.isInitialized).toBeTruthy;
});
