## Not-hotdog app

A clone of [not-hotdog app](https://apps.apple.com/us/app/not-hotdog/id1212457521) using React Native and Expo.

- [Link to complete tutorial]()

Demo 👇

![demo](https://cdn-images-1.medium.com/max/800/1*Hg6nlnaROCavW5_YLygtEA.gif)

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>=`10.x.x`) with npm/yarn installed.
- [expo-cli](https://docs.expo.io/versions/latest/workflow/expo-cli/?) (>=`3.0.9`), previously known as create-react-native-app.
- a [Google Cloud Platform](https://cloud.google.com/) account
- a [Firebase Project](https://console.firebase.google.com/) setup
- Expo Client app for Android or iOS, used for testing the app

## Getting Started

- Clone the repo

```shell
git clone https://github.com/amandeepmittal/not-hotdog-app.git
```

- Install all the packages

```
npm install
```

- Run the app

```
expo start
```

- Next, in `config/Firebase.js` replace the `firebaseConfig` object with your key values.

```js
const firebaseConfig = {
  apiKey: 'XXXX',
  authDomain: 'XXXX',
  databaseURL: 'XXXX',
  projectId: 'XXXX',
  storageBucket: 'XXXX',
  messagingSenderId: 'XXXX',
  appId: 'XXXX'
}
```

- Lastly, add the Vision API key in `App.js` file.

```js
const VISION_API_KEY = 'XXXXX'
```

## Built With

- React Native: for creating cross-platform mobile apps with JavaScript and React.
- Expo: for easily setting up React Native apps.
- [react-native-elements](https://react-native-training.github.io/) UI component library
- [Vision AI](https://cloud.google.com/vision/?utm_source=google&utm_medium=cpc&utm_campaign=japac-IN-all-en-dr-bkws-all-super-trial-e-dr-1003987&utm_content=text-ad-none-none-DEV_c-CRE_256563224787-ADGP_Hybrid+%7C+AW+SEM+%7C+BKWS+~+T1+%7C+EXA+%7C+ML+%7C+1:1+%7C+IN+%7C+en+%7C+Vision+%7C+google+vision+api-KWID_43700023274811671-kwd-312947612586&userloc_9061696&utm_term=KW_google%20vision%20api&ds_rl=1264446&gclid=CjwKCAjwqNnqBRATEiwAkHm2BCkLuArU9ZtlYQ4p3bCJoHF0CDQ0Gm2o0rjZVWHWJ63kdpz7AbwtPxoCoWgQAvD_BwE)
- [Firebase storage](https://console.firebase.google.com/)

### Donation

If this project helped you reduce time to develop, please consider buying me a cup of coffee :)

<a href='https://ko-fi.com/A611K61' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi4.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
