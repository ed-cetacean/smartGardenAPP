
// -------------------------------------------------------------------------- //

const COLORS = { // https://uicolors.app/create
    dark: '#2A313B',
    light: '#F1EFF2',

    accent: '#95AA63', // Green-smoke.
    disabled: '#4B5A31',
    alterDisabled: '#7E934F',

    darkTransparent: 'rgba(42, 49, 59, .6)',
};

COLORS.darkPallete = {
    background: COLORS.dark,
    text: COLORS.light,

    input: '#D3DCBA',
};

COLORS.lightPallete = {
    background: COLORS.light,
    text: COLORS.dark,

    input: '#4B5A31',
};

// -------------------------------------------------------------------------- //

const SIZES = {
    xSmall: 10, small: 12,
    medium: 16, large: 20,
    xLarge: 24, xxLarge: 28,
};

// -------------------------------------------------------------------------- //

export { COLORS, SIZES };

// -------------------------------------------------------------------------- //
