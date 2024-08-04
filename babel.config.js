
// -------------------------------------------------------------------------- //

module.exports = function(api) {
    api.cache(true);

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // ...

            // CAUTION: This plugin must be the last one in the list.
            'react-native-reanimated/plugin',
        ],
    };
};

// -------------------------------------------------------------------------- //
