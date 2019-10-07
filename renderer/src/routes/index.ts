export const RoutePaths = {
    Index: '/',
    Account: '/account',
    AccountNew: '/account/new',
    Settings: '/settings',

};

export const RouteProviders = {
    Index: () => RoutePaths.Index,
    Account: () => RoutePaths.Account,
    NewAccount: () => RoutePaths.AccountNew,
    Settings: () => RoutePaths.Settings,
};

