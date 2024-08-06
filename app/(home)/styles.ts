import { Dimensions, StyleSheet } from 'react-native';
import { rowColorLighter } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');
import { verticalHeader, verticalScale } from '@/constants/dimensions';


//Home Styles
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        width: "100%",
        height,
        alignItems: 'center',
        gap: 4,
    },
    headerContainer: {
        width: '100%',
        height: verticalHeader(),
        backgroundColor: '#219C90',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    pickerMainContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'center',
        gap: 10
    },
    pickerContainer: {
        flexDirection: "row",
        position: 'relative',
        overflow: 'hidden',
        marginVertical: 5,
        gap: 5,
        borderRadius: 15,
    },
    listHeader: {
        backgroundColor: '#219C90',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#BBE9FF',
    },
    item: {
        backgroundColor: '#f9c2ff',
        marginVertical: 3,
        marginHorizontal: 16,
    },
    title: {
        position: 'absolute',
        fontSize: 32,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        textShadowColor: 'black',
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingTop: 10,
    },
    buttonGoTo: {
        fontSize: 20,
        width: "80%",
        alignItems: 'center',
        backgroundColor: "#219C90",
        borderRadius: 10,
        display: "flex",
        paddingVertical: 10,
        marginVertical: 5,
        marginBottom: 10,
        justifyContent: 'center',
    },
    iconContainer: {
        top: 10,
        right: 12,
    },
    headerImage: {
        width: '100%',
        height: 250,
        top: 0,
        left: 0,
        right: 0,
        zIndex: -1,
    },
})

export const pickerStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 16,
        width: width * 0.46,
        textAlign: 'center',
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 35,
        color: 'white',
        backgroundColor: '#003b24'
    }
})