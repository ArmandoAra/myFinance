import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');


//Home Styles
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1, width: "100%",
        alignItems: 'center',
        height,
        gap: 4,
    },
    headerContainer: {
        width: '100%',
        height: 100,
        alignItems: 'center',
    },
    pickerMainContainer: { flexDirection: "row", gap: 10 },
    pickerContainer: {
        flexDirection: "row",
        position: 'relative',
        overflow: 'hidden',
        marginVertical: 20,
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
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingTop: 20,
        backgroundColor: '#219C90',
        width: "100%",
        height: 100,
    },
    buttonGoTo: {
        fontSize: 20,
        width: 300,
        alignItems: 'center',
        backgroundColor: "#219C90",
        borderRadius: 10,
        display: "flex",
        paddingVertical: 10,
        marginVertical: 10,
        marginBottom: 30,
        justifyContent: 'center',


    },
    iconContainer: {
        top: 10,
        right: 12,
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
        backgroundColor: '#003b24',
        paddingRight: 30, // to ensure the text is never behind the icon

    }
})