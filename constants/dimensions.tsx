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

export function verticalHeader() {
    if (scale < 2.5) {
        return height * 0.10;
    } else if (scale >= 2.5 && scale < 3) {
        return height * 0.08;
    } else {
        return height * 0.06;
    }
}

export function headerText() {
    if (scale < 2.5) {
        return { fontZize: 22 };
    } else if (scale >= 2.5 && scale < 3) {
        return { fontZize: 18 };
    } else {
        return { fontZize: 12 };
    }
}


