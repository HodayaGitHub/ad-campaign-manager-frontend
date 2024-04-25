import { store } from '../store';
import { SET_IS_LOADING } from '../reducers/system.reducer';

export function setIsLoading(isLoading) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: isLoading });
}
