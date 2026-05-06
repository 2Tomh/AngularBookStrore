// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


/* THE CONNECTION TO THE FIREBASE*/
// export const environment = {
//   production: false,
//   DB:'https://book-store-angular-45fd0-default-rtdb.firebaseio.com' ,
//   FIREBASE_SIGNUP: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvXJXfmgciojgtFAh0b48t3QjVkggY3A4',
//   FIREBASE_SIGNIN: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvXJXfmgciojgtFAh0b48t3QjVkggY3A4'
// }

//THE CONNECTION TO ASP.NET
export const environment = {
  production: false,
  DB: "https://localhost:7045/api",
  FIREBASE_SIGNUP: "",
  FIREBASE_SIGNIN:""
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error'  // Included with Angular CLI.
