// variables/typography.ts

// Definizione di una mappa di pesi del font usati comunemente
// React Native richiede valori stringa per fontWeight, corrispondenti a CSS
const fontWeight = {
    thin: '100',         // peso molto leggero
    extraLight: '200',   // peso extra leggero
    light: '300',        // peso leggero
    regular: '400',      // peso normale/standard
    medium: '500',       // peso medio
    semiBold: '600',     // semi-grassetto, leggermente pesante
    bold: '700',         // grassetto
    extraBold: '800',    // grassetto extra pesante
    black: '900',        // peso massimo nero
};

// Oggetto principale che mappa tutte le proprietà tipografiche dell’app
const Typography = {
    // Definizione delle famiglie di font principali usate
    fonts: {
        manrope: 'Manrope',          // font personalizzato o di sistema "Manrope"
        robotoSerif: 'Roboto Serif',  // font "Roboto Serif"
        googleSansCode: 'Google Sans Code', // Google Sans Code font
    },

    // Dimensioni standard del testo, in "punti" (px/dp)
    sizes: {
        xs: 12,      // extra small
        sm: 14,      // small
        md: 16,      // medium
        lg: 20,      // large
        xl: 24,      // extra large
        xxl: 30,     // extra extra large
        displayMd: 36, // dimensione da usare per titoli display medi
    },

    // Altezza della linea (lineHeight) per diversi casi
    lineHeights: {
        normal: 20,    // altezza per testo normal
        heading: 24,   // altezza per titoli
    },

    // Definizione dettagliata degli stili per Manrope
    manrope: {
        xsRegular: {
        fontFamily: 'Manrope',    // famiglia font
        fontSize: 12,             // dimensione font
        lineHeight: 16,           // altezza linea (spaziatura verticale tra righe)
        fontWeight: '400',        // peso (standard)
        },
        xsMedium: {
        fontFamily: 'Manrope',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',        // peso medio
        },
        smRegular: {
        fontFamily: 'Manrope',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        },
        smMedium: {
        fontFamily: 'Manrope',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
        },
        mdRegular: {
        fontFamily: 'Manrope',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '400',
        },
        mdMedium: {
        fontFamily: 'Manrope',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '500',
        },
        lg: {
        fontFamily: 'Manrope',
        fontSize: 20,
        lineHeight: 26,
        fontWeight: '600',       // semiBold per dimensioni grandi
        },
        xl: {
        fontFamily: 'Manrope',
        fontSize: 24,
        lineHeight: 30,
        fontWeight: '600',
        },
        xxl: {
        fontFamily: 'Manrope',
        fontSize: 30,
        lineHeight: 36,
        fontWeight: '600',
        },
        displayMd: {
        fontFamily: 'Manrope',
        fontSize: 36,
        lineHeight: 44,
        fontWeight: '700',       // Bold per display
        },
    },

    // Definizione dettagliata degli stili per GoogleSansCode (in Uppercase)
    googleSansCode: {
        xsRegular: {
        fontFamily: 'Google Sans Code',
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        textTransform: 'uppercase',  // rende il testo tutto maiuscolo
        },
        smRegular: {
        fontFamily: 'Google Sans Code',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        textTransform: 'uppercase',
        },
    },

    // Definizione dettagliata per Roboto Serif usato principalmente per testi più "classici"
    robotoSerif: {
        xsRegular: {
        fontFamily: 'Roboto Serif',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        },
        mdRegular: {
        fontFamily: 'Roboto Serif',
        fontSize: 24,
        lineHeight: 30,
        fontWeight: '400',
        },
        xlRegular: {
        fontFamily: 'Roboto Serif',
        fontSize: 30,
        lineHeight: 36,
        fontWeight: '400',
        },
        displayMdRegular: {
        fontFamily: 'Roboto Serif',
        fontSize: 36,
        lineHeight: 44,
        fontWeight: '400',
        },
    },
};

export { fontWeight };
export default Typography;
