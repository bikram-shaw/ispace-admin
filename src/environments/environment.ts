// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
     //apiUrl: 'http://localhost:8000/api/v1'
    // apiUrl :'http://ec2-3-16-108-16.us-east-2.compute.amazonaws.com/api/v1'
     apiUrl:'http://54.224.228.232:8000/admin/api/v1'
    // apiUrl: 'http://ec2-18-219-86-247.us-east-2.compute.amazonaws.com/api/v1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
