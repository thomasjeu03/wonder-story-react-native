import {ThemedText} from "../ui/ThemedText";
import {useTranslations} from "@/contexts/LangueProvider";
import {View} from "react-native";
import {Image} from "expo-image";
import {useUser} from "@/contexts/UserProvider";
import CTA from "@/components/ui/CTA";

export default function Step1() {
    const { t } = useTranslations();
    const {currentStep, setCurrentStep} = useUser();

    return (
        <View style={{
            flex: 1,
            gap: 32,
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Image
                contentFit="contain"
                source={require("@/assets/images/logo.png")}
                style={{width: 200, height: 36}}
            />
            <ThemedText type="title3" style={{textAlign: "center", opacity: 0.5}}>{t('home-welcome')}</ThemedText>
            <CTA
                icon={"Sparkles"}
                label={t('common.create')}
                onPress={() => setCurrentStep(currentStep + 1)}
            />
        </View>
    );
}