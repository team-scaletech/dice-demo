import { ThunkDispatch } from 'redux-thunk';
import _ from 'lodash';
import { IAction, IState } from 'shared/interface/state';

/**
 * create action creator
 * @param ACTION - type of action
 * @param data - data
 */
export const createAction = (ACTION: string, data: any = null): IAction => ({
	type: ACTION,
	payload: data
});

/**
 * create loading selector
 * @param actions - actions to dispatch
 */
export const createLoadingSelector = (actions: string[]) => (state: IState) =>
	// returns true only when all actions is not loading
	_(actions).some((action: string) => _.get(state, `loading.api.${action}`));

/**
 * dispatch action after given time (to handle some events like close modal after success api call)
 * @param dispatch - dispatch object
 * @param action - action type
 * @param time - time after which action is to be dispatched (default - 100ms)
 */
export const dispatchActionAfterTime = (
	dispatch: ThunkDispatch<unknown, unknown, IAction>,
	action: string,
	time = 100
) => {
	setTimeout(() => {
		dispatch(createAction(action));
	}, time);
};
