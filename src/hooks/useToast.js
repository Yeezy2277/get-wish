import { useToast } from 'native-base';
import { Platform } from 'react-native';

export const styleToast = {
  status: 'success',
  zIndex: 9999999,
  isClosable: false,
  placement: 'bottom',
  style: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 600,
    fontSize: 15,
    fontFamily: 'Nunito',
    borderRadius: 10,
    marginBottom: '10%',
    shadowOffset: { width: Platform.OS === 'android' ? 5 : 0, height: Platform.OS === 'android' ? 5 : 1 },
    shadowColor: Platform.OS === 'android' && 'black',
    shadowOpacity: Platform.OS === 'android' ? 1 : 0.20,
    shadowRadius: Platform.OS === 'ios' && 1.41,
    elevation: Platform.OS === 'android' ? 3 : 0,
  }
};

const useToasts = (duration = 1000, title = 'Дата рождения изменена') => {
  const toast = useToast();

  const show = () => {
    return toast.show({
      title,
      duration,
      ...styleToast
    });

  };

  return { show };
};

export default useToasts;
