import React from 'react';
import {
    FormGroupButton, FormGroupButtonText,
    FormGroupContainer,
    FormGroupElement, FormGroupElementSwitch,
    FormGroupLine, FormGroupLineElement, FormGroupSelect, FormGroupSelectText, FormGroupSwitch,
    FormGroupText,
    FormGroupTextInput, FormGroupTextSwitch
} from "../../styles/shared";
import Icon from "./Icon";
import {Pressable} from 'react-native';
import {ModalCalendar} from "../index";

function FormGroup({forms, last = false}) {
    const [modalVisible, setModalVisible] = React.useState(false)

    const renderLine = () => {
        return <FormGroupLine>
            <FormGroupLineElement/>
        </FormGroupLine>
    }

    const renderFormGroupElement = (type, name, value, last = false) => {
        switch (type) {
            case 'input': {
                return <>
                    <FormGroupElement>
                        <FormGroupText>{name}</FormGroupText>
                        <FormGroupTextInput value={value} placeholderTextColor="#C8CCE1" placeholder="Не указано"/>
                    </FormGroupElement>
                    {!last && renderLine()}
                </>
            }
            case 'select': {
                return <>
                    <FormGroupElement>
                        <FormGroupText>{name}</FormGroupText>
                        <FormGroupSelect>
                            <FormGroupSelectText>Не указано</FormGroupSelectText>
                            <Icon style={{marginLeft: 12}} source={require('../../assets/images/icons/profile/arrow.png')}/>
                        </FormGroupSelect>
                    </FormGroupElement>
                    {!last && renderLine()}
                </>
            }
            case 'switch': {
                return <>
                    <FormGroupElementSwitch>
                        <FormGroupTextSwitch>{name}</FormGroupTextSwitch>
                        <FormGroupSwitch trackColor={{ false: "#D4DAEC", true: "#8424FF" }} ios_backgroundColor="#D4DAEC"/>
                    </FormGroupElementSwitch>
                    {!last && renderLine()}
                </>
            }
            case 'date': {
                return <>
                    <FormGroupElement>
                        <FormGroupText>{name}</FormGroupText>
                        <Pressable onPress={() => setModalVisible(true)}><FormGroupButtonText>
                            Добавить
                        </FormGroupButtonText></Pressable>
                    </FormGroupElement>
                    {!last && renderLine()}
                </>
            }
            default:
                return;
        }
    }
    return (
        <FormGroupContainer lst={last ? 0 : 20}>
            {forms && forms.map((el, idx, row) => {
                return <React.Fragment key={idx}>
                    {renderFormGroupElement(el.type, el.name, null, idx + 1 === row.length)}
                </React.Fragment>
            })}
            <ModalCalendar modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </FormGroupContainer>
    );
}

export default FormGroup;
