import {useToast} from "native-base";

const useToasts = (duration = 1000) => {
    const toast = useToast();

    const show = () => {
        return toast.show({
            title: "Дата рождения изменена",
            status: "success",
            isClosable: false,
            placement: "bottom",
            duration: duration,
            style: {
                backgroundColor: '#fff',
                marginLeft: 10,
                marginRight: 10,
                fontWeight: 600,
                fontSize: 15,
                fontFamily: "Nunito",
                borderRadius: 10,
                marginBottom: '10%',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,
                elevation: 2,
            }
        })

    }

    return { show };
}

export default useToasts
