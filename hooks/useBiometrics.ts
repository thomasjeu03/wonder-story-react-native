import { useState } from "react";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

type UseBiometricsReturn = {
    checkBiometrics: () => Promise<void>;
    authenticate: () => Promise<boolean>;
    isBiometricAvailable: boolean;
    // @ts-ignore
    biometricType: BiometryTypes | null;
};

const useBiometrics = (): UseBiometricsReturn => {
    const [isBiometricAvailable, setIsBiometricAvailable] = useState<boolean>(false);
    // @ts-ignore
    const [biometricType, setBiometricType] = useState<BiometryTypes | null>(null);

    const checkBiometrics = async (): Promise<void> => {
        const rnBiometrics = new ReactNativeBiometrics();
        const { available, biometryType } = await rnBiometrics.isSensorAvailable();

        setIsBiometricAvailable(available);
        setBiometricType(available ? biometryType : null);
    };

    const authenticate = async (): Promise<boolean> => {
        const rnBiometrics = new ReactNativeBiometrics();

        try {
            const { success } = await rnBiometrics.simplePrompt({
                promptMessage: "Authenticate to proceed",
            });

            return success;
        } catch (error) {
            return false;
        }
    };

    return { checkBiometrics, authenticate, isBiometricAvailable, biometricType };
};

export default useBiometrics;