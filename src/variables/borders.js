import Colors from './colors';  // Importa i colori definiti

/**
 * Variabili per bordi usate nell'app
 * Gestione centralizzata di colori, spessori e raggi del bordo.
 */
const Borders = {
    // Colori bordi (usa colori da colors.js)
    colors: {
        default: Colors.grey300,     // bordo grigio chiaro standard
        dark: Colors.darkBlue,        // bordo blu scuro
        error: Colors.error,         // bordo rosso errore
        success: Colors.darkBlue,     
    },

    // Spessori bordi in pixel (dp)
    widths: {
        thin: 1,
        regular: 2,
        thick: 4,
    },

    // Raggi di curvatura (borderRadius)
    radius: {
        none: 0,
        small: 4,
        regular: 8,
        large: 16,
        xl: 32,
        round: 9999,  // per bordi completamente arrotondati (pill buttons)
    },
};

export default Borders;