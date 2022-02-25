import React from 'react';
import {
    FormGroupButtonText,
    FormGroupContainer,
    FormGroupElement, FormGroupElementDate, FormGroupElementSwitch,
    FormGroupLine, FormGroupLineElement, FormGroupSelect, FormGroupSelectText, FormGroupSwitch,
    FormGroupText,
    FormGroupTextInput, FormGroupTextSwitch
} from "../../styles/shared";
import Icon from "./Icon";
import {Pressable, Platform} from 'react-native';
import CalendarShared from "../Calendar/Calendar";
import moment from "moment";
import {navigateAction} from "../../functions/NavigationService";

function FormGroup({forms, last = false}) {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [date, setDate] = React.useState(new Date());

    const renderLine = () => {
        return <FormGroupLine>
            <FormGroupLineElement/>
        </FormGroupLine>
    }

    const renderFormGroupElement = (type, name, value, link, last = false) => {
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
                            <FormGroupSelectText>{value}</FormGroupSelectText>
                            <Icon handlePressIcon={() => navigateAction(link.name, link.params)} style={{marginLeft: 12}} source={require('../../assets/images/icons/profile/arrow.png')}/>
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
                    <FormGroupElementDate>
                        <FormGroupText>{name}</FormGroupText>
                        <CalendarShared date={date} setDate={setDate} show={modalVisible} setShow={setModalVisible}/>
                        <Pressable onPress={() => setModalVisible(true)}><FormGroupButtonText>
                            {moment(date).format('YYYY-MM-DD')}
                        </FormGroupButtonText></Pressable>
                    </FormGroupElementDate>
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
                    {renderFormGroupElement(el.type, el.name, el.value, el.link,idx + 1 === row.length)}
                </React.Fragment>
            })}
        </FormGroupContainer>
    );
}

export default FormGroup;
