
// -------------------------------------------------------------------------- //

import { COLORS } from '../ui/Styles';

import React from 'react';
// import FastImage from 'react-native-fast-image';
import { Image, Text } from 'react-native';

// -------------------------------------------------------------------------- //

const AvatarCW = ({ name1, name2, image, textStyle, imageStyle }) => {

    const getInitials = (name1, name2) => {
        const initial1 = name1.charAt(0).toUpperCase();
        const initial2 = name2.split(' ')[0].charAt(0).toUpperCase();

        return initial1 + initial2;
    };

    const initials = getInitials(name1, name2);

    // ---------------------------------------------------------------------- //

    return (
        <>
            {image ? (
                <Image style={imageStyle} source={{ uri: image }} />
            ) : (
                <Text style={textStyle}>{initials}</Text>
            )}
        </>
    );

};

// -------------------------------------------------------------------------- //

export default AvatarCW;

// -------------------------------------------------------------------------- //
