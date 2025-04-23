import admin from 'firebase-admin';

function formatPrivateKey(key: string | undefined) {
    if (!key) throw new Error('FIREBASE_PRIVATE_KEY is not set');
    return key.replace(/\\n/g, "\n");
}

let adminApp: admin.app.App;

export function initAdmin() {
    if (adminApp) {
        return adminApp;
    }

    if (admin.apps.length > 0) {
        adminApp = admin.app();
        return adminApp;
    }

    const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

    adminApp = admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey
        }),
        databaseURL: "https://bookstore-kisei-default-rtdb.asia-southeast1.firebasedatabase.app"
    });

    return adminApp;
}

export function getAuth() {
    const app = initAdmin();
    return admin.auth(app);
}

export function getFirestore() {
    const app = initAdmin();
    return admin.firestore(app);
}