import admin from "firebase-admin";
import serviceAccount from "../Chat_app_credential.json" assert { type: "json" };

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
const db = admin.firestore();
export { db, admin }
