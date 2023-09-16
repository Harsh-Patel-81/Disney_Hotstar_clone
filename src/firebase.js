import  {initializeApp} from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth , GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAj9znRkYHxl1coLXOoem9Ba2Po4DdFVAQ",
    authDomain: "disneyplushotstart-clone.firebaseapp.com",
    projectId: "disneyplushotstart-clone",
    storageBucket: "disneyplushotstart-clone.appspot.com",
    messagingSenderId: "747936675939",
    appId: "1:747936675939:web:7d99b489aa1bf1f0bf2056",
    measurementId: "G-SLMWBR7JTQ"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const storage = getStorage(firebaseApp);
  
  export { auth, provider, storage };
  export default db;