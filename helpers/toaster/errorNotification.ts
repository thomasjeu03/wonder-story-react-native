import Toast from 'react-native-toast-message';

const errorNotification = (name: string, action: string = '', description: string = ''): void => {
    Toast.show({
        type: 'error',
        text1: `${name} ${action}`,
        text2: description,
    });
};

export default errorNotification;