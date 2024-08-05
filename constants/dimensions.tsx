import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

import { PixelRatio } from 'react-native';


const scale = PixelRatio.get();

export function verticalScale() {
    if (scale < 2.5) {
        return height * 0.65;
    } else if (scale >= 2.5 && scale < 3) {
        return height * 0.68;
    } else {
        return height * 0.62;
    }
}

export function verticalSpendListScale() {
    if (scale < 2.5) {
        return height * 0.56;
    } else if (scale >= 2.5 && scale < 3) {
        return height * 0.47;
    } else {
        return height * 0.39;
    }
}

export function verticalMargin() {
    if (scale < 2.5) {
        return 100;
    } else if (scale >= 2.5 && scale < 3) {
        return 60;
    } else {
        return 30;
    }
}


