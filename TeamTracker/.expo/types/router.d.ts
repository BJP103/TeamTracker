/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/../styles/styles`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens/editteam`; params?: Router.UnknownInputParams; } | { pathname: `/screens/focusteam`; params?: Router.UnknownInputParams; } | { pathname: `/screens/profile`; params?: Router.UnknownInputParams; } | { pathname: `/screens/teamlist`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/../styles/styles`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/editteam`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/focusteam`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/profile`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/teamlist`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/../styles/styles${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/screens/editteam${`?${string}` | `#${string}` | ''}` | `/screens/focusteam${`?${string}` | `#${string}` | ''}` | `/screens/profile${`?${string}` | `#${string}` | ''}` | `/screens/teamlist${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/../styles/styles`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens/editteam`; params?: Router.UnknownInputParams; } | { pathname: `/screens/focusteam`; params?: Router.UnknownInputParams; } | { pathname: `/screens/profile`; params?: Router.UnknownInputParams; } | { pathname: `/screens/teamlist`; params?: Router.UnknownInputParams; };
    }
  }
}
