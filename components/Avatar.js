
// -------------------------------------------------------------------------- //

import { COLORS } from '../ui/Styles';

import React from 'react';
import { Text } from 'react-native';

// -------------------------------------------------------------------------- //

const AvatarCW = ({ name1, name2, textStyle }) => {

    const getInitials = (name1, name2) => {
        const initial1 = name1.split(' ')[0].charAt(0).toUpperCase();
        const initial2 = name2.split(' ')[0].charAt(0).toUpperCase();

        return initial1 + initial2;
    };

    const initials = getInitials(name1, name2);

    // ---------------------------------------------------------------------- //

    return (
        <Text style={textStyle}>{initials}</Text>
    );

};

// -------------------------------------------------------------------------- //

export default AvatarCW;

// -------------------------------------------------------------------------- //
