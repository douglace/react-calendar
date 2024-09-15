const EventDayVariant = {
    initial:{ opacity: 0, scale: 0.8},
    animate:{ opacity: 1, scale: 1, 
        // x: '-50%', y: '-50%'
    },
    exit:{ opacity: 0, scale: 0.8},
    transition:{
        type: 'tween', // Utilisation du type tween
        duration: 0.3,
        ease: 'easeInOut', // Fonction d'assouplissement
    }
}

const MoreEventVariant = {
    initial: { opacity: 0, scale: 0.8
        // , x: '-50%', y: '-50%' 
    },
    animate: { opacity: 1, scale: 1, x: 0, y:0 },
    exit: { opacity: 0, scale: 0.8
        // , x: '-50%', y: '-50%' 
    },
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