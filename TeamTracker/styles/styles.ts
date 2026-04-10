import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({   
   container:{ 
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
        backgroundColor: '#132453',
    },
    title: {
        fontSize: 75,
        fontFamily: 'Arial',
        fontWeight: '100',
        fontStyle: 'italic',
        color: 'white',
    },
    logo: {
        width: 550,
        height: 350,
    },
    border:{
        borderColor:'#1E3A8A',
        backgroundColor:'#1E3A8A',
        borderWidth: 5,
        borderRadius: 25,
        padding: 10,
        width: '80%',
        alignItems:'center',

    },
    selectBTN:{
        backgroundColor:'#2563EB',
        padding:10,
        borderRadius: 10,
    },
    selectTXT:{
        color:'white',
        fontSize:30,
    }
});