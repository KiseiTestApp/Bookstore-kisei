import admin from 'firebase-admin';

function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, "\n");
}

export function initAdmin() {
    if (admin.apps.length > 0) {
        return admin.app();
    }

    const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY as string);

    const app = admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey
        }),
        databaseURL: "https://bookstore-kisei-default-rtdb.asia-southeast1.firebasedatabase.app"
    });

    return app;
}

export function getFirestore() {
    const app = initAdmin();
    return admin.firestore(app);
}