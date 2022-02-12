import React from 'react';
import AuthStep from "./AuthStep";
import AuthButton from "../Shared/AuthButton";
import {AuthContext} from "../../screens/Auth/AuthScreen";
import {StyleSheet} from "react-native";
import {Formik, Field} from "formik";
import * as yup from 'yup'
import {NicknameBottom, NicknameContainer, NicknameLabel, NicknameLabelText} from "../../styles/shared";
import {Nickname} from "../index";
import {EnterNickNameInfo, EnterNickNameStepContainer, TextOfferPurple} from "../../styles/authSteps";

function EnterNicknameStep() {
    const {data, onNextStep} = React.useContext(AuthContext)

    const nicknameValidationSchema = yup.object().shape({
        nickName: yup
            .string()
            .matches(/^(?=.*[a-z_.])[\w.]+$/,  "Допустимые символы: a-z, 0-9, . и _")
            .min(3, 'Никнейм должен содержать минимум 3 символа')
            .required('Обязательное поле')
    })
    return (
        <AuthStep exit={true} mt={44} maxWidth={344} text="Придумай никнейм, по которому другие пользователи смогут тебя найти" title="Последний штрих!">
                <Formik
                    initialValues={{
                        nickName: '',
                    }}
                    validateOnChange={true}

                    validationSchema={nicknameValidationSchema}
                    onSubmit={values => console.log(values)}
                >
                    {({ handleSubmit, validateForm }) => (
                        <EnterNickNameStepContainer>
                            <NicknameContainer>
                                <NicknameLabel><NicknameLabelText>Никнейм</NicknameLabelText></NicknameLabel>
                                <Field
                                    component={Nickname}
                                    name="nickName"
                                />
                            </NicknameContainer>
                            <NicknameBottom>
                                <EnterNickNameInfo>Ты можешь использовать символы <TextOfferPurple>a-z</TextOfferPurple>, <TextOfferPurple>0-9</TextOfferPurple>, <TextOfferPurple>.</TextOfferPurple> и <TextOfferPurple>_</TextOfferPurple> .
                                    Длина от 3 до 30 символов.</EnterNickNameInfo>
                                <AuthButton onPress={() => {
                                    handleSubmit()
                                }} colors={['#D4DAEC', '#D4DAEC']}>Зарегистрироваться</AuthButton>
                            </NicknameBottom>
                        </EnterNickNameStepContainer>
                    )}
                </Formik>
        </AuthStep>
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        fontFamily: 'Nunito',
        fontWeight: '600',
        color: '#1A1A1A',
        fontSize: 31,
        lineHeight: 41
    }
})


export default EnterNicknameStep;
