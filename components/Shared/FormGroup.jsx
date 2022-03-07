import React from 'react';
import PropTypes from 'prop-types';
import {
    FormGroupButtonText,
    FormGroupContainer,
    FormGroupElement, FormGroupElementDate, FormGroupElementSwitch,
    FormGroupLine, FormGroupLineElement, FormGroupSelect, FormGroupSelectText, FormGroupSwitch,
    FormGroupText,
    FormGroupTextInput, FormGroupTextSwitch
} from "../../styles/shared";
import Icon from "./Icon";
import {Platform, Pressable} from 'react-native';
import CalendarShared from "../Calendar/Calendar";
import moment from "moment";
import {navigateAction} from "../../functions/NavigationService";
import {useSelector} from "react-redux";
import {COLORS} from "../../functions/constants";
import {userCRUD} from "../../http/CRUD";
import {changeUserInfo} from "../../redux/actions/authActions";

function FormGroup({forms, last = false}) {
    const [modalVisible, setModalVisible] = React.useState(false)
    const {userInfo} = useSelector((state) => state.user);
    const [date, setDate] = React.useState(new Date());
    const [privateMode, setPrivateMode] = React.useState(userInfo?.private)


    const renderLine = () => {
        return <FormGroupLine>
            <FormGroupLineElement/>
        </FormGroupLine>
    }

    const handleChangeSwitch = async () => {
        setPrivateMode(!privateMode)
        await userCRUD.edit(userInfo.id, {
            ...userInfo,
            private: !userInfo?.private,
        }).then(async ({data}) => {
            await changeUserInfo('userInfo', data)
        })
    }

    const renderFormGroupElement = (type, name, value, link, handleChange, last = false) => {
        switch (type) {
            case 'input': {
                return <>
                    <FormGroupElement>
                        <FormGroupText>{name}</FormGroupText>
                        <FormGroupTextInput android={Platform.OS === 'android'} onChangeText={handleChange} value={value} placeholderTextColor="#C8CCE1" placeholder="Не указано"/>
                    </FormGroupElement>
                    {!last && renderLine()}
                </>
            }
            case 'select': {
                return <>
                    <FormGroupElement>
                        <FormGroupText>{name}</FormGroupText>
                            <FormGroupSelect >
                                <Pressable style={{paddingRight: 12}} onPress={() => navigateAction(link.name, link.params)}>
                                    <FormGroupSelectText >{value}</FormGroupSelectText>
                                </Pressable>
                                <Icon handlePressIcon={() => navigateAction(link.name, link.params)}  source={require('../../assets/images/icons/profile/arrow.png')}/>
                            </FormGroupSelect>

                    </FormGroupElement>
                    {!last && renderLine()}
                </>
            }
            case 'switch': {
                return <>
                    <FormGroupElementSwitch>
                        <FormGroupTextSwitch>{name}</FormGroupTextSwitch>
                        <FormGroupSwitch thumbColor={"#fff"}
                                         value={privateMode} onChange={handleChangeSwitch} trackColor={{ false: "#D4DAEC", true: "#8424FF" }} ios_backgroundColor="#D4DAEC"/>
                    </FormGroupElementSwitch>
                    {!last && renderLine()}
                </>
            }
            case 'date': {
                return <>
                    <FormGroupElementDate>
                        <FormGroupText>{name}</FormGroupText>
                        <CalendarShared date={date} setDate={setDate} show={modalVisible} setShow={setModalVisible}/>
                            <Pressable onPress={() => setModalVisible(true)}><FormGroupButtonText color={!userInfo?.birthdate && COLORS.purple}>
                            {userInfo?.birthdate ? moment(userInfo?.birthdate).format('YYYY-MM-DD') : 'Добавить'}
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
                    {renderFormGroupElement(el.type, el.name, el.value, el.link, el.handle,idx + 1 === row.length)}
                </React.Fragment>
            })}
        </FormGroupContainer>
    );
}

FormGroup.propTypes = {
    last: PropTypes.bool,
    forms: PropTypes.arrayOf(Object),
}

export default FormGroup;
