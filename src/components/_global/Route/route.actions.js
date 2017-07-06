import { UPDATE_ROUTE_CONFIG } from '../../../store/reducer/actionTypes';

export function updateConfig(routeConfig) {
    return {
        type: UPDATE_ROUTE_CONFIG,
        routeConfig,
    };
}
