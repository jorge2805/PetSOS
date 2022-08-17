import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseFirestoreLite } from "../firebase/config";


export const loadSelects = async () => {

    const collectionRef = collection(FirebaseFirestoreLite, `Datos/Localizacion/Provincias`);
    const Provinciasdocs = await getDocs(collectionRef);

    const Provincias = [];

    Provinciasdocs.forEach( doc => {
        Provincias.push({ ...doc.data()});
    });

    const collectionRef2 = collection(FirebaseFirestoreLite, `Datos/Localizacion/Municipios`);
    const Municipiosdocs = await getDocs(collectionRef2);

    const Municipios = [];

    Municipiosdocs.forEach( doc => {
        Municipios.push({ ...doc.data()});
    });

    const collectionRef3 = collection(FirebaseFirestoreLite, `Datos/Generales/Raza`);
    const Razadocs = await getDocs(collectionRef3);

    const Raza = [];

    Razadocs.forEach( doc => {
        Raza.push({ ...doc.data()});
    });

    const collectionRef4 = collection(FirebaseFirestoreLite, `Datos/Generales/Sexo`);
    const Sexodocs = await getDocs(collectionRef4);

    const Sexo = [];

    Sexodocs.forEach( doc => {
        Sexo.push({ ...doc.data()});
    });

    return {Provincias, Municipios, Raza, Sexo};
}