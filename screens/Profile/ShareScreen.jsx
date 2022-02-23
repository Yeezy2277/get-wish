import React from 'react';
import {ScrollView, StyleSheet} from "react-native";
import {
    ShareScreenButtonPanel,
    ShareScreenCancelText,
    ShareScreenHeader,
    ShareScreenImage,
    ShareScreenPressable,
    ShareScreenTitle
} from "../../styles/profile";
import {navigateAction} from "../../functions/NavigationService";
import {FlexContainer} from "../../styles/main";
import {Button, Image} from "native-base";
import {ShareGroup} from "../../components";
import AuthButton from "../../components/Shared/AuthButton";

function ShareScreen(props) {

    React.useEffect(() => {
        const parent = props.navigation.getParent()
        parent.setOptions({tabBarStyle: {display: 'none'}})
        return () => {
            parent.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [])


    return (
        <>
            <ShareScreenHeader>
                <ShareScreenCancelText onPress={() => navigateAction('MainProfile')}>Отмена</ShareScreenCancelText>
                <ShareScreenTitle>Получатели</ShareScreenTitle>
                <ShareScreenPressable>
                    <ShareScreenImage source={require('../../assets/images/icons/profile/desires/search.png')}/>
                </ShareScreenPressable>
            </ShareScreenHeader>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
                <FlexContainer>
                    <ShareScreenButtonPanel>
                        <Button style={{backgroundColor: '#F7F7F7', borderRadius: 10, flex: 1, marginRight: 10}} _text={{
                            color: "#8424FF"
                        }} onPress={() => console.log("hello world")}>Выбрать всех</Button>
                        <Button style={{backgroundColor: '#F7F7F7', borderRadius: 10, flex: 1}} _text={{
                            color: "#8424FF"
                        }} onPress={() => console.log("hello world")}>Снять выбор</Button>
                    </ShareScreenButtonPanel>
                    <ShareGroup/>
                    <AuthButton style={{marginTop: 'auto', marginBottom: 44}} active={true}>Отправить по отдельности</AuthButton>
                </FlexContainer>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default ShareScreen;
