import {useToast} from "native-base";

const useToasts = (duration = 1000, title = "Дата рождения изменена") => {
    const toast = useToast();

    const show = () => {
        return toast.show({
            title: title,
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
                shadowOffset: {width: 10, height: 10},
                shadowColor: 'black',
                shadowOpacity: 1,
                elevation: 3,
            }
        })

    }

    return { show };
}

export default useToasts
