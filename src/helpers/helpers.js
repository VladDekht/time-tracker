export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : null;
}

export const whiteOrBlackFont = (backroundColorRGB) => {
    return (
        backroundColorRGB.r * 0.299 +
        backroundColorRGB.g * 0.587 +
        backroundColorRGB.b * 0.114
    )
        > 186 ? '#000000' : '#ffffff';
}