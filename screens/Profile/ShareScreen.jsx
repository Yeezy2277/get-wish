import React, {useCallback} from 'react';
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
import {useI18n} from "../../i18n/i18n";

function ShareScreen(props) {

    React.useEffect(() => {
        const parent = props.navigation.getParent()
        parent.setOptions({tabBarStyle: {display: 'none'}})
        return () => {
            parent.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [])

    const [checkBox1, setCheckBox1] = React.useState(false)
    const [checkBox2, setCheckBox2] = React.useState(false)
    const [checkBox3, setCheckBox3] = React.useState(false)

    const isDisabled = !checkBox1 && !checkBox2 && !checkBox3

    const sendSeparately = (checkBox1 && checkBox2 && !checkBox3) || (!checkBox1 && checkBox2 && checkBox3) || (checkBox1 && !checkBox2 && checkBox3) ||
        (checkBox1 && checkBox2 && checkBox3)

    const onChangeCheckBoxFalse = () => {
        setCheckBox1(false)
        setCheckBox2(false)
        setCheckBox3(false)
    }

    const onChangeCheckBoxTrue = () => {
        setCheckBox1(true)
        setCheckBox2(true)
        setCheckBox3(true)
    }

    const t = useI18n();

    return (
        <>
            <ShareScreenHeader>
                <ShareScreenCancelText onPress={() => navigateAction('MainProfile')}>{t('cancel')}</ShareScreenCancelText>
                <ShareScreenTitle>{t('share_recipients')}</ShareScreenTitle>
                <ShareScreenPressable>
                    <ShareScreenImage source={require('../../assets/images/icons/profile/desires/search.png')}/>
                </ShareScreenPressable>
            </ShareScreenHeader>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
                <FlexContainer>
                    <ShareScreenButtonPanel>
                        <Button style={{backgroundColor: '#F7F7F7', borderRadius: 10, flex: 1, marginRight: 10}} _text={{
                            color: "#8424FF"
                        }} onPress={onChangeCheckBoxTrue}>{t('selectAll')}</Button>
                        <Button isDisabled={isDisabled} style={{backgroundColor: '#F7F7F7', borderRadius: 10, flex: 1}} _text={{
                            color: !isDisabled ? "#8424FF" : '#C8CCE1'
                        }} onPress={onChangeCheckBoxFalse}>{t('unselect')}</Button>
                    </ShareScreenButtonPanel>
                    <ShareGroup setCheckBox1={setCheckBox1} setCheckBox2={setCheckBox2} setCheckBox3={setCheckBox3} checkBox1={checkBox1} checkBox2={checkBox2} checkBox3={checkBox3}/>
                    <AuthButton style={{marginTop: 'auto', marginBottom: 44}} active={!isDisabled}>
                        {sendSeparately ? t('share_sendSeparately') : t('send')}
                    </AuthButton>
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
