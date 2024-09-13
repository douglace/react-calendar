const EventDayVariant = {
    initial:{ opacity: 0, scale: 0.8 },
    animate:{ opacity: 1, scale: 1, transform: 'translate(-50%, -5O%)'},
    exit:{ opacity: 0, scale: 0.8},
    transition:{
        type: 'tween', // Utilisation du type tween
        duration: 0.3,
        ease: 'easeInOut', // Fonction d'assouplissement
    }
}

const MoreEventVariant = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: {
        type: 'tween', // Utilisation du type tween
        duration: 0.3,
        ease: 'easeInOut', // Fonction d'assouplissement (peut être 'linear', 'easeIn', 'easeOut', etc.)
    }
}

export {
    EventDayVariant,
    MoreEventVariant
}