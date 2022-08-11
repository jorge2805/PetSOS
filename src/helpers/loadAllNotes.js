import { collection, collectionGroup, getDocs, query } from "firebase/firestore/lite";
import { FirebaseFirestoreLite } from "../firebase/config";


export const loadAllNotes = async () => {
    const collectionRef = query(collectionGroup(FirebaseFirestoreLite, `reportes`));
    
    const docs = await getDocs(collectionRef);

    const notes = [];

    docs.forEach( doc => {
        notes.push({ id: doc.id, ...doc.data()});         
    });
    return notes;
}