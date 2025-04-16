import admin from 'firebase-admin';

interface FirebaseAdminAppProps {
    projectId: string;
    clientEmail: string;
    privateKey: string;
}

function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, "\n");
}

export function FirebaseAdminApp(props: FirebaseAdminAppProps) {
    const privateKey = formatPrivateKey(props.privateKey);
    if (admin.apps.length > 0) {
        return admin.app();
    }
    const cert = admin.credential.cert({
        projectId: props.projectId,
        clientEmail: props.clientEmail,
        privateKey,
    });
    return admin.initializeApp({
        credential: cert,
        projectId: props.projectId,
    })
}

export async function initAdmin() {

    const props = {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
        privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
        databaseURL: "https://bookstore-kisei-default-rtdb.asia-southeast1.firebasedatabase.app"
    };
    return FirebaseAdminApp(props);
}