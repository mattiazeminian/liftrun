// src/variables/colors.js

import { grey400 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

/**
 * Palette colori usata in tutta l'app
 * I nomi sono descrittivi per facilitare la lettura e l'uso coerente.
 */
const Colors = {
    // Colori principali e di testo
    darkBlue: '#232328',      // Colore primario scuro per testi e bottoni
    lightBlue: '#D5D9EB',    // Colore azzurro chiaro, usato per sfondi o accenti
    white: '#FFFFFF',        // Bianco, ideale per sfondi e testi chiari su scuri

    // Colori stato ed errori
    error: '#F04438',        // Rosso acceso per messaggi di errore o allerta

    // Toni di grigio per sfondi, bordi e testi secondari
    grey100: '#F5F5F5',      // Grigio molto chiaro, utile per sfondi
    grey200: '#E9EAEB',      // Grigio chiaro di supporto
    grey300: '#D5D7DA',
    grey400: '#a9aaadff',
    grey600: '#535862',      // Grigio scuro per testi secondari o icone

    // Aggiunte consigliate (opzionali)
    black: '#000000',        // Nero puro, da usare con parsimonia per testi forti
    transparent: 'transparent', // Colore trasparente utile per overlay o bottoni

    // Esempio di utilizzo di toni di blu e grigi aggiuntivi
    // blue500: '#2196F3',
    // grey500: '#9E9E9E',
};

export default Colors;