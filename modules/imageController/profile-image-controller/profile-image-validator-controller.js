const {
    check
} = require('express-validator');


let profileImageValidations = {
    
    addProfileImage: () => {
        return [
            check('profile_id').exists(),
            check('image_hash').exists()
        ]
    },

    updateProfileImage: () => {
        return [
            check('profile_id').exists(),
        ]
    },

    getProfileImage: () => {
        return [
            check('profile_id').exists(),
        ]
    },
    
    deleteProfileImage: () => {
        return [
            check('profile_id').exists(),
        ]
    },

    

}

module.exports = profileImageValidations;