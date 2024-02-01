import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
        marginTop: 20,
        color: '#fff',
        fontSize: 16
    },
    cardItemTextStyle: {
        color: 'black',
        fontSize:  16,
        width: '90%',
        padding: 2
    },
    textInputStyle: {
        color: 'black',
        fontSize:  16,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        width: '90%',
    },
    titleText: {
        color: 'black',
        fontSize:  16,
        padding: 10,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    noTaskStyle: { justifyContent: 'center', height: '100%', alignItems: 'center'},
    noTaskImage: {width: 100, height: 100},
    noTaskText: {fontSize: 20, fontWeight: 'bold', color: 'black'},
    addTaskStyle: {
      backgroundColor: 'white',
      alignSelf: 'center',
      flex: 1,
      width: '100%',
    },
      taskInputStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: '80%',
        alignSelf: 'center',
      },
      datePicker: {
        marginBottom: 10,
      },
      itemCardBackground: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        padding: 10,
      },
      dateContainer: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-evenly',
      },
      titleContainer: {
        flexDirection: 'row',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'space-evenly' 
      }, 
      title: {
        fontWeight: 'bold',
        marginBottom: 8,
        paddingRight: 10,
        justifyContent: 'space-evenly',
      },
      detailsContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '100%',
      },
      progressBar: {
        marginTop: 16,
        marginBottom: 16,
        alignSelf: 'center',
      },
      deleteActionButtonStyle: {backgroundColor: 'red', alignSelf: 'center', justifyContent: 'center' , width: '20%', height: '40%'},
      updateActionButtonStyle: {backgroundColor: 'green', alignSelf: 'center', justifyContent: 'center' , width: '20%', height: '40%'},
      actionButtonTextStyle: {color: 'white', fontSize: 20, alignSelf: 'center'}
    })