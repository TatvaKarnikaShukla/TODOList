import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { styles } from "../style/Styles";
import { TodoTaskRealmContext } from "../../store";

const {useRealm} = TodoTaskRealmContext;
const UserScreen = (props: any) => {
    const realm = useRealm();
    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>Enter your name to get started with TODO</Text>
            <TextInput style={styles.textInputStyle} placeholder="User Name" />
            <View style={styles.button}>
            <Button title="Proceed" color="#f4511e" onPress={() => props.navigation.navigate('AuthenticatedStack')}/>
            </View>
        </View>
    )
}

export default UserScreen;

function userRealm() {
    throw new Error("Function not implemented.");
}
