import React, {useContext} from 'react';
import AuthStep from "./AuthStep";
import AuthButton from "../Shared/AuthButton";
import {Formik, Field} from "formik";
import * as yup from 'yup'
import {NicknameBottom, NicknameContainer, NicknameLabel, NicknameLabelText} from "../../styles/shared";
import {Nickname} from "../index";
import {EnterNickNameInfo, EnterNickNameStepContainer, TextOfferPurple} from "../../styles/authSteps";
import {AuthContext} from "../../screens/Auth/AuthScreen";
import {userCRUD} from "../../http/CRUD";
import {SET_AUTH, SET_USER_INFO} from "../../redux/constants/userConstants";
import {Text} from "react-native";

function EnterNicknameStep() {
    const {data, handleChangeObject, navigation, dispatch} = useContext(AuthContext)

    const [loading, setLoading] = React.useState(true)

    const nicknameValidationSchema = yup.object().shape({
        nickName: yup
            .string()
            .matches(/^(?=.*[a-z_.])[\w.]+$/,  "Допустимые символы: a-z, 0-9, . и _")
            .min(3, 'Никнейм должен содержать минимум 3 символа')
            .max(30, 'Никнейм должен содержать максимум 30 символов')
            .required('Обязательное поле')
    })

    const [canRegistration, setCanRegistration] = React.useState(false)

    React.useEffect(() => {
        (async function () {
            setLoading(true)
            try {
                const user = await userCRUD.search()
                if (user) {
                    if (user?.username) {
                        await dispatch({type: SET_USER_INFO, payload: user})
                        await dispatch({type: SET_AUTH, payload: true})
                        navigation.navigate('MainNavigator', { screen: 'Main' });
                    }
                }
            } finally {
                setLoading(false)
            }
        }())
    }, [])

    const onHandleRegistration = async () => {
        if (canRegistration) {
            const res = await userCRUD.search()
            await userCRUD.edit(res.id, {
                username: data.username,
                phone: data.phone
            })
            dispatch({type: SET_AUTH, payload: true})
            navigation.navigate('MainNavigator', { screen: 'Main' })
        }
    }

    if (loading) {
        return <Text>Загрузка</Text>
    }

    return (
        <AuthStep exit={true} mt={44} maxWidth={344} text="Придумай никнейм, по которому другие пользователи смогут тебя найти" title="Последний штрих!">
                <Formik
                    initialValues={{
                        nickName: '',
                    }}
                    validateOnChange={true}
                    validationSchema={nicknameValidationSchema}
                    onSubmit={values => {
                        handleChangeObject('username', values.nickName)
                        setCanRegistration(true)
                    }}
                >
                    {({errors}) => {
                        if (Object.keys(errors).length !== 0) {
                            setCanRegistration(false)
                        }
                        return (
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
                                    <AuthButton onPress={onHandleRegistration} colors={canRegistration ? ['#FB26FF', '#8A24FF', '#8424FF'] : ['#D4DAEC', '#D4DAEC']}>Зарегистрироваться</AuthButton>
                                </NicknameBottom>
                            </EnterNickNameStepContainer>
                        )
                    }}
                </Formik>
        </AuthStep>
    );
}


export default EnterNicknameStep;
