# Getting Started with Frontegg Hosted Login-Box and Angular

Reference documentation - [Frontegg Embedded login with Angular SDK](https://docs.frontegg.com/docs/angular-embedded-login-guide)


### Frontegg account setup 
Signup for a Frontegg account on one of our public regions if you don't have one already:
- EU ➜ https://portal.frontegg.com/signup
- US ➜ https://portal.us.frontegg.com/signup
- CA ➜ https://portal.ca.frontegg.com/signup
- AU ➜ https://portal.au.frontegg.com/signup


## Running the sample

Clone the project and install the dependencies-

```
npm install
```


Navigate to `src/app/app.module.ts`, add your Client ID and Login URL from `Frontegg Portal ➜ [ENVIRONMENT] ➜ Env Settings page`:

```
FronteggAppModule.forRoot(
      {
        contextOptions: {
          baseUrl: "https://app-xxx.frontegg.com", // Replace with Login URL from Frontegg Portal ➜ [ENVIRONMENT] ➜ Env Settings page (remove "/oauth" from the path!)
          clientId: "clientId", // Replace with Client ID from Frontegg Portal ➜ [ENVIRONMENT] ➜ Env Settings page
          tenantResolver: () => {
            const urlParams = new URLSearchParams(window.location.search);
            return { tenant: urlParams.get('organization') };
          },
        },
        authOptions: {
          // enableSessionPerTenant: true, // enables separate sessions for each new tab
          keepSessionAlive: true // Uncomment this in order to maintain the session alive
        },
        hostedLoginBox: false,
      }
    ),
```

- Save the file.
- Start the code-
```
npm start
```

- The application will be opened on [http://localhost:3000](http://localhost:3000) in development mode
- In order to trigger the login, click on the Login button in order to redirect to your login box.
