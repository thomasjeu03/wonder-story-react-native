import Toast from 'react-native-toast-message';

const successNotification = (name: string, action: string = '', description: string = ''): void => {
    Toast.show({
        type: 'success',
        text1: `${name} ${action}`,
        text2: description,
    });
};

export default successNotification;