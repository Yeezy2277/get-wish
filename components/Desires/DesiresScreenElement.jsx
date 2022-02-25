import React from 'react';
import {
    DesiresScreenElementContainer,
    DesiresScreenElementContent,
    DesiresScreenElementContentBottom,
    DesiresScreenElementContentBottomAvatar,
    DesiresScreenElementContentBottomIcon,
    DesiresScreenElementContentBottomIconContainer,
    DesiresScreenElementContentBottomText,
    DesiresScreenElementContentDescription,
    DesiresScreenElementContentHeader,
    DesiresScreenElementContentHeaderImage,
    DesiresScreenElementContentHeaderTitle,
    DesiresScreenElementImage
} from "../../styles/profile";
import {Platform, Pressable} from "react-native";
import DesiresScreenElementActionsheet from "./DesiresScreenElementActionsheet";

function DesiresScreenElement() {
    const [open, setOpen] = React.useState(false)

    return (
        <>
        <Pressable onPress={() => setOpen(true)}>
            <DesiresScreenElementContainer>
                <DesiresScreenElementImage resizeMode="cover" source={require('../../assets/images/icons/profile/desires/example1.png')}/>
                <DesiresScreenElementContent>
                    <DesiresScreenElementContentHeader>
                        <DesiresScreenElementContentHeaderTitle>Новогодний свитер</DesiresScreenElementContentHeaderTitle>
                        <DesiresScreenElementContentHeaderImage resizeMode="contain" source={require('../../assets/images/icons/profile/desires/menu.png')}/>
                    </DesiresScreenElementContentHeader>
                    <DesiresScreenElementContentDescription>Размер 42-44</DesiresScreenElementContentDescription>
                    <DesiresScreenElementContentBottom>
                        <DesiresScreenElementContentBottomIconContainer>
                            <DesiresScreenElementContentBottomIcon resizeMode="contain" h={Platform.OS === 'android' ? 7 : 10} source={require('../../assets/images/icons/profile/desires/link.png')}/>
                            <DesiresScreenElementContentBottomText>zara.ru</DesiresScreenElementContentBottomText>
                        </DesiresScreenElementContentBottomIconContainer>
                        <DesiresScreenElementContentBottomAvatar resizeMode="cover" source={require('../../assets/images/icons/profile/desires/avatar1.png')}/>
                    </DesiresScreenElementContentBottom>
                </DesiresScreenElementContent>
            </DesiresScreenElementContainer>
        </Pressable>
            <DesiresScreenElementActionsheet open={open} setOpen={setOpen}/>
        </>
    );
}

export default DesiresScreenElement;
