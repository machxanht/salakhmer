# SalaKhmer social login setup

The app supports Google, Facebook, and Apple through Firebase Authentication.
Do not put Facebook or Apple secrets in the frontend `.env` file.

## Firebase

Open **Firebase Console → Authentication → Sign-in method**.

- Enable Google.
- Enable Facebook; enter the Meta App ID and App Secret there.
- Enable Apple; enter the Apple Service ID, Team ID, Key ID, and private key there.
- In **Authentication → Settings → Authorised domains**, add your production domain. Add `127.0.0.1` if you develop using that local address.

Firebase gives a callback URL for each provider. Copy that exact URL to the provider dashboard.

## Facebook / Meta

1. Create a Meta app and add **Facebook Login**.
2. Add Firebase's callback URL to **Valid OAuth Redirect URIs**.
3. Add the app domain and privacy-policy URL before making the Meta app Live.
4. Copy only the App ID and App Secret into Firebase Authentication.

## Apple

1. Apple login requires an Apple Developer Program membership.
2. Create a Service ID and enable Sign in with Apple.
3. Set Firebase's exact callback domain and return URL.
4. Create a Sign in with Apple key and enter its details in Firebase.

Apple supplies the learner's name only during their first consent, so SalaKhmer safely falls back when later logins do not include it.

## Mobile release

For Android/iOS, use Firebase's native SDK through the future mobile wrapper and configure each package/bundle ID. Do not rely only on browser popup behaviour inside a production WebView.
