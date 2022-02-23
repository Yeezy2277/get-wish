import React from 'react';
import {
    SharedGroupCheckboxText,
    SharedGroupContainer,
    SharedGroupElement,
    SharedGroupImage,
    SharedGroupText
} from "../../styles/shared";
import {Checkbox, VStack, Text, Center, Box} from "native-base";
import {COLORS} from "../../functions/constants";

function ShareGroup(props) {
    return (
        <SharedGroupContainer>
            <SharedGroupText>Группы</SharedGroupText>
            <Box flex={1} >
                <VStack  space={15} >
                    <Checkbox zIndex={9} size="sm" borderRadius={10} value="danger" colorScheme="purple">
                        <SharedGroupElement>
                            <SharedGroupImage source={require('../../assets/images/icons/profile/desires/avatar1.png')}/>
                            <SharedGroupCheckboxText>to.kova</SharedGroupCheckboxText>
                        </SharedGroupElement>
                    </Checkbox>
                    <Checkbox zIndex={9} size="sm" borderRadius={10} value="danger" colorScheme="purple">
                        <SharedGroupElement>
                            <SharedGroupImage source={require('../../assets/images/icons/profile/desires/avatar1.png')}/>
                            <SharedGroupCheckboxText>to.kova</SharedGroupCheckboxText>
                        </SharedGroupElement>
                    </Checkbox>
                    <Checkbox zIndex={9} size="sm" borderRadius={10} value="danger" colorScheme="purple">
                        <SharedGroupElement>
                            <SharedGroupImage source={require('../../assets/images/icons/profile/desires/avatar1.png')}/>
                            <SharedGroupCheckboxText>to.kova</SharedGroupCheckboxText>
                        </SharedGroupElement>
                    </Checkbox>
                </VStack>
            </Box>
        </SharedGroupContainer>
    );
}

export default ShareGroup;
