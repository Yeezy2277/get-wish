import React from 'react';
import {Actionsheet, Box, Button, Divider} from "native-base";
import {Platform, Pressable, ScrollView} from 'react-native';
import {
    ActionDesires,
    ActionDesiresActions,
    ActionDesiresActionsIcon,
    ActionDesiresActionsText, ActionDesiresChildButton, ActionDesiresChildDescription, ActionDesiresChildName,
    ActionDesiresCount,
    ActionDesiresCountIcon,
    ActionDesiresCountText,
    ActionDesiresImage,
    ActionDesiresImageContainer,
    ActionDesiresRow, ActionDesiresRowDescription,
    ActionDesiresRowHeader,
    ActionDesiresRowHeaderAvatar,
    ActionDesiresRowHeaderName,
    ActionDesiresRowLinks,
    ActionDesiresRowLinksIcon,
    ActionDesiresRowLinksMenu,
    ActionDesiresRowLinksText, ActionDesiresRowName, ActionElementChild
} from "../../styles/profile";
import AuthButton from "../Shared/AuthButton";
import useToasts from "../../hooks/useToast";
import {useActionSheet} from "@expo/react-native-action-sheet";
import {navigateAction} from "../../functions/NavigationService";

function DesiresScreenElementActionsheet({open, setOpen}) {
    const [openChild, setOpenChild] = React.useState(false)
    const {show} = useToasts(2000, 'Резерв желания отменен')
    const { showActionSheetWithOptions } = useActionSheet();

    const handleClickImage = () => {
        return showActionSheetWithOptions(
            {
                options: ["Отмена", "Поделиться"],
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark'
            }, async (buttonIndex) => {
                if (buttonIndex === 1) {
                    navigateAction('ShareScreen')
                    setOpen(false)
                    setOpenChild(false)
                }
            })
    }


    return (
        <>
        <Actionsheet padding={0} isOpen={open} onClose={() => setOpen(false)} >
            <Actionsheet.Content padding={0} backgroundColor="#fff">
                <ActionDesires>
                    <ActionDesiresImageContainer>
                        <ActionDesiresImage source={require('../../assets/images/icons/profile/desires/example1Bg.png')}>
                        </ActionDesiresImage>
                        <ActionDesiresCount>
                            <ActionDesiresCountText>3</ActionDesiresCountText>
                            <ActionDesiresCountIcon source={require('../../assets/images/icons/profile/desires/photo.png')}/>
                        </ActionDesiresCount>
                    </ActionDesiresImageContainer>
                    <ActionDesiresRow>
                         <ActionDesiresRowHeader>
                            <ActionDesiresRowHeaderAvatar source={require('../../assets/images/icons/profile/desires/avatar1.png')}/>
                            <ActionDesiresRowHeaderName>anastasia_efremova</ActionDesiresRowHeaderName>
                            <ActionDesiresActions>
                                <ActionDesiresActionsText>В вишлист</ActionDesiresActionsText>
                                <ActionDesiresActionsIcon source={require('../../assets/images/icons/arrow.png')}/>
                            </ActionDesiresActions>
                        </ActionDesiresRowHeader>
                        <Divider/>
                        <ActionDesiresRowLinks>
                            <Box style={{width: 86, paddingTop: 2, paddingBottom: 2, justifyContent: 'space-between', paddingLeft: 8, paddingRight: 8, height: 26, backgroundColor: '#F7F7F7', borderRadius: 6, alignItems: 'center', display: 'flex', flexDirection: 'row'}} _text={{
                                color: "#8424FF"
                            }}>
                                <ActionDesiresRowLinksIcon resizeMode="contain" h={Platform.OS === 'android' ? 10 : 13} source={require('../../assets/images/icons/profile/desires/link.png')}/>
                                <ActionDesiresRowLinksText>zara.ru</ActionDesiresRowLinksText>
                            </Box>
                            <Pressable style={{zIndex: 2, width: 50, height: 25, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8, flexDirection: 'row'}} onPress={handleClickImage}>
                                <ActionDesiresRowLinksMenu source={require('../../assets/images/icons/profile/desires/menu.png')}/>
                            </Pressable>
                        </ActionDesiresRowLinks>
                        <ActionDesiresRowName>Рождественский свитер</ActionDesiresRowName>
                        <ActionDesiresRowDescription>
                            Размер 42-44
                        </ActionDesiresRowDescription>
                        <Button style={{backgroundColor: '#F7F7F7', height: 50, marginBottom: 10, borderRadius: 10, marginTop: 30}} _text={{
                            color: "#8424FF"
                        }} onPress={() => setOpenChild(true)}>Отменить резервирование</Button>
                    </ActionDesiresRow>
                </ActionDesires>
            </Actionsheet.Content>
        </Actionsheet>
            <Actionsheet padding={0} isOpen={openChild} onClose={() => setOpenChild(false)} >
                <Actionsheet.Content backgroundColor="#fff" padding={0}  >
                    <ActionElementChild>
                        <ActionDesiresChildName>Ты передумал исполнять
                            это желание?</ActionDesiresChildName>
                        <ActionDesiresChildDescription>Или просто случайно сюда нажал?</ActionDesiresChildDescription>
                        <ActionDesiresChildButton>
                            <Button style={{backgroundColor: '#F7F7F7', height: 46, maxWidth: 162.5, borderRadius: 12, flex: 1}} _text={{
                                color: "#8424FF"
                            }} onPress={() => {
                                setOpen(false)
                                setOpenChild(false)
                                show()
                            }}>Да, я передумал</Button>
                            <AuthButton variant="small" onPress={() => setOpenChild(false)} text="Упс, закрыть"/>
                        </ActionDesiresChildButton>
                    </ActionElementChild>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
}

export default DesiresScreenElementActionsheet;
