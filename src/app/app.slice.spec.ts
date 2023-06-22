import { appActions, appReducer } from "app/app.slice";

describe("app slice", () => {
  const initialState = {
    error: null,
    isLoading: true,
    isAppInitialized: false,
    };

  it("should handle correct isLoading value", () => {
    const action=appActions.setIsLoading({ isLoading: false })
    const state = appReducer(initialState,action );

    expect(state.isLoading).toBe(false);
  });
  it('should return the initial state', () => {
    expect(appReducer(undefined, { type: '' })).toEqual(initialState);
  });
  it('should handle setAppInitialized', () => {
    const action = {
      type: 'app/setAppInitialized',
      payload: { isAppInitialized: true },
    };
    const expectedState = {
      ...initialState,
      isAppInitialized: true,
    };
    expect(appReducer(initialState, action)).toEqual(expectedState);
  });
});

